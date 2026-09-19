import { ExternalLink } from "lucide-react";
import * as React from "react";
import { Link, useParams } from "react-router";

import { Badge, Button, EmptyState, Skeleton } from "@openui/ui";
import { formatCount } from "@openui/utils";

import { SectionHeader, Section } from "../components/SectionHeader.js";
import { ResourceTile } from "../components/ResourceTile.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { API_AVAILABLE, useApiResource } from "../lib/use-api-resource.js";
import * as api from "../lib/api.js";

/**
 * Contributors.
 *
 * Two sources, deliberately:
 *
 *  - the **registry index** tells us which resources exist and who authored them
 *    (from `registry.json`'s author field, when a resource declares one),
 *  - the **API** adds the community aggregates — download totals, join dates —
 *    which a static artifact cannot know.
 *
 * So the index renders a complete list offline, and the API enriches it. A
 * deployment with no database still shows contributors; it just shows them
 * without counters, rather than showing nothing.
 */
export default function ContributorsPage(): React.JSX.Element {
  const index = useRegistryIndex();
  useDocumentTitle("Contributors — UniqueFingerprint Design Registry");

  const { data: community, error } = useApiResource(
    (signal) => apiFetchContributors(signal),
    "contributors",
  );

  // Author counts derived from the index, which is the part that always exists.
  const fromRegistry = React.useMemo(() => {
    const counts = new Map<string, { name: string; count: number }>();
    for (const item of index.data?.items ?? []) {
      const name = item.author?.name;
      if (!name) continue;
      const entry = counts.get(name) ?? { name, count: 0 };
      entry.count += 1;
      counts.set(name, entry);
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [index.data]);

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Contributors"
        title="The people whose fingerprints are in this registry."
        description="Every published resource names an author in its metadata. Counters come from the API when a database is configured; the roster itself comes from the registry index, which works everywhere."
      />

      {index.isLoading ? (
        <Skeleton lines={8} className="mt-10" />
      ) : (
        <>
          <Section label="From the registry" className="mt-12">
            {fromRegistry.length === 0 ? (
              <EmptyState
                eyebrow="No attributed resources"
                title="No published resource declares an author yet."
                description="A resource declares its author in registry.json. Until it does, the registry cannot attribute the work — which is also why the contributing guide asks for it."
                action={
                  <Button variant="outline" asChild>
                    <Link to="/docs/contributing">Read the contributing guide</Link>
                  </Button>
                }
              />
            ) : (
              <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {fromRegistry.map((contributor) => (
                  <li
                    key={contributor.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <span className="text-[0.9rem] text-ink">{contributor.name}</span>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-graphite">
                      {String(contributor.count).padStart(2, "0")} resources
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {API_AVAILABLE ? (
            <Section label="Community accounts" className="mt-16">
              {error ? (
                <p className="text-[0.88rem] leading-relaxed text-graphite">
                  Community profiles are unavailable: {error.message}
                </p>
              ) : !community ? (
                <Skeleton lines={5} />
              ) : community.items.length === 0 ? (
                <p className="text-[0.88rem] text-graphite">
                  No accounts have published a resource yet.
                </p>
              ) : (
                <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  {community.items.map((contributor) => (
                    <li key={contributor.id} className="border-b border-line py-3">
                      <Link
                        to={`/contributors/${contributor.username}`}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <span className="flex flex-col">
                          <span className="text-[0.9rem] text-ink">
                            {contributor.displayName ?? contributor.username}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                            @{contributor.username}
                          </span>
                        </span>
                        <span className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.08em] text-graphite">
                          <span>{contributor.resourceCount} res</span>
                          <span>{formatCount(contributor.totalDownloads)} dl</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          ) : null}

          {!API_AVAILABLE ? (
            <Section label="Community accounts" className="mt-16">
              <p className="text-[0.88rem] leading-relaxed text-graphite">
                This deployment has no API configured, so account profiles, download totals and join
                dates are not shown. The roster above is read directly from the published registry
                index and is complete.
              </p>
            </Section>
          ) : null}
        </>
      )}
    </div>
  );
}

/** A single contributor's page. */
export function ContributorPage(): React.JSX.Element {
  const { username = "" } = useParams<{ username: string }>();
  const index = useRegistryIndex();
  useDocumentTitle(`@${username} — UniqueFingerprint Design Registry`);

  const { data: contributor, error } = useApiResource(
    (signal) => apiFetchContributor(username, signal),
    "contributor",
    username,
  );

  const authored = React.useMemo(() => {
    if (!index.data) return [];
    return index.data.items.filter(
      (item) => item.author?.name.toLowerCase() === username.toLowerCase(),
    );
  }, [index.data, username]);

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Contributor"
        title={contributor?.displayName ?? `@${username}`}
        description={
          contributor?.bio ??
          (contributor
            ? `${contributor.resourceCount} published resources · ${formatCount(contributor.totalDownloads)} downloads · joined ${new Date(contributor.joinedAt).getUTCFullYear()}`
            : "A published contributor in the UniqueFingerprint registry.")
        }
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/contributors">All contributors</Link>
          </Button>
        }
      />

      {error ? (
        <p className="mt-8 text-[0.88rem] text-graphite">
          Profile details are unavailable: {error.message}
        </p>
      ) : null}

      <Section label={`Resources (${authored.length})`} className="mt-12">
        {authored.length === 0 ? (
          <EmptyState
            eyebrow="No attributed resources"
            title="No published resource names this contributor yet."
            description="Attribution comes from registry.json. A resource that does not declare an author cannot be credited here."
          />
        ) : (
          <div className="catalogue-grid">
            {authored.map((item, position) => (
              <ResourceTile key={item.name} item={item} index={position + 1} withPreview />
            ))}
          </div>
        )}
      </Section>

      <Section label="Elsewhere" className="mt-16">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <a
              href={`https://github.com/${encodeURIComponent(username)}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
              <ExternalLink aria-hidden className="h-3 w-3" />
            </a>
          </Button>
          <Badge>@{username}</Badge>
        </div>
      </Section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* API access                                                                  */
/* -------------------------------------------------------------------------- */

async function apiFetchContributors(signal: AbortSignal) {
  void signal;
  return api.listContributors();
}

async function apiFetchContributor(username: string, signal: AbortSignal) {
  void signal;
  return api.getContributor(username);
}
