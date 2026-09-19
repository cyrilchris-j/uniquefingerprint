import { Lock, Globe } from "lucide-react";
import * as React from "react";
import { Link, useParams } from "react-router";

import { Badge, Button, EmptyState, Skeleton, StatusPill } from "@openui/ui";

import { SectionHeader } from "../components/SectionHeader.js";
import { ResourceTile, categorySegmentFor } from "../components/ResourceTile.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import * as api from "../lib/api.js";
import { API_AVAILABLE, useApiResource } from "../lib/use-api-resource.js";

/**
 * Public collections.
 *
 * A collection is the registry's answer to "what goes together". The example the
 * product ships is an editorial portfolio: a hero, a kinetic heading, a magnetic
 * button, a scroll reveal, a grain background and a split navigation — six
 * resources that were designed to be composed, listed in the order they compose.
 *
 * Visibility is enforced by the *API*, not by this page: a private collection
 * returns 404 to anyone but its owner, so there is no client-side flag to bypass.
 * The lock icon only reflects what the API already decided.
 */
export function CollectionsPage(): React.JSX.Element {
  const { data, error, isLoading } = useApiResource(
    () => api.listCollections({ perPage: 48 }),
    "collections",
  );

  useDocumentTitle("Collections — UniqueFingerprint Design Registry");

  return (
    <div className="shell py-8 sm:py-16">
      <SectionHeader
        as="h1"
        eyebrow="Collections"
        title="Compositions that were designed to go together."
        description="A collection is a saved arrangement of registry resources, in order. Public ones are listed here; private ones are visible only to their owner, which the API enforces rather than this page."
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/account/collections">Your collections</Link>
          </Button>
        }
      />

      {!API_AVAILABLE ? (
        <EmptyState
          className="mt-12"
          eyebrow="Unavailable"
          title="This deployment has no API configured."
          description="Collections are stored in the database, so they need an API. The catalogue, resource pages and playground all work without one."
        />
      ) : isLoading ? (
        <Skeleton lines={8} className="mt-12" />
      ) : error ? (
        <EmptyState
          className="mt-12"
          eyebrow="Unavailable"
          title="Collections could not be loaded."
          description={
            <>
              {error.message} The catalogue index is unaffected and can be browsed directly.
            </>
          }
          action={
            <Button variant="outline" asChild>
              <Link to="/explore">Browse the catalogue</Link>
            </Button>
          }
        />
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          className="mt-12"
          eyebrow="Nothing public yet"
          title="No public collections have been published."
          description="Anyone with an account can create one and make it public. A collection is a list of resources plus a one-line reason for each."
          action={
            <Button asChild>
              <Link to="/account/collections">Create a collection</Link>
            </Button>
          }
        />
      ) : (
        <ul className="mt-12">
          {data.items.map((collection, position) => (
            <li key={collection.id} className="border-t border-line">
              <Link
                to={`/collections/${collection.id}`}
                className="grid gap-3 py-6 transition-colors duration-fast ease-editorial hover:bg-ink/[0.02] lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-12"
              >
                <div>
                  <p className="eyebrow">
                    {String(position + 1).padStart(2, "0")} · {collection.itemCount}{" "}
                    {collection.itemCount === 1 ? "resource" : "resources"}
                  </p>
                  <h2 className="mt-3 font-display text-step-3 leading-tight tracking-tight text-ink">
                    {collection.title}
                  </h2>
                  {collection.description ? (
                    <p className="mt-3 max-w-[52ch] text-[0.9rem] leading-relaxed text-graphite">
                      {collection.description}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusPill tone={collection.isPublic ? "positive" : "neutral"} bare>
                    {collection.isPublic ? (
                      <>
                        <Globe aria-hidden className="h-3 w-3" /> public
                      </>
                    ) : (
                      <>
                        <Lock aria-hidden className="h-3 w-3" /> private
                      </>
                    )}
                  </StatusPill>
                  {collection.owner ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                      @{collection.owner.username}
                    </span>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** A single collection, in composition order. */
export function CollectionPage(): React.JSX.Element {
  const { id = "" } = useParams<{ id: string }>();
  const { data, error, isLoading } = useApiResource(
    () => api.getCollection(id),
    "collection",
    id,
  );

  useDocumentTitle(data ? `${data.title} — Collection — UniqueFingerprint` : "Collection — UniqueFingerprint");

  if (isLoading) {
    return (
      <div className="shell py-16">
        <Skeleton lines={10} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="shell py-16">
        <EmptyState
          title="Collection not found"
          description="The collection may have been removed, made private, or the link is incorrect."
          action={
            <Button asChild>
              <Link to="/collections">Back to collections</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell py-8 sm:py-16">
      <header className="border-b border-line pb-8">
        <p className="eyebrow mb-2">Collection · {data.items.length} items</p>
        <h1 className="optically-align text-step-5 font-normal tracking-tight text-ink">
          {data.title}
        </h1>
        {data.description && (
          <p className="prose-measure mt-3 text-step-1 text-graphite">{data.description}</p>
        )}
        <div className="mt-4 flex items-center gap-3 text-[0.82rem] text-graphite">
          {data.owner && <span>Curated by @{data.owner.username}</span>}
          <span>·</span>
          <span>{data.items.length} resources</span>
        </div>
      </header>

      {/* The install command for a whole composition is the point of a
          collection: one line to reproduce the arrangement. */}
      <div className="mt-8">
        <p className="eyebrow mb-2">Install the whole collection</p>
        <code className="block overflow-x-auto border border-line bg-ink/95 px-4 py-3 font-mono text-[0.78rem] text-paper">
          pnpm dlx uniquefingerprint add{" "}
          {data.items.map((item) => item.resource.slug).join(" ") || "<nothing yet>"}
        </code>
      </div>

      <ol className="mt-12">
        {data.items.map((item, position) => (
          <li
            key={item.id}
            className="grid gap-4 border-t border-line py-6 lg:grid-cols-[3rem_minmax(0,1fr)]"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-graphite">
              {String(position + 1).padStart(2, "0")}
            </span>
            <div>
              <Link
                to={`/${categorySegmentFor(item.resource.categorySlug ?? "components")}/${item.resource.slug}`}
                className="font-display text-step-2 tracking-tight text-ink transition-colors hover:text-oxide"
              >
                {item.resource.title}
              </Link>
              <p className="mt-2 max-w-[62ch] text-[0.88rem] leading-relaxed text-graphite">
                {item.resource.description}
              </p>
              {item.note ? (
                <p className="mt-2 border-l-2 border-line pl-3 text-[0.85rem] italic text-graphite">
                  {item.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {data.items.length === 0 ? (
        <EmptyState
          className="mt-12"
          eyebrow="Empty"
          title="This collection has no resources yet."
          description="Add resources from any resource page; the collection keeps them in the order you choose."
        />
      ) : (
        <div className="catalogue-grid mt-12">
          {data.items.slice(0, 9).map((item, position) => (
            <div key={item.id} className="bg-paper p-5">
              <p className="eyebrow">{String(position + 1).padStart(2, "0")} in composition</p>
              <p className="mt-2 font-display text-step-2 tracking-tight text-ink">
                {item.resource.title}
              </p>
              <p className="mt-2 text-[0.85rem] text-graphite">{item.resource.resourceType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ResourceTile };
