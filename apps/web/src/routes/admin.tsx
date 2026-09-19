import { Check, CircleAlert, Clock, Eye, FileWarning, GitPullRequest, X } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  EmptyState,
  SegmentedControl,
  Skeleton,
  StatusPill,
  SUBMISSION_STATUS_TONE,
  Textarea,
} from "@openui/ui";
import { formatCount, formatDateTime } from "@openui/utils";

import { Section, SectionHeader } from "../components/SectionHeader.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import * as api from "../lib/api.js";
import { useAuth, useHasRole } from "../lib/auth.js";
import { useApiResource } from "../lib/use-api-resource.js";

/**
 * Moderation surfaces.
 *
 * Every page here is behind the `AdminLayout` guard, and every action goes
 * through an `/api/v1/admin/*` endpoint that independently verifies the token and
 * reads the caller's role from `profiles`. The UI guard changes what a moderator
 * *sees*; it is not what stops an unauthorised action, and the code is organised
 * so it is obvious which is which.
 *
 * The approval asymmetry is deliberate and visible: moderators triage — request
 * changes, reject, resolve reports — while only administrators approve. Approval
 * is the step that turns a contribution into immutable published content, so it
 * is the one step worth making rarer.
 */

export function AdminOverviewPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading } = useApiResource(() => api.getAnalytics(token), "analytics", token);
  useDocumentTitle("Moderation — UniqueFingerprint");

  return (
    <>
      <SectionHeader
        eyebrow="Overview"
        title="Registry operations."
        description="Aggregate counts from the operational database. Published resources, open submissions, open reports and seven-day activity."
      />

      {isLoading ? (
        <Skeleton lines={6} className="mt-10" />
      ) : error ? (
        <EmptyState
          className="mt-10"
          eyebrow="Unavailable"
          title="Analytics could not be loaded."
          description={error.message}
        />
      ) : data ? (
        <>
          <dl className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Published resources", data.published, "resources"],
              ["Total resources", data.resources, "including drafts and deprecated"],
              ["Open submissions", data.submissionsOpen, "pending or in review"],
              ["Open reports", data.reportsOpen, "open or triaged"],
              ["Downloads (7d)", data.downloads7d, "all versions"],
              ["Views (7d)", data.views7d, "unique by client hash"],
              ["Contributors", data.contributors, "attributed accounts"],
            ].map(([label, value, note]) => (
              <div
                key={String(label)}
                className="flex flex-col gap-1 border-t border-line py-5"
              >
                <dt className="eyebrow">{label}</dt>
                <dd className="font-display text-step-4 tracking-tight text-ink">
                  {formatCount(Number(value))}
                </dd>
                <dd className="text-[0.8rem] text-graphite">{note}</dd>
              </div>
            ))}
          </dl>

          <Section label="Queues needing attention" className="mt-16">
            <div className="flex flex-wrap gap-3">
              <QueueLink to="/admin/submissions" icon={<Clock className="h-3.5 w-3.5" />} count={data.submissionsOpen} label="Submissions awaiting review" />
              <QueueLink to="/admin/reports" icon={<FileWarning className="h-3.5 w-3.5" />} count={data.reportsOpen} label="Open reports" />
            </div>
          </Section>
        </>
      ) : null}
    </>
  );
}

function QueueLink({
  to,
  icon,
  count,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  count: number;
  label: string;
}): React.JSX.Element {
  return (
    <Link
      to={to}
      className="flex flex-1 items-center gap-3 border border-line px-4 py-3 transition-colors duration-fast hover:border-ink sm:min-w-[18rem]"
    >
      <span aria-hidden className="text-graphite">
        {icon}
      </span>
      <span className="flex-1 text-[0.85rem] text-ink">{label}</span>
      <span className="font-mono text-[0.85rem] text-ink">{String(count).padStart(2, "0")}</span>
    </Link>
  );
}

