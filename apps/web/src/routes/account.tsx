import {
  Github,
  Lock,
  Globe,
  Trash2,
  Heart,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  LogOut,
  ShieldCheck,
  Database,
} from "lucide-react";
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

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const first = parts[0];
    const second = parts[1];
    if (first && second) {
      return ((first[0] ?? "") + (second[0] ?? "")).toUpperCase();
    }
    if (first && first.length >= 2) {
      return first.slice(0, 2).toUpperCase();
    }
    if (first && first.length === 1) {
      return first.toUpperCase();
    }
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "UI";
}

export function ProfilePage(): React.JSX.Element {
  const { user, token, signOut } = useAuth();
  useDocumentTitle("Profile — OpenUI");

  const [savedData, setSavedData] = React.useState(() => getFavoritesAsPaginated(user?.id));
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);

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

  const handleCopyEmail = () => {
    if (user?.email) {
      void navigator.clipboard.writeText(user.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyId = () => {
    if (user?.id) {
      void navigator.clipboard.writeText(user.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 1. Main Profile Card (Centered, Glassmorphic & Modern) */}
      <div className="relative overflow-hidden rounded-2xl border border-line/60 bg-paper/70 backdrop-blur-xl p-6 sm:p-8 shadow-xs text-center flex flex-col items-center">
        {/* Subtle ambient background glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-28 bg-oxide/10 rounded-full blur-3xl pointer-events-none" />

        {/* Avatar with gradient border & live session dot */}
        <div className="relative mb-3.5">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full p-[2px] bg-gradient-to-tr from-oxide via-ink/20 to-moss/50 shadow-md">
            <div className="w-full h-full rounded-full bg-surface/90 flex items-center justify-center overflow-hidden border border-line/40">
              {user?.photoUrl && !imageFailed ? (
                <img
                  src={user.photoUrl}
                  alt={displayName}
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-ink select-none">
                  {getInitials(displayName, user?.email)}
                </span>
              )}
            </div>
          </div>
          {/* Active live session indicator */}
          <div
            className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-paper flex items-center justify-center shadow-xs border border-line/40"
            title="Active Session"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-moss" />
            </span>
          </div>
        </div>

        {/* User Display Name */}
        <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
          {displayName}
        </h2>

        {/* Email Pill with Click to Copy */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/80 border border-line/50 shadow-2xs">
          <Mail className="h-3.5 w-3.5 text-graphite" />
          <span className="font-mono text-xs text-graphite break-all">{user?.email ?? "no-email"}</span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="ml-1 text-graphite hover:text-ink transition-colors p-0.5"
            title="Copy email"
            aria-label="Copy email address"
          >
            {copiedEmail ? (
              <Check className="h-3 w-3 text-moss" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>

        {/* Badges / Pill Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-line/20 text-ink border border-line/60">
            <ShieldCheck className="h-3 w-3 text-moss" />
            {user?.role ?? "user"}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-graphite bg-surface border border-line/40">
            <Lock className="h-3 w-3 text-oxide" />
            OAuth 2.0 Verified
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-graphite bg-surface border border-line/40">
            <Database className="h-3 w-3 text-azure" />
            Cloud Synced
          </span>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-5 border-t border-line/40 w-full flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyId}
            className="font-mono text-xs flex items-center gap-1.5"
          >
            {copiedId ? (
              <>
                <Check className="h-3.5 w-3.5 text-moss" />
                <span>Copied ID</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy User ID</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => void handleSignOut()}
            className="font-mono text-xs text-graphite hover:text-oxide hover:bg-oxide/10 flex items-center gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </Button>
        </div>
      </div>

      {/* 2. Detailed Account Credentials Card */}
      <div className="rounded-2xl border border-line/60 bg-paper/60 backdrop-blur-md p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4">
          <div>
            <h3 className="font-display text-base text-ink tracking-tight">Security & Credentials</h3>
            <p className="text-xs text-graphite">Verified session credentials and database access permissions.</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-moss/10 border border-moss/20 text-moss text-[10px] font-mono font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-moss animate-pulse" />
            <span>Encrypted</span>
          </div>
        </div>

        <dl className="divide-y divide-line/40 text-xs sm:text-sm">
          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <dt className="text-graphite font-medium">Full Name</dt>
            <dd className="font-medium text-ink">{displayName}</dd>
          </div>

          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <dt className="text-graphite font-medium">Verified Email</dt>
            <dd className="font-mono text-ink text-xs sm:text-sm">{user?.email ?? "Unknown"}</dd>
          </div>

          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <dt className="text-graphite font-medium">Unique User ID</dt>
            <dd className="font-mono text-graphite text-xs break-all flex items-center gap-1.5">
              <span>{user?.id ? `${user.id.slice(0, 16)}...` : "—"}</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="text-graphite hover:text-ink transition-colors p-0.5"
                title="Copy full ID"
              >
                {copiedId ? <Check className="h-3 w-3 text-moss" /> : <Copy className="h-3 w-3" />}
              </button>
            </dd>
          </div>

          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <dt className="text-graphite font-medium">Authentication Provider</dt>
            <dd className="font-mono text-ink text-xs uppercase tracking-wide">Firebase / OAuth 2.0</dd>
          </div>

          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <dt className="text-graphite font-medium">Database Authorization</dt>
            <dd className="font-mono text-ink text-xs">Row-Level Security (RLS) Enforced</dd>
          </div>
        </dl>
      </div>

      {/* 4. Saved Resources Section */}
      <div className="rounded-2xl border border-line/60 bg-paper/60 backdrop-blur-md p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-oxide fill-oxide/20" />
            <h3 className="font-display text-base sm:text-lg text-ink">Saved Resources</h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-line/20 border border-line text-graphite font-medium">
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
          <div className="py-8 px-4 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-line/10 border border-line/40 flex items-center justify-center mb-3">
              <Heart className="h-5 w-5 text-graphite/60" />
            </div>
            <p className="text-sm font-medium text-ink">Your saved library is empty</p>
            <p className="text-xs text-graphite max-w-sm mt-1 leading-relaxed">
              Save buttons on any component, text effect, or motion pattern add items directly to your personal library.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" variant="outline" asChild className="text-xs font-mono">
                <Link to="/explore">Explore Components</Link>
              </Button>
              <Button size="sm" variant="ghost" asChild className="text-xs font-mono text-graphite hover:text-ink">
                <Link to="/advanced/text-animations">Text Effects</Link>
              </Button>
              <Button size="sm" variant="ghost" asChild className="text-xs font-mono text-graphite hover:text-ink">
                <Link to="/advanced">Advanced</Link>
              </Button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line/40">
            {savedItems.slice(0, 5).map((resource) => {
              const adv = getAdvancedItemBySlug(resource.slug);
              const itemHref = adv
                ? `/advanced/${adv.category}/${adv.slug}`
                : `/${categorySegmentFor(resource.categorySlug ?? "components")}/${resource.slug}`;

              return (
                <li
                  key={resource.id}
                  className="flex items-center justify-between gap-3 py-3 hover:bg-line/10 rounded-lg px-2.5 transition-colors group"
                >
                  <Link to={itemHref} className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="font-medium text-sm text-ink group-hover:text-oxide transition-colors truncate">
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
    <div className="w-full max-w-2xl mx-auto space-y-6">
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
