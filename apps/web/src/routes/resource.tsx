import { Heart, Laptop, Monitor, PackageSearch, Smartphone, Tablet } from "lucide-react";
import * as React from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router";
import { getAdvancedItemBySlug } from "../advanced/index.js";

import {
  Badge,
  Button,
  CopyButton,
  EmptyState,
  SegmentedControl,
  Skeleton,
  StatusPill,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@openui/ui";

import { CodeBlock, CommandLine } from "../components/CodeBlock.js";
import { MetaRow } from "../components/SectionHeader.js";
import { ResourceTile, categorySegmentFor } from "../components/ResourceTile.js";
import { SandboxSkeleton } from "../features/playground/Sandbox.js";
import { useIndexEntry, useRegistryItem, useRelatedItems } from "../features/resources/use-catalogue.js";
import { openSignInDialog, useAuth } from "../lib/auth.js";
import * as api from "../lib/api.js";
import { isResourceFavorited, toggleStoredFavorite } from "../lib/favorites.js";
import { useDocumentTitle, useMetaDescription } from "../hooks/use-document-title.js";
import { cn } from "@openui/utils";

/**
 * The sandbox is split out of the main bundle.
 *
 * It carries a bundler (esbuild-wasm) and an editor, which is most of the
 * JavaScript on this site. A visitor who reads the metadata and the install
 * command never downloads it; only opening the preview does.
 */
const Sandbox = React.lazy(() =>
  import("../features/playground/Sandbox.js").then((module) => ({ default: module.Sandbox })),
);

/**
 * The resource page.
 *
 * Seven things in a fixed order, because a developer reads them in a fixed
 * order: what it is, what it looks like, how to install it, what the source is,
 * what it pulls in, what it fingerprints, and what its licence is.
 *
 * Two decisions worth stating:
 *
 *  - **Installation comes before the source.** The primary action is the CLI
 *    command; the source is available but is not the first thing offered, since
 *    copying it by hand is the thing the CLI exists to replace.
 *  - **The preview runs in the isolation sandbox** (see `features/playground`),
 *    not in this document. The `Sandbox` component is loaded lazily, so reading
 *    a page without opening the preview costs nothing.
 */
export default function ResourcePage(): React.JSX.Element {
  const params = useParams<{ category: string; slug: string }>();
  const slug = params.slug ?? "";
  const [searchParams, setSearchParams] = useSearchParams();

  const advItem = slug ? getAdvancedItemBySlug(slug) : undefined;

  const { entry, state: indexState } = useIndexEntry(slug);
  const itemState = useRegistryItem(slug);
  const related = useRelatedItems(entry);

  const { token, user } = useAuth();
  const [favorited, setFavorited] = React.useState(() =>
    isResourceFavorited(user?.id, entry?.name || slug),
  );
  const [favoriteError, setFavoriteError] = React.useState<string | null>(null);
  const [favoritePending, setFavoritePending] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);

  // Synchronize favorited state whenever user or entry/slug changes
  React.useEffect(() => {
    if (user?.id && (entry?.name || slug)) {
      setFavorited(isResourceFavorited(user.id, entry?.name || slug));
    } else {
      setFavorited(false);
    }
  }, [user?.id, entry?.name, slug]);

  // Listen to cross-window / cross-component favorite events
  React.useEffect(() => {
    const onFavChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && (detail.slug === slug || (entry?.name && detail.slug === entry.name))) {
        setFavorited(Boolean(detail.favorited));
      }
    };
    window.addEventListener("openui:favorites_changed", onFavChange);
    return () => window.removeEventListener("openui:favorites_changed", onFavChange);
  }, [slug, entry?.name]);

  const activeTab = searchParams.get("tab") ?? "preview";

  // Auto-detect mobile screen so resources default to mobile view on phones
  const isMobileClient =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const viewport = searchParams.get("viewport") ?? (isMobileClient ? "mobile" : "desktop");

  const VIEWPORT_WIDTHS: Record<string, string> = {
    mobile: "min(390px, 100%)",
    tablet: "min(834px, 100%)",
    desktop: "100%",
    full: "100%",
  };
  const VIEWPORT_MAX: Record<string, string> = {
    mobile: "min(390px, 100%)",
    tablet: "min(834px, 100%)",
    desktop: "100%",
    full: "100%",
  };

  useDocumentTitle(entry ? `${entry.title} — UniqueFingerprint Design Registry` : "Resource — UniqueFingerprint");
  useMetaDescription(entry?.description);

  // Record the download once, when the page is opened, so the counter measures
  // interest in the resource rather than clicks on a particular button.
  React.useEffect(() => {
    if (!entry || downloaded) return;
    setDownloaded(true);
    void api.recordDownload(entry.name, token).catch(() => {
      // A counter is not worth showing an error for.
    });
  }, [entry, token, downloaded]);

  const toggleFavorite = async () => {
    if (!user) {
      openSignInDialog();
      setFavoriteError("Sign in to save this resource to your favourites.");
      return;
    }
    if (!entry) return;

    setFavoritePending(true);
    setFavoriteError(null);
    try {
      const nextFavorited = toggleStoredFavorite(
        user.id,
        {
          name: entry.name,
          title: entry.title,
          description: entry.description,
          category: entry.category,
          type: entry.type,
        },
        token,
      );
      setFavorited(nextFavorited);
    } catch (cause) {
      setFavoriteError(cause instanceof Error ? cause.message : "Could not update your favourites.");
    } finally {
      setFavoritePending(false);
    }
  };

  const setTab = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "preview") next.delete("tab");
    else next.set("tab", value);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  if (indexState.isLoading) {
    return (
      <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <Skeleton lines={10} />
        <Skeleton lines={8} />
      </div>
    );
  }

  if (indexState.error) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Unavailable"
          title="The registry index could not be loaded."
          description={indexState.error.message}
        />
      </div>
    );
  }

  if (!entry) {
    if (advItem) {
      return <Navigate to={`/advanced/${advItem.category}/${advItem.slug}`} replace />;
    }

    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="404 — Not in the registry"
          title={`No resource named “${slug}”.`}
          description="The registry index lists everything currently published. The slug may have changed, or the item may have been deprecated."
          action={
            <Button asChild>
              <Link to="/explore">Browse the catalogue</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <article className="pb-16">
      {/* ------------------------------------------------------------ */}
      {/* Header                                                        */}
      {/* ------------------------------------------------------------ */}
      <header className="shell pt-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/explore" className="eyebrow transition-colors hover:text-ink">
            Registry
          </Link>
          <span aria-hidden className="text-graphite/50">
            /
          </span>
          <Link
            to={`/${categorySegmentFor(entry.category)}`}
            className="eyebrow transition-colors hover:text-ink"
          >
            {entry.category}
          </Link>
          <span aria-hidden className="text-graphite/50">
            /
          </span>
          <span className="eyebrow text-ink">{entry.name}</span>
        </nav>

        <div className="mt-5 sm:mt-8 grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <h1 className="optically-align text-3xl sm:text-5xl lg:text-step-5 max-w-[20ch] text-balance leading-[1.08]">{entry.title}</h1>
            <p className="prose-measure mt-4 sm:mt-6 text-[0.92rem] sm:text-step-1 leading-relaxed text-graphite">
              {entry.description}
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Badge tone="ink">{entry.type.replace("registry:", "")}</Badge>
              {entry.difficulty ? <Badge>{entry.difficulty}</Badge> : null}
              {entry.license ? <Badge tone="moss">{entry.license}</Badge> : null}
              <StatusPill tone="positive" bare>
                published
              </StatusPill>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2">
              <Button
                variant={favorited ? "primary" : "outline"}
                onClick={() => void toggleFavorite()}
                loading={favoritePending}
                aria-pressed={favorited}
                className={cn(
                  "gap-1.5 transition-all duration-200",
                  favorited && "bg-oxide border-oxide text-paper hover:bg-oxide/90",
                )}
              >
                <Heart
                  aria-hidden
                  className={cn(
                    "h-3.5 w-3.5 transition-all duration-200",
                    favorited && "fill-current scale-110",
                  )}
                />
                <span>{favorited ? "Saved" : "Save"}</span>
              </Button>

              <TooltipProvider delayDuration={400}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" asChild>
                      <Link to={`/playground?item=${entry.name}`}>
                        <PackageSearch aria-hidden className="h-3.5 w-3.5" />
                        Open in playground
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    View and interact with the live demo in the sandbox
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {favoriteError ? (
              <p role="alert" className="mt-3 text-[0.8rem] text-oxide">
                {favoriteError}
              </p>
            ) : null}
            {user && favorited && !favoriteError ? (
              <p className="mt-3 text-[0.8rem] text-moss flex items-center gap-1.5 font-mono">
                ✓ Saved to your{" "}
                <Link to="/account/favorites" className="underline underline-offset-2 hover:text-ink font-medium">
                  favourites
                </Link>
                .
              </p>
            ) : null}
            {!user ? (
              <p className="mt-3 text-[0.8rem] text-graphite">
                Saving requires an account. Installing never does.
              </p>
            ) : null}
          </div>

          {/* Metadata rail */}
          <aside>
            <div className="border-t border-line pt-4">
              <p className="eyebrow mb-2">Metadata</p>
              <dl>
                <MetaRow label="Registry name">
                  <span className="font-mono">{entry.namespace}/{entry.name}</span>
                </MetaRow>
                <MetaRow label="Type">
                  <span className="font-mono">{entry.type}</span>
                </MetaRow>
                <MetaRow label="Category">
                  <span className="capitalize">{entry.category}</span>
                </MetaRow>
                <MetaRow label="Licence">{entry.license ?? "MIT"}</MetaRow>
              </dl>
            </div>
          </aside>
        </div>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Tabs                                                          */}
      {/* ------------------------------------------------------------ */}
      <div className="shell mt-8 sm:mt-16">
        <Tabs value={activeTab} onValueChange={setTab}>
          <TabsList className="overflow-x-auto no-scrollbar">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          {/* Preview -------------------------------------------------- */}
          <TabsContent value="preview">
            <div className="mb-4 sm:mb-6">
              <p className="prose-measure text-[0.9rem] text-graphite">
                The resource runs in an isolated document. Nothing it does can reach this page, your
                session or your files.
              </p>
            </div>

            {/* Viewport tester: the preview container width is constrained so
                the resource's responsive behaviour is exercisable, not just
                claimed. The choice lives in the URL like every other control. */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <SegmentedControl
                label="Viewport"
                hideLabel
                value={viewport}
                onValueChange={(value) => {
                  const next = new URLSearchParams(searchParams);
                  if (value === "desktop") next.delete("viewport");
                  else next.set("viewport", value);
                  setSearchParams(next, { replace: true, preventScrollReset: true });
                }}
                options={[
                  {
                    value: "mobile",
                    label: "Mobile",
                    icon: <Smartphone aria-hidden className="h-3.5 w-3.5" />,
                  },
                  {
                    value: "tablet",
                    label: "Tablet",
                    icon: <Tablet aria-hidden className="h-3.5 w-3.5" />,
                  },
                  {
                    value: "desktop",
                    label: "Desktop",
                    icon: <Laptop aria-hidden className="h-3.5 w-3.5" />,
                  },
                ]}
              />
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite hidden sm:inline">
                  Target viewport:
                </span>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-line/25 bg-surface/60 text-ink shadow-2xs">
                  {VIEWPORT_MAX[viewport] ?? "100%"}
                </span>
              </div>
            </div>

            <div
              className="mx-auto transition-[max-width] duration-normal motion-reduce:transition-none"
              style={{ maxWidth: VIEWPORT_MAX[viewport] ?? "100%" }}
            >

            <React.Suspense fallback={<SandboxSkeleton />}>
              {itemState.data ? (
                <Sandbox item={itemState.data} view="preview" />
              ) : itemState.error ? (
                <EmptyState
                  eyebrow="Preview unavailable"
                  title="The built artifact could not be loaded."
                  description={itemState.error.message}
                />
              ) : (
                <SandboxSkeleton />
              )}
            </React.Suspense>
            </div>
          </TabsContent>

          {/* Installation --------------------------------------------- */}
          <TabsContent value="install">
            <div className="max-w-2xl">
              <h2 className="font-display text-step-3 tracking-tight">Install with the CLI</h2>
              <p className="prose-measure mt-4 text-[0.92rem] leading-relaxed text-graphite">
                The CLI resolves this item and its registry dependencies, verifies the integrity
                digest, checks your project for conflicts, and only then writes. It never
                overwrites a file you have edited without telling you.
              </p>

              <div className="mt-6">
                <CommandLine command={`pnpm dlx uniquefingerprint add ${entry.name}`} />
              </div>

              <h3 className="mt-10 font-display text-step-2 tracking-tight">
                Or install manually
              </h3>
              <p className="prose-measure mt-3 text-[0.9rem] leading-relaxed text-graphite">
                Copy the source from the Code tab into your project. The source imports{" "}
                <code className="font-mono">@/lib/cn</code>; the CLI rewrites that alias to match your
                project's configuration.
              </p>
            </div>
          </TabsContent>

          {/* Code ------------------------------------------------------ */}
          <TabsContent value="code">
            {itemState.data ? (
              <div className="flex flex-col gap-6">
                {itemState.data.files
                  .filter((file) => !file.path.endsWith("registry.json"))
                  .sort((a, b) => {
                    if (a.path.includes("demo") && !b.path.includes("demo")) return 1;
                    if (!a.path.includes("demo") && b.path.includes("demo")) return -1;
                    return 0;
                  })
                  .map((file) => (
                    <CodeBlock
                      key={file.path}
                      caption={file.path}
                      language={languageFor(file.path)}
                      code={file.content}
                      showLineNumbers
                      maxLines={40}
                    />
                  ))}
                {!itemState.data.files.some((file) => file.path.endsWith("cn.ts")) && (
                  <CodeBlock
                    caption="lib/cn.ts"
                    language="tsx"
                    code={CN_HELPER_CODE}
                    showLineNumbers
                    maxLines={40}
                  />
                )}
              </div>
            ) : (
              <Skeleton lines={12} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Related                                                       */}
      {/* ------------------------------------------------------------ */}
      {related.length > 0 ? (
        <section className="shell mt-24">
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
            <p className="eyebrow">Composes with</p>
            <p className="eyebrow">Shared tags and category</p>
          </div>
          <div className="catalogue-grid mt-8">
            {related.map((candidate, position) => (
              <ResourceTile key={candidate.name} item={candidate} index={position + 1} withPreview />
            ))}
          </div>
        </section>
      ) : null}

      {/* Report / licence footer */}
      <div className="shell mt-8 -mb-10 sm:-mb-20">
        <div className="flex items-center justify-end">
          <p className="eyebrow text-[10px] text-graphite/70">
            Licence {entry.license ?? "not declared"} · verify before redistribution
          </p>
        </div>
      </div>
    </article>
  );
}

function languageFor(path: string): string {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "tsx";
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".md")) return "markdown";
  return "text";
}

const CN_HELPER_CODE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;

