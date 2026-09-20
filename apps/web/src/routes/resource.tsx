import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Heart,
  Laptop,
  Monitor,
  PackageSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Terminal,
  Zap,
} from "lucide-react";
import * as React from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router";
import { getAdvancedItemBySlug } from "../advanced/index.js";

import {
  Button,
  CopyButton,
  EmptyState,
  SegmentedControl,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@openui/ui";

import { CodeBlock } from "../components/CodeBlock.js";
import { MetaRow } from "../components/SectionHeader.js";
import { ResourceTile } from "../components/ResourceTile.js";
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
interface InstallationSectionProps {
  entryName: string;
  onViewCode: () => void;
}

function InstallationSection({ entryName, onViewCode }: InstallationSectionProps): React.JSX.Element {
  const [pkgManager, setPkgManager] = React.useState<"pnpm" | "npm" | "bun" | "yarn">("pnpm");
  const [copied, setCopied] = React.useState(false);
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const getCommand = (pm: "pnpm" | "npm" | "bun" | "yarn") => {
    switch (pm) {
      case "pnpm":
        return `pnpm dlx uniquefingerprint add ${entryName}`;
      case "npm":
        return `npx uniquefingerprint add ${entryName}`;
      case "bun":
        return `bunx --bun uniquefingerprint add ${entryName}`;
      case "yarn":
        return `yarn dlx uniquefingerprint add ${entryName}`;
    }
  };

  const getPeerCommand = (pm: "pnpm" | "npm" | "bun" | "yarn") => {
    switch (pm) {
      case "pnpm":
        return `pnpm add clsx tailwind-merge`;
      case "npm":
        return `npm i clsx tailwind-merge`;
      case "bun":
        return `bun add clsx tailwind-merge`;
      case "yarn":
        return `yarn add clsx tailwind-merge`;
    }
  };

  const currentCommand = getCommand(pkgManager);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentCommand);
      }
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-8 py-8 sm:py-12">
      {/* CLI Installation Card */}
      <div className="rounded-2xl border border-line/40 bg-paper/95 p-6 sm:p-10 shadow-xs backdrop-blur-xs">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-moss/10 text-moss border border-moss/20">
              CLI
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-moss animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-graphite">
              Automated Registry Setup
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink">
            Install with the CLI
          </h2>

          <p className="mt-2.5 text-[0.92rem] leading-relaxed text-graphite max-w-2xl">
            The CLI resolves this item and its registry dependencies, verifies the integrity
            digest, checks your project for conflicts, and only then writes. It never
            overwrites a file you have edited without telling you.
          </p>
        </div>

        {/* macOS Style Terminal Window */}
        <div className="rounded-xl border border-line/40 bg-[#0e0e11] text-[#f4f4f5] shadow-md overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-white/40 ml-2 hidden sm:inline">
                terminal
              </span>
            </div>

            {/* Package Manager selector */}
            <div className="flex items-center rounded-lg bg-white/[0.06] p-0.5 border border-white/5">
              {(["pnpm", "npm", "bun", "yarn"] as const).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setPkgManager(pm)}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-mono rounded-md transition-all duration-150 cursor-pointer",
                    pkgManager === pm
                      ? "bg-white/20 text-white shadow-2xs font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/10",
                  )}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Code Command Row */}
          <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar font-mono text-[13px] sm:text-[14px]">
              <span className="text-moss select-none font-bold">$</span>
              <span className="text-white/90 whitespace-nowrap">
                {pkgManager === "pnpm" && (
                  <>
                    <span className="text-amber-400">pnpm dlx</span>{" "}
                    <span className="text-white font-semibold">uniquefingerprint</span>{" "}
                    <span className="text-sky-400">add</span>{" "}
                    <span className="text-emerald-400 font-bold">{entryName}</span>
                  </>
                )}
                {pkgManager === "npm" && (
                  <>
                    <span className="text-amber-400">npx</span>{" "}
                    <span className="text-white font-semibold">uniquefingerprint</span>{" "}
                    <span className="text-sky-400">add</span>{" "}
                    <span className="text-emerald-400 font-bold">{entryName}</span>
                  </>
                )}
                {pkgManager === "bun" && (
                  <>
                    <span className="text-amber-400">bunx --bun</span>{" "}
                    <span className="text-white font-semibold">uniquefingerprint</span>{" "}
                    <span className="text-sky-400">add</span>{" "}
                    <span className="text-emerald-400 font-bold">{entryName}</span>
                  </>
                )}
                {pkgManager === "yarn" && (
                  <>
                    <span className="text-amber-400">yarn dlx</span>{" "}
                    <span className="text-white font-semibold">uniquefingerprint</span>{" "}
                    <span className="text-sky-400">add</span>{" "}
                    <span className="text-emerald-400 font-bold">{entryName}</span>
                  </>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={() => void handleCopy()}
              className={cn(
                "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 border cursor-pointer",
                copied
                  ? "bg-moss/20 border-moss/40 text-moss"
                  : "bg-white/10 hover:bg-white/15 border-white/10 text-white/80 hover:text-white",
              )}
              title="Copy command"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Highlights row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-line/20">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-moss shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-ink">Zero Overwrites</p>
              <p className="text-[11px] text-graphite mt-0.5">Never replaces edited files without prompting.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-ink">Auto Dependencies</p>
              <p className="text-[11px] text-graphite mt-0.5">Resolves registry peer dependencies and aliases.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-ink">Integrity Verified</p>
              <p className="text-[11px] text-graphite mt-0.5">Checked against registry cryptographic signatures.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Alternative Card */}
      <div className="rounded-2xl border border-line/35 bg-paper/85 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-graphite px-2 py-0.5 rounded bg-surface border border-line/20 font-medium">
              Alternative
            </span>
            <span className="font-mono text-[11px] text-graphite">Manual Installation</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCode}
            className="text-xs gap-1.5 hover:border-ink transition-colors cursor-pointer"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>View Component Code</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        <h3 className="font-display text-xl sm:text-2xl tracking-tight text-ink">
          Or install manually
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite max-w-2xl">
          Copy the source from the Code tab into your project. The source imports{" "}
          <code className="font-mono text-[0.82rem] px-1.5 py-0.5 rounded bg-surface border border-line/30 text-ink">
            @/lib/cn
          </code>
          ; the CLI rewrites that alias to match your project's configuration.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-line/30 bg-surface/50 flex flex-col justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] text-graphite uppercase tracking-wider font-semibold">Step 1 • Dependencies</span>
              <p className="text-xs text-graphite mt-1">Install peer utilities used by components:</p>
            </div>
            <div className="flex items-center justify-between bg-ink/95 text-paper px-3 py-2 rounded-lg font-mono text-xs">
              <span className="truncate mr-2">{getPeerCommand(pkgManager)}</span>
              <CopyButton value={getPeerCommand(pkgManager)} label="Copy peer dependencies install" className="h-6 w-6 text-paper shrink-0" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-line/30 bg-surface/50 flex flex-col justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] text-graphite uppercase tracking-wider font-semibold">Step 2 • Component Code</span>
              <p className="text-xs text-graphite mt-1">Copy typescript and demo files directly from the Code tab.</p>
            </div>
            <button
              type="button"
              onClick={onViewCode}
              className="text-left font-mono text-xs text-moss hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Switch to Code tab</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <header className="shell pt-6 sm:pt-12">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <h1 className="optically-align text-3xl sm:text-5xl lg:text-step-5 max-w-[20ch] text-balance leading-[1.08]">{entry.title}</h1>
            <p className="prose-measure mt-4 sm:mt-6 text-[0.92rem] sm:text-step-1 leading-relaxed text-graphite">
              {entry.description}
            </p>

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
          <TabsList className="justify-center border-b border-line gap-4 sm:gap-10 overflow-x-auto no-scrollbar">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Laptop className="h-3.5 w-3.5" />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger value="install" className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5" />
              <span>Installation</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5" />
              <span>Code</span>
            </TabsTrigger>
          </TabsList>

          {/* Preview -------------------------------------------------- */}
          <TabsContent value="preview">
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
            <InstallationSection entryName={entry.name} onViewCode={() => setTab("code")} />
          </TabsContent>

          {/* Code ------------------------------------------------------ */}
          <TabsContent value="code" className="py-6 sm:py-10">
            {itemState.data ? (
              <div className="mx-auto max-w-4xl flex flex-col gap-6">
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