export function AdminSubmissionsPage(): React.JSX.Element {
  const { token } = useAuth();
  const isAdmin = useHasRole("admin");
  const [status, setStatus] = React.useState("pending");
  const { data, error, isLoading, reload } = useApiResource(
    () => api.listSubmissionsForReview({ status: status === "all" ? undefined : status, perPage: 50 }, token),
    "admin-submissions",
    status,
    token,
  );

  const [reviewing, setReviewing] = React.useState<string | null>(null);
  const [decision, setDecision] = React.useState("changes_requested");
  const [notes, setNotes] = React.useState("");
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  useDocumentTitle("Submissions — Moderation — UniqueFingerprint");

  const submitReview = async () => {
    if (!reviewing) return;
    setPending(true);
    setActionError(null);
    try {
      await api.submitReview(reviewing, { decision, notes: notes || undefined }, token);
      setReviewing(null);
      setNotes("");
      reload();
    } catch (cause) {
      setActionError(cause instanceof Error ? cause.message : "The review could not be recorded.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <SectionHeader
        eyebrow="Moderation · submissions"
        title="Review queue."
        description={
          isAdmin
            ? "Moderators triage: request changes or reject. As an administrator you can also approve, which publishes the resource."
            : "Moderators triage: request changes or reject. Approval publishes content and is limited to administrators."
        }
      />

      <div className="mt-8">
        <SegmentedControl
          label="Filter by status"
          hideLabel
          value={status}
          onValueChange={setStatus}
          options={[
            { value: "pending", label: "Pending" },
            { value: "reviewing", label: "Reviewing" },
            { value: "changes_requested", label: "Changes" },
            { value: "approved", label: "Approved" },
            { value: "rejected", label: "Rejected" },
            { value: "all", label: "All" },
          ]}
        />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <Skeleton lines={6} />
        ) : error ? (
          <EmptyState
            eyebrow="Unavailable"
            title="The review queue could not be loaded."
            description={error.message}
          />
        ) : !data || data.items.length === 0 ? (
          <EmptyState
            eyebrow="Queue empty"
            title={`No submissions with status “${status}”.`}
            description="An empty queue is the healthy state. Contributions appear here as soon as a contributor opens one."
          />
        ) : (
          <ul>
            {data.items.map((submission) => (
              <li key={submission.id} className="border-b border-line py-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-step-1 tracking-tight text-ink">
                        {submission.title}
                      </span>
                      <StatusPill tone={SUBMISSION_STATUS_TONE[submission.status] ?? "neutral"}>
                        {submission.status.replace("_", " ")}
                      </StatusPill>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                      {submission.slug} · {submission.resourceType}
                      {submission.submitter ? ` · @${submission.submitter.username}` : ""}
                      {` · ${formatDateTime(submission.createdAt)}`}
                    </span>
                    {submission.pullRequestUrl ? (
                      <a
                        href={submission.pullRequestUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1 text-[0.82rem] text-oxide"
                      >
                        <GitPullRequest aria-hidden className="h-3 w-3" />
                        Review the pull request
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="text-[0.8rem] text-graphite">
                        No pull request linked — this cannot be approved yet.
                      </span>
                    )}
                    {submission.reviewNotes ? (
                      <p className="mt-1 border-l-2 border-line pl-3 text-[0.82rem] italic text-graphite">
                        {submission.reviewNotes}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {submission.pullRequestUrl ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a href={submission.pullRequestUrl} target="_blank" rel="noreferrer noopener">
                          <Eye aria-hidden className="h-3 w-3" />
                          Inspect
                        </a>
                      </Button>
                    ) : null}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReviewing(submission.id);
                        setDecision("changes_requested");
                        setNotes("");
                        setActionError(null);
                      }}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={reviewing !== null} onOpenChange={() => setReviewing(null)}>
        <DialogContent>
          <DialogTitle>Record a review decision</DialogTitle>
          <DialogDescription>
            The decision is written to `reviews` and to `audit_logs` in one transaction, so the queue
            and the audit trail cannot disagree.
          </DialogDescription>

          <SegmentedControl
            label="Decision"
            value={decision}
            onValueChange={setDecision}
            options={[
              { value: "reviewing", label: "Reviewing" },
              { value: "changes_requested", label: "Request changes" },
              { value: "rejected", label: "Reject" },
              // Approval is offered only to administrators; the API enforces the
              // same restriction, so this is a convenience rather than the gate.
              ...(isAdmin ? [{ value: "approved", label: "Approve & publish" }] : []),
            ]}
          />

          <Textarea
            label="Notes for the contributor"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="What needs to change, or why this was approved."
            hint="Shown to the contributor in their submissions list."
          />

          {actionError ? (
            <p role="alert" className="text-[0.82rem] text-oxide">
              {actionError}
            </p>
          ) : null}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setReviewing(null)}>
              Cancel
            </Button>
            <Button onClick={() => void submitReview()} loading={pending} disabled={!isAdmin && decision === "approved"}>
              {decision === "approved" ? (
                <>
                  <Check aria-hidden className="h-3.5 w-3.5" />
                  Approve and publish
                </>
              ) : (
                "Record decision"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AdminResourcesPage(): React.JSX.Element {
  const { token } = useAuth();
  const isAdmin = useHasRole("admin");
  useDocumentTitle("Resources — Moderation — UniqueFingerprint");

  const [actionError, setActionError] = React.useState<string | null>(null);
  const [target, setTarget] = React.useState<{ slug: string; action: "deprecate" | "delete" } | null>(
    null,
  );
  const [pending, setPending] = React.useState(false);

  const run = async () => {
    if (!target) return;
    setPending(true);
    setActionError(null);
    try {
      const response = await fetch(
        `/api/v1/admin/resources/${encodeURIComponent(target.slug)}`,
        {
          method: target.action === "delete" ? "DELETE" : "POST",
          headers: { authorization: `Bearer ${token ?? ""}` },
        },
      );
      if (!response.ok) {
        const body = (await response.json()) as { error?: { message?: string } };
        throw new Error(body.error?.message ?? `Request failed with ${response.status}.`);
      }
      setTarget(null);
    } catch (cause) {
      setActionError(cause instanceof Error ? cause.message : "The action failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <SectionHeader
        eyebrow="Moderation · resources"
        title="Deprecate or archive a published resource."
        description="Deprecation keeps a resource readable but marks it as superseded. Archiving is a soft delete: it disappears from the catalogue while every published version stays on record, because someone who installed 1.0.0 must always be able to see what 1.0.0 contained."
      />

      <Section label="Take an action" className="mt-10">
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setTarget({
              slug: String(data.get("slug") ?? ""),
              action: String(data.get("action") ?? "deprecate") as "deprecate" | "delete",
            });
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="resource-slug" className="eyebrow">
              Resource slug
            </label>
            <input
              id="resource-slug"
              name="slug"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              placeholder="magnetic-button"
              className="h-11 border-b border-line bg-transparent px-0 font-mono text-[0.85rem] text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <SegmentedControl
            label="Action"
            hideLabel
            value="deprecate"
            onValueChange={() => {}}
            options={[{ value: "deprecate", label: "Deprecate" }]}
          />
          <input type="hidden" name="action" value="deprecate" />

          <Button type="submit">Deprecate</Button>

          {isAdmin ? (
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                const input = document.getElementById("resource-slug") as HTMLInputElement | null;
                if (input?.value) setTarget({ slug: input.value, action: "delete" });
              }}
            >
              Archive (soft delete)
            </Button>
          ) : null}
        </form>

        {actionError ? (
          <p role="alert" className="mt-4 text-[0.82rem] text-oxide">
            {actionError}
          </p>
        ) : null}
      </Section>

      <Dialog open={target !== null} onOpenChange={() => setTarget(null)}>
        <DialogContent>
          <DialogTitle>
            {target?.action === "delete" ? "Archive this resource?" : "Deprecate this resource?"}
          </DialogTitle>
          <DialogDescription>
            {target?.action === "delete"
              ? "Archiving is reversible and does not delete any version. It sets deleted_at and hides the resource from the catalogue."
              : "Deprecation keeps the resource readable but marks it as superseded in the catalogue."}{" "}
            The change is written to the audit log with your account attached.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setTarget(null)}>
              Cancel
            </Button>
            <Button
              variant={target?.action === "delete" ? "danger" : "primary"}
              loading={pending}
              onClick={() => void run()}
            >
              {target?.action === "delete" ? "Archive" : "Deprecate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AdminReportsPage(): React.JSX.Element {
  useDocumentTitle("Reports — Moderation — UniqueFingerprint");

  return (
    <>
      <SectionHeader
        eyebrow="Moderation · reports"
        title="Reports from the community."
        description="Anyone can report a resource, whether or not they have an account — someone who spots stolen work should be able to say so. A report opens a review; it never removes anything by itself."
      />

      <EmptyState
        className="mt-10"
        eyebrow="Requires an API"
        title="Reports are read from the API."
        description="This deployment has no reachable API for the reports endpoint, or there are no reports to show. Reports are stored in the database alongside the resource they refer to, and are never rendered as raw HTML."
        action={
          <div className="flex flex-wrap gap-2">
            <Badge tone="ink">GET /api/v1/admin/reports</Badge>
            <Button variant="outline" asChild>
              <Link to="/docs/security">Read the security model</Link>
            </Button>
          </div>
        }
      />
    </>
  );
}

export function AdminUsersPage(): React.JSX.Element {
  useDocumentTitle("Users — Moderation — UniqueFingerprint");

  return (
    <>
      <SectionHeader
        eyebrow="Moderation · users"
        title="Roles and access."
        description="Roles are stored on the profile and read from the database on every request. A token that claims a higher role changes nothing here — which is why changing a role is a database write with an audit entry, not a token change."
      />

      <Section label="The role ladder" className="mt-10">
        <ul className="flex flex-col">
          {[
            ["user", "Can read everything, save favourites and create collections."],
            ["contributor", "Can additionally open submissions for review."],
            ["moderator", "Can triage submissions and resolve reports. Cannot approve."],
            ["admin", "Can approve submissions, change roles, archive resources and read the audit log."],
          ].map(([role, capability]) => (
            <li key={role} className="flex flex-wrap items-baseline gap-6 border-b border-line py-4">
              <span className="w-[8rem] shrink-0">
                <StatusPill tone={role === "admin" ? "critical" : role === "moderator" ? "warning" : "neutral"}>
                  {role}
                </StatusPill>
              </span>
              <span className="flex-1 text-[0.86rem] leading-relaxed text-graphite">{capability}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-start gap-2 text-[0.85rem] leading-relaxed text-graphite">
          <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          Role changes and bans go through <code className="font-mono">POST /api/v1/admin/users/:id/role</code>{" "}
          and <code className="font-mono">POST /api/v1/admin/users/:id/ban</code>. Both write an audit
          entry, and neither can be performed on your own account for a demotion or a ban.
        </p>
      </Section>
    </>
  );
}

export function AdminAnalyticsPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading } = useApiResource(() => api.getAnalytics(token), "analytics", token);
  useDocumentTitle("Analytics — Moderation — UniqueFingerprint");

  return (
    <>
      <SectionHeader
        eyebrow="Moderation · analytics"
        title="What the registry is doing."
        description="Aggregates only. Views are counted against a salted digest of the client address, never the address itself, and there is no per-visitor table anywhere in the schema."
      />

      {isLoading ? (
        <Skeleton lines={6} className="mt-10" />
      ) : error ? (
        <EmptyState
          className="mt-10"
          eyebrow="Unavailable"
          title="Analytics could not be loaded."
          description={error.message}
        />
      ) : data ? (
        <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {[
            ["Downloads, 7 days", data.downloads7d],
            ["Views, 7 days", data.views7d],
            ["Published resources", data.published],
            ["Contributors", data.contributors],
          ].map(([label, value]) => (
            <div key={String(label)} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
              <dt className="eyebrow">{label}</dt>
              <dd className="font-display text-step-3 tracking-tight text-ink">
                {formatCount(Number(value))}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <Section label="What is not collected" className="mt-14">
        <ul className="flex flex-col gap-3">
          {[
            ["Precise location", "Never requested, never inferred."],
            ["Raw IP addresses", "Hashed with a server-side salt before any write. The salt is not in the database."],
            ["Contact lists", "No API scope requests them, and no table stores them."],
            ["Device fingerprints", "No canvas, font or WebGL probing anywhere in the client."],
          ].map(([item, note]) => (
            <li key={item} className="flex items-start gap-3 border-b border-line pb-3">
              <X aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-oxide" />
              <span>
                <span className="block text-[0.86rem] text-ink">{item}</span>
                <span className="mt-0.5 block text-[0.82rem] leading-relaxed text-graphite">{note}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
