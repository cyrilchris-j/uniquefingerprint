import { Github, Lock, Globe, Trash2, Heart, ArrowUpRight } from "lucide-react";
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
  Input,
  SegmentedControl,
  Skeleton,
  StatusPill,
  SUBMISSION_STATUS_TONE,
} from "@openui/ui";
import { formatDate } from "@openui/utils";

import { ResourceTile, categorySegmentFor } from "../components/ResourceTile.js";
import { getAdvancedItemBySlug } from "../advanced/index.js";
import { Section, SectionHeader } from "../components/SectionHeader.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import * as api from "../lib/api.js";
import { useAuth } from "../lib/auth.js";
import { useApiResource } from "../lib/use-api-resource.js";
import { getFavoritesAsPaginated, removeFavorite, syncFavoritesFromFirestore } from "../lib/favorites.js";
import type { ResourceSummary } from "@openui/types";

/**
 * Account pages.
 *
 * The layout already guarantees a session, so these pages assume one and use the
 * token from context for every call. Ownership is enforced by the API — every
 * mutation is scoped by `user_id` in its `where` clause — so these pages never
 * send a user id at all. There is nothing here for a client to tamper with.
 */

export function ProfilePage(): React.JSX.Element {
  const { user, token } = useAuth();
  useDocumentTitle("Profile — OpenUI");

  const [savedData, setSavedData] = React.useState(() => getFavoritesAsPaginated(user?.id));

  React.useEffect(() => {
    if (user?.id) {
      void syncFavoritesFromFirestore(user.id).then(() => {
        setSavedData(getFavoritesAsPaginated(user.id));
      });
    }
    const handleUpdate = () => {
      setSavedData(getFavoritesAsPaginated(user?.id));
    };
    window.addEventListener("openui:favorites_changed", handleUpdate);
    return () => {
      window.removeEventListener("openui:favorites_changed", handleUpdate);
    };
  }, [user?.id]);

  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "Account User");

  const savedItems = savedData.items;

  return (
    <div className="max-w-xl space-y-6">
      <div className="border-b border-line pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow text-xs text-graphite uppercase tracking-widest">Profile</p>
            <h2 className="font-display text-2xl sm:text-3xl text-ink tracking-tight">Public Identity</h2>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider bg-line/10 border border-line text-graphite font-semibold">
            {user?.role ?? "user"}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-graphite leading-relaxed">
          Your public identity in the registry, synced directly from your verified Google / GitHub session.
        </p>
      </div>

      <div className="rounded-lg border border-line bg-paper/60 p-4 sm:p-5 shadow-xs">
        <dl className="divide-y divide-line/60">
          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-6">
            <dt className="text-sm font-medium text-graphite sm:w-[9rem] shrink-0">
              Display name
            </dt>
            <dd className="text-base font-medium text-ink break-words">
              {displayName}
            </dd>
          </div>

          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-6">
            <dt className="text-sm font-medium text-graphite sm:w-[9rem] shrink-0">
              Email address
            </dt>
            <dd className="font-mono text-sm sm:text-base text-ink break-all">
              {user?.email ?? "Unknown"}
            </dd>
          </div>

          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-6">
            <dt className="text-sm font-medium text-graphite sm:w-[9rem] shrink-0">
              Account role
            </dt>
            <dd className="font-mono text-sm uppercase tracking-wide text-ink font-semibold">
              {user?.role ?? "user"}
            </dd>
          </div>
        </dl>

        <p className="mt-4 pt-3 border-t border-line/40 text-xs text-graphite/80 leading-relaxed">
          Your role is verified against database row-level security on every request.
        </p>
      </div>

      {/* --- User Saved Resources Section in Profile --- */}
      <div className="rounded-lg border border-line bg-paper/60 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-oxide fill-oxide/20" />
            <h3 className="font-display text-lg text-ink">Saved Resources</h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-line/15 border border-line text-graphite">
              {savedItems.length}
            </span>
          </div>
          {savedItems.length > 0 && (
            <Link
              to="/account/favorites"
              className="text-xs font-mono text-oxide hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {savedItems.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-graphite">No components saved yet.</p>
            <p className="text-xs text-graphite/70 mt-1">
              Browse components and click Save to access them anytime here.
            </p>
            <Button size="sm" variant="outline" asChild className="mt-4">
              <Link to="/explore">Explore Catalogue</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-line/60">
            {savedItems.slice(0, 5).map((resource) => {
              const adv = getAdvancedItemBySlug(resource.slug);
              const itemHref = adv
                ? `/advanced/${adv.category}/${adv.slug}`
                : `/${categorySegmentFor(resource.categorySlug ?? "components")}/${resource.slug}`;

              return (
                <li
                  key={resource.id}
                  className="flex items-center justify-between gap-3 py-3 hover:bg-line/5 rounded-sm px-1.5 transition-colors"
                >
                  <Link to={itemHref} className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="font-medium text-sm text-ink hover:text-oxide transition-colors truncate">
                      {resource.title}
                    </span>
                    <span className="text-xs text-graphite line-clamp-1">
                      {resource.description}
                    </span>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (user?.id) {
                        removeFavorite(user.id, resource.slug, token);
                      }
                    }}
                    aria-label={`Remove ${resource.title}`}
                    title="Remove"
                    className="text-graphite hover:text-oxide hover:bg-oxide/10 shrink-0 h-7 w-7"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export function FavoritesPage(): React.JSX.Element {
  const { user, token } = useAuth();
  const [localFavorites, setLocalFavorites] = React.useState(() =>
    getFavoritesAsPaginated(user?.id),
  );

  React.useEffect(() => {
    const update = () => {
      setLocalFavorites(getFavoritesAsPaginated(user?.id));
    };
    update();
    window.addEventListener("openui:favorites_changed", update);
    return () => {
      window.removeEventListener("openui:favorites_changed", update);
    };
  }, [user?.id]);

  const { data: remoteData, isLoading } = useApiResource(
    () => api.listMyFavorites(token),
    "favorites",
    token,
  );
  useDocumentTitle("Favourites — OpenUI");

  const items = React.useMemo(() => {
    const map = new Map<string, ResourceSummary>();
    for (const item of localFavorites.items) {
      map.set(item.slug, item);
    }
    if (remoteData?.items) {
      for (const item of remoteData.items) {
        if (!map.has(item.slug)) {
          map.set(item.slug, item);
        }
      }
    }
    return Array.from(map.values());
  }, [localFavorites.items, remoteData?.items]);

  return (
    <div className="space-y-5">
      <div className="border-b border-line pb-3">
        <p className="eyebrow text-[10px] text-graphite uppercase tracking-widest">Favourites</p>
        <h2 className="font-display text-2xl text-ink tracking-tight">Saved Resources</h2>
        <p className="mt-1 text-xs text-graphite max-w-[58ch]">
          Saved resources for quick access to components, blocks, and templates.
        </p>
      </div>

      <div>
        {isLoading && items.length === 0 ? (
          <Skeleton lines={6} />
        ) : items.length === 0 ? (
          <EmptyState
            eyebrow="Nothing saved"
            title="You have not saved any resources yet."
            description="Open any resource and use Save. Favourites are private — nobody else can see this list."
            action={
              <Button asChild>
                <Link to="/explore">Browse the catalogue</Link>
              </Button>
            }
          />
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <p className="eyebrow">{items.length} {items.length === 1 ? "resource" : "resources"} saved</p>
            </div>
            <ul className="divide-y divide-line">
              {items.map((resource) => {
                const adv = getAdvancedItemBySlug(resource.slug);
                const itemHref = adv
                  ? `/advanced/${adv.category}/${adv.slug}`
                  : `/${categorySegmentFor(resource.categorySlug ?? "components")}/${resource.slug}`;

                return (
                  <li
                    key={resource.id}
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-ink/[0.01]"
                  >
                    <Link
                      to={itemHref}
                      className="flex flex-1 flex-col gap-1 min-w-0"
                    >
                    <div className="flex items-center gap-2">
                      <span className="eyebrow text-[10px] text-graphite uppercase">{resource.resourceType}</span>
                      {resource.categorySlug ? (
                        <span className="text-[10px] font-mono text-graphite/60">• {resource.categorySlug}</span>
                      ) : null}
                    </div>
                    <span className="font-display text-step-1 tracking-tight text-ink group-hover:text-oxide transition-colors truncate">
                      {resource.title}
                    </span>
                    <span className="max-w-[68ch] text-[0.85rem] text-graphite line-clamp-2">
                      {resource.description}
                    </span>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (user?.id) {
                        removeFavorite(user.id, resource.slug, token);
                      }
                    }}
                    aria-label={`Remove ${resource.title} from favourites`}
                    title="Remove from favourites"
                    className="text-graphite hover:text-oxide hover:bg-oxide/10 shrink-0 h-9 w-9"
                  >
                    <Trash2 aria-hidden className="h-4 w-4" />
                  </Button>
                </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export function AccountCollectionsPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading, reload } = useApiResource(
    () => api.listCollections({ owner: "me", perPage: 48 }, token),
    "my-collections",
    token,
  );

  const [creating, setCreating] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = React.useState<string | null>(null);

  useDocumentTitle("Collections — OpenUI");

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await api.createCollection(
        { title, description: description || undefined, isPublic },
        token,
      );
      setDialogOpen(false);
      setTitle("");
      setDescription("");
      setIsPublic(false);
      reload();
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not create the collection.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <SectionHeader
        eyebrow="Collections"
        title="Your saved compositions."
        description="A collection is an ordered list of resources. Public collections appear in the catalogue; private ones are visible only to you."
        actions={
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            New collection
          </Button>
        }
      />

      <div className="mt-10">
        {isLoading ? (
          <Skeleton lines={6} />
        ) : error ? (
          <EmptyState
            eyebrow="Unavailable"
            title="Your collections could not be loaded."
            description={error.message}
          />
        ) : !data || data.items.length === 0 ? (
          <EmptyState
            eyebrow="Nothing saved"
            title="You have no collections yet."
            description="A collection is how you keep an arrangement: a hero, a heading, a background and the interactions that go with them."
            action={<Button onClick={() => setDialogOpen(true)}>Create your first collection</Button>}
          />
        ) : (
          <ul>
            {data.items.map((collection) => (
              <li
                key={collection.id}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-4"
              >
                <Link to={`/collections/${collection.id}`} className="flex flex-col">
                  <span className="font-display text-step-1 tracking-tight text-ink">
                    {collection.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                    {collection.itemCount} resources · updated {formatDate(collection.updatedAt)}
                  </span>
                </Link>
                <span className="flex items-center gap-2">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPendingDelete(collection.id)}
                    aria-label={`Delete ${collection.title}`}
                  >
                    <Trash2 aria-hidden className="h-3.5 w-3.5" />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>New collection</DialogTitle>
          <DialogDescription>
            Give it a name you will recognise later. You can add resources from any resource page.
          </DialogDescription>
          <form onSubmit={create} className="flex flex-col gap-4">
            <Input
              label="Title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Editorial Portfolio"
            />
            <Input
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What this arrangement is for."
              hint="Optional. Shown in the public catalogue when the collection is public."
            />
            <SegmentedControl
              label="Visibility"
              value={isPublic ? "public" : "private"}
              onValueChange={(value) => setIsPublic(value === "public")}
              options={[
                { value: "private", label: "Private" },
                { value: "public", label: "Public" },
              ]}
            />
            {formError ? (
              <p role="alert" className="text-[0.82rem] text-oxide">
                {formError}
              </p>
            ) : null}
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={creating}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={pendingDelete !== null} onOpenChange={() => setPendingDelete(null)}>
        <DialogContent>
          <DialogTitle>Delete this collection?</DialogTitle>
          <DialogDescription>
            The collection is removed. The resources in it are not — they belong to the registry and
            were never yours to delete.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Keep it
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                const id = pendingDelete;
                setPendingDelete(null);
                if (id) void api.deleteCollection(id, token).then(reload);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AccountSubmissionsPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading } = useApiResource(
    () => api.listMySubmissions(token),
    "my-submissions",
    token,
  );
  useDocumentTitle("Submissions — OpenUI");

  return (
    <>
      <SectionHeader
        eyebrow="Submissions"
        title="Resources you have proposed."
        description="A submission is a proposal, not a publication. It stays pending until a moderator reviews it, and only an administrator can approve — which is what stops a contribution from becoming production state on its own."
        actions={
          <Button size="sm" asChild>
            <Link to="/submit">Submit a resource</Link>
          </Button>
        }
      />

      <div className="mt-10">
        {isLoading ? (
          <Skeleton lines={5} />
        ) : error ? (
          <EmptyState
            eyebrow="Unavailable"
            title="Your submissions could not be loaded."
            description={error.message}
          />
        ) : !data || data.items.length === 0 ? (
          <EmptyState
            eyebrow="No submissions"
            title="You have not submitted anything yet."
            description="Read the contributing guide first: it explains the directory layout, the design.md and what validation will check."
            action={
              <Button asChild>
                <Link to="/docs/contributing">Read the contributing guide</Link>
              </Button>
            }
          />
        ) : (
          <ul>
            {data.items.map((submission) => (
              <li
                key={submission.id}
                className="flex flex-wrap items-start justify-between gap-4 border-b border-line py-4"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-display text-step-1 tracking-tight text-ink">
                    {submission.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                    {submission.slug} · submitted {formatDate(submission.created_at)}
                  </span>
                </span>
                <StatusPill tone={SUBMISSION_STATUS_TONE[submission.status] ?? "neutral"}>
                  {submission.status.replace("_", " ")}
                </StatusPill>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Section label="What the statuses mean" className="mt-12">
        <ul className="flex flex-col">
          {([
            ["pending", "Received. Waiting for a moderator to pick it up."],
            ["reviewing", "A moderator is looking at it, usually alongside CI."],
            ["changes_requested", "Something needs to change before it can be approved."],
            ["approved", "An administrator approved it; it is published and immutable."],
            ["rejected", "It will not be published. The review notes say why."],
          ] as const).map(([status, meaning]) => (
            <li key={status} className="flex flex-wrap items-baseline gap-4 border-b border-line py-3">
              <span className="w-[10rem] shrink-0">
                <StatusPill tone={SUBMISSION_STATUS_TONE[status] ?? "neutral"}>
                  {status.replace("_", " ")}
                </StatusPill>
              </span>
              <span className="flex-1 text-[0.85rem] leading-relaxed text-graphite">{meaning}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

export { Badge, Github, ResourceTile };
