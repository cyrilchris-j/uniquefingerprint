import * as React from "react";
import { Link } from "react-router";

import { RESOURCE_TYPES } from "@openui/types";
import { Button, EmptyState, Input, SegmentedControl, Textarea } from "@openui/ui";
import { slugify } from "@openui/utils";

import { CodeBlock } from "../components/CodeBlock.js";
import { Section, SectionHeader } from "../components/SectionHeader.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import * as api from "../lib/api.js";
import { useAuth } from "../lib/auth.js";
import { SignInPanel } from "../components/SignInPanel.js";

/**
 * Submit a resource.
 *
 * The form captures the *intent* — what the resource is and where the pull
 * request lives — and nothing else. It deliberately does not accept source: the
 * canonical home of a registry resource is the repository, and a submission that
 * carried code would create a second, unversioned copy of it.
 *
 * What the form submits is a row in `submissions` with status `pending`. It
 * cannot publish anything. Moving a submission to `approved` is a separate,
 * staff-only endpoint, and the database policy enforces the same rule — a
 * contributor cannot insert a published resource into production state, however
 * they call the API.
 */
export default function SubmitPage(): React.JSX.Element {
  const { user, token, enabled, initialising } = useAuth();
  useDocumentTitle("Submit a resource — UniqueFingerprint Design Registry");

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [slugTouched, setSlugTouched] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [resourceType, setResourceType] = React.useState("component");
  const [pullRequestUrl, setPullRequestUrl] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "submitted">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});

  // The slug follows the title until the author edits it, after which their
  // choice is respected. Auto-slugging over a deliberate edit is a real bug.
  const effectiveSlug = slugTouched ? slug : slugify(title);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    try {
      await api.createSubmission(
        {
          title,
          description,
          resourceType,
          slug: effectiveSlug,
          ...(pullRequestUrl ? { pullRequestUrl } : {}),
        },
        token,
      );
      setStatus("submitted");
    } catch (cause) {
      setStatus("idle");
      if (cause instanceof api.ApiError) {
        setError(cause.message);
        if (cause.details) {
          setFieldErrors(
            Object.fromEntries(cause.details.map((detail) => [detail.path, detail.message])),
          );
        }
      } else {
        setError(cause instanceof Error ? cause.message : "Submission failed.");
      }
    }
  };

  if (!enabled) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Submissions unavailable"
          title="This deployment has no authentication configured."
          description="Contributions need an account so the registry can attribute the work and contact you about a review. Sign in with Google or GitHub to enable it."
          action={
            <Button variant="outline" asChild>
              <Link to="/docs/contributing">Read the contributing guide</Link>
            </Button>
          }
        />
      </div>
    );
  }

  if (initialising) {
    return (
      <div className="shell py-20">
        <p className="eyebrow">Checking your session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shell py-20">
        <SignInPanel
          title="Sign in to contribute"
          description="Contributions are attributed, so the registry needs to know who submitted one. Signing in takes a moment and never costs anything."
        />
      </div>
    );
  }

  if (status === "submitted") {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Submitted"
          title="Your resource is in the review queue."
          description={
            <>
              It has the status <span className="font-mono text-ink">pending</span>. A moderator will
              review it, and you will see the decision in your submissions list. Nothing is published
              until a review approves it — that is deliberate, and it is what keeps the registry
              trustworthy.
            </>
          }
          action={
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/account/submissions">View your submissions</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStatus("idle");
                  setTitle("");
                  setSlug("");
                  setSlugTouched(false);
                  setDescription("");
                  setPullRequestUrl("");
                }}
              >
                Submit another
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Contribute"
        title="Add the resource you wish existed."
        description="Submitting takes a title, a description and a resource type. The source itself lives in a pull request against the registry repository — the canonical home of every resource — so there is exactly one version of the truth."
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
        <form onSubmit={submit} className="flex flex-col gap-6">
          <Input
            label="Title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Editorial Hero"
            error={fieldErrors["title"]}
            hint="The name as it should appear in the catalogue."
          />

          <Input
            label="Slug"
            required
            mono
            value={effectiveSlug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            placeholder="editorial-hero"
            error={fieldErrors["slug"]}
            hint="Lowercase words joined by single hyphens. Used in the install command and the URL."
          />

          <Textarea
            label="Description"
            required
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What it is, and what it is for — in one or two sentences."
            error={fieldErrors["description"]}
            hint="Minimum 20 characters. Describe the resource, not the marketing."
          />

          <div>
            <p className="eyebrow mb-2">Resource type</p>
            <SegmentedControl
              label="Resource type"
              hideLabel
              value={resourceType}
              onValueChange={setResourceType}
              options={RESOURCE_TYPES.map((type) => ({ value: type, label: type }))}
            />
          </div>

          <Input
            label="Pull request URL"
            type="url"
            mono
            value={pullRequestUrl}
            onChange={(event) => setPullRequestUrl(event.target.value)}
            placeholder="https://github.com/your-org/uniquefingerprint/pull/123"
            error={fieldErrors["pullRequestUrl"]}
            hint="Optional at this stage; the review cannot proceed without it."
          />

          {error ? (
            <p role="alert" className="text-[0.85rem] text-oxide">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" loading={status === "submitting"}>
              Submit for review
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/docs/contributing">Read the guide first</Link>
            </Button>
          </div>
        </form>

        <aside>
          <Section label="What happens next">
            <ol className="flex flex-col">
              {[
                ["Open a pull request", "Add the resource directory to registry/default/ and open a PR."],
                ["Automated validation", "Schema, path safety, dependency policy and licence checks run in CI."],
                ["Preview build", "The build generates the item JSON, the index and the demos."],
                ["Moderator review", "A moderator checks the design quality and the licence."],
                ["Publish", "Approved items are published and become immutable."],
              ].map(([title, body], position) => (
                <li key={title} className="flex gap-3 border-b border-line py-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[0.88rem] text-ink">{title}</span>
                    <span className="mt-0.5 block text-[0.84rem] leading-relaxed text-graphite">
                      {body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <CodeBlock
                caption="What a resource directory contains"
                language="text"
                tone="light"
                code={`registry/default/components/magnetic-button/
├── registry.json      # metadata, licence, dependencies
├── magnetic-button.tsx
├── demo.tsx           # rendered in the isolated sandbox
├── README.md
├── design.md          # the fingerprint and the rules
└── screenshot.webp`}
              />
            </div>
          </Section>
        </aside>
      </div>
    </div>
  );
}
