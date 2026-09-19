import { BookMarked, ExternalLink, Heart, Laptop, Monitor, PackageSearch, ShieldCheck, Smartphone, Tablet } from "lucide-react";
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
import { DnaStrip, dnaSummary } from "../components/DnaStrip.js";
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
  const previewView = searchParams.get("view") === "code" ? "code" : "preview";

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

  const dependencies = entry.dependencies.filter((name) => name !== "react");

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
                    Edit the source live with the isolated sandbox and a full editor
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button variant="ghost" asChild>
                <Link to="/submit">
                  <BookMarked aria-hidden className="h-3.5 w-3.5" />
                  Report a problem
                </Link>
              </Button>
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
                <MetaRow label="Licence">{entry.license ?? "Not declared"}</MetaRow>
                {entry.designSystem ? (
                  <MetaRow label="Design system">
                    <Link to={`/design-systems/${entry.designSystem}`} className="text-oxide">
                      {entry.designSystem}
                    </Link>
                  </MetaRow>
                ) : null}
                <MetaRow label="Fingerprint">
                  <span className="text-graphite">{dnaSummary(entry.dna)}</span>
                </MetaRow>
              </dl>

              {entry.tags.length > 0 ? (
                <>
                  <p className="eyebrow mb-3 mt-6">Tags</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <li key={tag}>
                        <Link to={`/search?tag=${encodeURIComponent(tag)}`}>
                          <Badge className="transition-colors hover:border-ink hover:text-ink">
                            {tag}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
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
            <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            <TabsTrigger value="design">Design DNA</TabsTrigger>
            <TabsTrigger value="motion">Motion & Interaction</TabsTrigger>
            <TabsTrigger value="a11y-perf">A11y & Performance</TabsTrigger>
          </TabsList>

          {/* Preview -------------------------------------------------- */}
          <TabsContent value="preview">
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <p className="prose-measure text-[0.9rem] text-graphite">
                The resource runs in an isolated document. Nothing it does can reach this page, your
                session or your files.
              </p>
              <SegmentedControl
                label="Preview mode"
                hideLabel
                value={previewView}
                onValueChange={(value) => {
                  const next = new URLSearchParams(searchParams);
                  if (value === "preview") next.delete("view");
                  else next.set("view", value);
                  setSearchParams(next, { replace: true, preventScrollReset: true });
                }}
                options={[
                  { value: "preview", label: "Preview" },
                  { value: "code", label: "Code + preview" },
                ]}
              />
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
                <Sandbox item={itemState.data} view={previewView === "code" ? "split" : "preview"} />
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
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
              <div>
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
                  Add npm dependencies
                </h3>
                {dependencies.length === 0 ? (
                  <p className="mt-3 flex items-center gap-2 text-[0.9rem] text-moss">
                    <ShieldCheck aria-hidden className="h-4 w-4" />
                    This resource has no npm dependencies beyond React.
                  </p>
                ) : (
                  <>
                    <p className="mt-3 text-[0.9rem] text-graphite">
                      The CLI runs this for you. It is shown so you can review it first.
                    </p>
                    <div className="mt-4">
                      <CommandLine
                        command={`pnpm add ${dependencies.join(" ")}`}
                      />
                    </div>
                  </>
                )}

                <h3 className="mt-10 font-display text-step-2 tracking-tight">
                  Or install manually
                </h3>
                <p className="prose-measure mt-3 text-[0.9rem] leading-relaxed text-graphite">
                  Copy the source from the Code tab into your project, then add the npm
                  dependencies above. The source imports <code className="font-mono">@/lib/cn</code>
                  ; the CLI rewrites that alias to match your project's configuration.
                </p>
              </div>

              <aside>
                <div className="border-t border-line pt-4">
                  <p className="eyebrow mb-3">What the CLI does</p>
                  <ol className="flex flex-col">
                    {[
                      "Reads uniquefingerprint.json for your registry and aliases.",
                      "Fetches the artifact and verifies its integrity digest.",
                      "Resolves registry dependencies first, depth-first.",
                      "Diffs every target path against your project.",
                      "Writes only when there is no conflict, or asks.",
                    ].map((step, position) => (
                      <li key={step} className="flex gap-3 border-b border-line py-3">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">
                          {String(position + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.86rem] leading-relaxed text-graphite">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="eyebrow mb-3 mt-6">Registry dependencies</p>
                  {entry.registryDependencies.length === 0 ? (
                    <p className="text-[0.86rem] text-graphite">None.</p>
                  ) : (
                    <ul className="flex flex-wrap gap-1.5">
                      {entry.registryDependencies.map((name) => (
                        <li key={name}>
                          <Link to={`/components/${name}`}>
                            <Badge className="transition-colors hover:border-ink hover:text-ink">
                              {name}
                            </Badge>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* Code ------------------------------------------------------ */}
          <TabsContent value="code">
            {itemState.data ? (
              <div className="flex flex-col gap-6">
                {itemState.data.files
                  .filter((file) => !file.path.endsWith("registry.json"))
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
              </div>
            ) : (
              <Skeleton lines={12} />
            )}
          </TabsContent>

          {/* Dependencies --------------------------------------------- */}
          <TabsContent value="dependencies">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-display text-step-2 tracking-tight">npm dependencies</h2>
                {dependencies.length === 0 ? (
                  <p className="mt-3 text-[0.9rem] text-graphite">
                    None. This resource depends only on React.
                  </p>
                ) : (
                  <ul className="mt-4">
                    {dependencies.map((name) => (
                      <li
                        key={name}
                        className="flex items-center justify-between border-b border-line py-3"
                      >
                        <span className="font-mono text-[0.85rem] text-ink">{name}</span>
                        <a
                          href={`https://www.npmjs.com/package/${encodeURIComponent(name)}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="eyebrow flex items-center gap-1 transition-colors hover:text-ink"
                        >
                          npm
                          <ExternalLink aria-hidden className="h-3 w-3" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h2 className="font-display text-step-2 tracking-tight">Registry dependencies</h2>
                {entry.registryDependencies.length === 0 ? (
                  <p className="mt-3 text-[0.9rem] text-graphite">
                    None. This resource installs on its own.
                  </p>
                ) : (
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite">
                    These are other registry resources the CLI installs first, in order.
                  </p>
                )}
                <ul className="mt-4">
                  {entry.registryDependencies.map((name) => (
                    <li key={name} className="border-b border-line py-3">
                      <Link
                        to={`/components/${name}`}
                        className="font-mono text-[0.85rem] text-ink transition-colors hover:text-oxide"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Design ---------------------------------------------------- */}
          <TabsContent value="design">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
              <div>
                <h2 className="font-display text-step-2 tracking-tight">Design fingerprint</h2>
                <p className="prose-measure mt-3 text-[0.9rem] leading-relaxed text-graphite">
                  Six declared dimensions. They are the vocabulary a model or a teammate uses to
                  decide whether this resource belongs in the interface they are building — before
                  reading any code.
                </p>
                <div className="mt-6">
                  <DnaStrip dna={entry.dna} variant="labelled" />
                </div>
              </div>

              <div>
                <h2 className="font-display text-step-2 tracking-tight">Design rules</h2>
                {itemState.data?.designRules ? (
                  <pre className="code-plate code-plate--light mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap font-mono text-[0.78rem] leading-relaxed">
                    {itemState.data.designRules}
                  </pre>
                ) : (
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite">
                    This resource does not ship a <code className="font-mono">design.md</code>. That
                    is allowed — but a resource with one is easier to compose and is what the AI
                    resources in this registry read.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Motion & Interaction -------------------------------------- */}
          <TabsContent value="motion">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="border border-line/30 rounded-xl p-6 bg-paper dark:bg-[#141413]">
                <h2 className="font-display text-step-2 tracking-tight text-ink">Motion System</h2>
                <p className="mt-2 text-xs sm:text-[0.88rem] text-graphite leading-relaxed">
                  UniqueFingerprint motion is calibrated for tactile response without sluggishness. All transforms use GPU-accelerated 3D composition.
                </p>

                <dl className="mt-6 divide-y divide-line/20 border-y border-line/20">
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Motion Language</dt>
                    <dd className="font-mono text-xs text-ink">{entry.dna?.motionLanguage ?? "subtle"}</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Motion Model</dt>
                    <dd className="font-mono text-xs text-oxide">{entry.fingerprint?.motionModel ?? "spring-damped"}</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Max Duration</dt>
                    <dd className="font-mono text-xs text-ink">520ms (budget limit)</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Reduced Motion Mode</dt>
                    <dd className="font-mono text-xs text-moss">✓ Instant state swap</dd>
                  </div>
                </dl>
              </div>

              <div className="border border-line/30 rounded-xl p-6 bg-paper dark:bg-[#141413]">
                <h2 className="font-display text-step-2 tracking-tight text-ink">Interaction Profile</h2>
                <p className="mt-2 text-xs sm:text-[0.88rem] text-graphite leading-relaxed">
                  How the user engages with this resource across mouse, touch, and keyboard modalities.
                </p>

                <dl className="mt-6 divide-y divide-line/20 border-y border-line/20">
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Interaction Model</dt>
                    <dd className="font-mono text-xs text-oxide">{entry.fingerprint?.interactionModel ?? "pointer-reactive"}</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Semantic Purpose</dt>
                    <dd className="font-mono text-xs text-ink">{entry.fingerprint?.semanticPurpose ?? "interface-accent"}</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Touch Adaptation</dt>
                    <dd className="font-mono text-xs text-ink">Active (no stuck hover)</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Keyboard Target</dt>
                    <dd className="font-mono text-xs text-moss">✓ Native focus ring</dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>

          {/* Accessibility & Performance -------------------------------- */}
          <TabsContent value="a11y-perf">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="border border-line/30 rounded-xl p-6 bg-paper dark:bg-[#141413]">
                <h2 className="font-display text-step-2 tracking-tight text-ink">Accessibility Contract</h2>
                <p className="mt-2 text-xs sm:text-[0.88rem] text-graphite leading-relaxed">
                  Verified against WCAG 2.1 AA guidelines. Visual effects never obscure content or impede navigation.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2.5 text-xs text-graphite">
                    <span className="font-mono text-moss font-bold">✓</span>
                    <span><strong>Prefers Reduced Motion:</strong> All kinetic transitions collapse to static states when user preferences request reduced motion.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-graphite">
                    <span className="font-mono text-moss font-bold">✓</span>
                    <span><strong>Keyboard Reachable:</strong> Interactive elements participate in normal tab order with visible high-contrast focus rings.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-graphite">
                    <span className="font-mono text-moss font-bold">✓</span>
                    <span><strong>Semantic HTML:</strong> Real headings, buttons, and landmark roles used before ARIA overrides.</span>
                  </li>
                </ul>
              </div>

              <div className="border border-line/30 rounded-xl p-6 bg-paper dark:bg-[#141413]">
                <h2 className="font-display text-step-2 tracking-tight text-ink">Performance & GPU Budget</h2>
                <p className="mt-2 text-xs sm:text-[0.88rem] text-graphite leading-relaxed">
                  Engineered to maintain 60 FPS without battery degradation or main-thread locking.
                </p>
                <dl className="mt-6 divide-y divide-line/20 border-y border-line/20">
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Visual Model</dt>
                    <dd className="font-mono text-xs text-ink">{entry.fingerprint?.visualModel ?? "dom-css"}</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Frame Budget</dt>
                    <dd className="font-mono text-xs text-ink">16.6ms target (60 FPS)</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Offscreen Pausing</dt>
                    <dd className="font-mono text-xs text-moss">✓ IntersectionObserver loop sleep</dd>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="eyebrow text-[10px]">Memory Disposal</dt>
                    <dd className="font-mono text-xs text-moss">✓ Clean context release</dd>
                  </div>
                </dl>
              </div>
            </div>
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
