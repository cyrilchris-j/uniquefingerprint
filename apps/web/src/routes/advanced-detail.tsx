import * as React from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Heart,
  Laptop,
  PackageSearch,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Terminal,
  Zap,
} from "lucide-react";
import {
  Button,
  EmptyState,
  SegmentedControl,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@openui/ui";
import { cn } from "@openui/utils";

import { CodeBlock } from "../components/CodeBlock.js";
import { DnaStrip } from "../components/DnaStrip.js";
import { MetaRow } from "../components/SectionHeader.js";
import { getAdvancedItemBySlug, getAdvancedItemsByCategory } from "../advanced/index.js";
import { AdvancedPreview } from "../advanced/renderers/AdvancedPreview.js";
import { useDocumentTitle, useMetaDescription } from "../hooks/use-document-title.js";
import { openSignInDialog, useAuth } from "../lib/auth.js";
import { isResourceFavorited, toggleStoredFavorite } from "../lib/favorites.js";

// ─── Install Section ────────────────────────────────────────────────────────

interface AdvancedInstallSectionProps {
  slug: string;
  onViewCode: () => void;
}

function AdvancedInstallSection({ slug, onViewCode }: AdvancedInstallSectionProps): React.JSX.Element {
  const [pkgManager, setPkgManager] = React.useState<"pnpm" | "npm">("pnpm");
  const [copied, setCopied] = React.useState(false);
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const getCommand = (pm: "pnpm" | "npm") =>
    pm === "pnpm"
      ? `pnpm dlx uniquefingerprint add ${slug}`
      : `npx uniquefingerprint add ${slug}`;

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
              {(["pnpm", "npm"] as const).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setPkgManager(pm)}
                  className={cn(
                    "px-3 py-1 text-[11px] font-mono rounded-md transition-all duration-150 cursor-pointer",
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
                {pkgManager === "pnpm" ? (
                  <>
                    <span className="text-amber-400">pnpm dlx</span>{" "}
                    <span className="text-white font-semibold">uniquefingerprint</span>{" "}
                    <span className="text-sky-400">add</span>{" "}
                    <span className="text-emerald-400 font-bold">{slug}</span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-400">npx</span>{" "}
                    <span className="text-white font-semibold">uniquefingerprint</span>{" "}
                    <span className="text-sky-400">add</span>{" "}
                    <span className="text-emerald-400 font-bold">{slug}</span>
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
          Or copy manually
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite max-w-2xl">
          Take full control of the code by copying the component source directly into your codebase. No CLI or external registry lock-in required.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-xl border border-line/30 bg-surface/50 flex flex-col justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] text-graphite uppercase tracking-wider font-semibold">1. Inspect &amp; Copy Source</span>
              <p className="text-xs text-graphite mt-1.5 leading-relaxed">
                Open the Source Code tab above to view, explore, and copy the full unminified TypeScript/React component source code.
              </p>
            </div>
            <button
              type="button"
              onClick={onViewCode}
              className="text-left font-mono text-xs text-moss hover:underline flex items-center gap-1.5 cursor-pointer font-medium pt-1"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Switch to Source Code tab</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-line/30 bg-surface/50 flex flex-col justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] text-graphite uppercase tracking-wider font-semibold">2. Paste into Your Project</span>
              <p className="text-xs text-graphite mt-1.5 leading-relaxed">
                Create a new file in your components folder (e.g.{" "}
                <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-surface border border-line/30 text-ink">
                  components/{slug}.tsx
                </code>
                ), paste the code, and import it directly into your application.
              </p>
            </div>
            <div className="font-mono text-[10.5px] text-graphite/70 flex items-center gap-1.5 pt-1">
              <span>✓ Self-contained &amp; ready to use</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdvancedDetailPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string; category: string }>();
  const item = slug ? getAdvancedItemBySlug(slug) : undefined;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState<"preview" | "code" | "install">("preview");
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const related = React.useMemo(() => {
    if (!item) return [];
    return getAdvancedItemsByCategory(item.category)
      .filter((other) => other.slug !== item.slug)
      .slice(0, 3);
  }, [item]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveTab("preview");
  }, [slug]);

  useDocumentTitle(
    item
      ? `${item.title} — Advanced · UniqueFingerprint`
      : "Advanced Resource — UniqueFingerprint",
  );
  useMetaDescription(item?.description);

  if (!item) {
    return (
      <div className="shell py-16">
        <EmptyState
          eyebrow="Resource Not Found"
          title={`No advanced resource found for "${slug}".`}
          description="The requested resource may have moved or does not exist in the Advanced Ecosystem."
          action={
            <Button variant="outline" asChild>
              <Link to="/advanced">Browse Advanced Ecosystem</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const { token, user } = useAuth();
  const [favorited, setFavorited] = React.useState(() =>
    isResourceFavorited(user?.id, item?.slug || ""),
  );
  const [favoriteError, setFavoriteError] = React.useState<string | null>(null);
  const [favoritePending, setFavoritePending] = React.useState(false);

  React.useEffect(() => {
    if (user?.id && item?.slug) {
      setFavorited(isResourceFavorited(user.id, item.slug));
    } else {
      setFavorited(false);
    }
  }, [user?.id, item?.slug]);

  React.useEffect(() => {
    const onFavChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.slug === item?.slug) {
        setFavorited(Boolean(detail.favorited));
      }
    };
    window.addEventListener("openui:favorites_changed", onFavChange);
    return () => window.removeEventListener("openui:favorites_changed", onFavChange);
  }, [item?.slug]);

  const toggleFavorite = async () => {
    if (!user) {
      openSignInDialog();
      setFavoriteError("Sign in to save this resource to your favourites.");
      return;
    }
    if (!item) return;

    setFavoritePending(true);
    setFavoriteError(null);
    try {
      const nextFavorited = toggleStoredFavorite(
        user.id,
        {
          name: item.slug,
          title: item.title,
          description: item.description,
          category: item.category,
          type: "advanced-component",
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

  const handleReturn = () => {
    try {
      sessionStorage.setItem("openui_returning", "true");
      if (item) {
        sessionStorage.setItem("openui_last_clicked_item", item.slug);
        sessionStorage.setItem(`openui_target_item_/${item.category}`, item.slug);
        sessionStorage.setItem("openui_target_item_/advanced", item.slug);
      }
    } catch {
      // Ignore
    }

    const lastOrigin = sessionStorage.getItem("openui_last_origin_path");
    if (lastOrigin && lastOrigin !== window.location.pathname) {
      navigate(lastOrigin);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/advanced?category=${item.category}`);
    }
  };

  const VIEWPORT_MAX: Record<string, string> = {
    mobile: "min(390px, 100%)",
    tablet: "min(834px, 100%)",
    desktop: "100%",
  };

  return (
    <article className="pb-16">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="shell pt-6 sm:pt-10">
        {/* Return button */}
        <div className="mb-4 sm:mb-6">
          <button
            type="button"
            onClick={handleReturn}
            className="group inline-flex items-center gap-2 px-3 py-1.5 -ml-3 rounded-lg text-xs font-mono tracking-wider uppercase text-graphite hover:text-ink hover:bg-surface/80 dark:hover:bg-zinc-800/60 border border-transparent hover:border-line/30 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-graphite group-hover:text-ink" />
            <span>Return to {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
          </button>
        </div>

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          {/* Title + description + actions */}
          <div>
            <h1 className="optically-align text-3xl sm:text-5xl lg:text-step-5 max-w-[20ch] text-balance leading-[1.08]">
              {item.title}
            </h1>
            <p className="prose-measure mt-4 sm:mt-6 text-[0.92rem] sm:text-step-1 leading-relaxed text-graphite">
              {item.description}
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
                      <Link to={`/playground?advanced=${item.slug}`}>
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
                  <span className="font-mono">advanced/{item.slug}</span>
                </MetaRow>
                <MetaRow label="Type">
                  <span className="font-mono">registry:advanced-component</span>
                </MetaRow>
                <MetaRow label="Category">
                  <span className="capitalize">{item.category}</span>
                </MetaRow>
                <MetaRow label="Licence">MIT</MetaRow>
              </dl>
            </div>
          </aside>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Tabs                                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="shell mt-8 sm:mt-16">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
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

          {/* Preview -------------------------------------------------------- */}
          <TabsContent value="preview">
            {/* Viewport bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <SegmentedControl
                label="Viewport"
                hideLabel
                value={viewport}
                onValueChange={(value) => setViewport(value as typeof viewport)}
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
              {/* macOS Chrome Toolbar */}
              <div className="rounded-xl border border-line/30 dark:border-line/20 overflow-hidden shadow-xs bg-paper">
                <div className="flex h-10 items-center justify-between border-b border-line/25 bg-surface/50 px-3.5 sm:px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50" />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-paper border border-line/25 font-mono text-[11px] text-graphite shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                    <span className="text-ink font-medium tracking-tight">{item.slug}</span>
                    <span className="text-graphite/50 hidden sm:inline">·</span>
                    <span className="hidden sm:inline">preview</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Reduced motion toggle */}
                    <button
                      type="button"
                      onClick={() => setReducedMotion(!reducedMotion)}
                      className={cn(
                        "px-2.5 py-1 text-[10px] font-mono border rounded-md transition-colors",
                        reducedMotion
                          ? "bg-moss/20 border-moss text-moss font-semibold"
                          : "border-line text-graphite hover:text-ink",
                      )}
                    >
                      {reducedMotion ? "Motion: Off" : "Motion: On"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setRefreshKey((k) => k + 1)}
                      title="Reset preview"
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-graphite hover:text-ink transition-colors rounded border border-line/20 hover:bg-surface/70 cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Stage */}
                <div
                  className="relative overflow-hidden bg-[#f8f6f1] dark:bg-[#0c0c0b] flex items-center justify-center p-6 sm:p-10 min-h-[360px] sm:min-h-[480px]"
                  style={{
                    backgroundImage: "radial-gradient(hsl(var(--line) / 0.12) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <div
                    key={`${item.slug}-${viewport}-${refreshKey}`}
                    className="w-full flex items-center justify-center"
                  >
                    <AdvancedPreview item={item} reducedMotion={reducedMotion} />
                  </div>
                </div>

                {/* Status bar */}
                <div className="border-t border-line/25 bg-surface/40 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-graphite">
                  <span>Technology: {item.technology}</span>
                  <span>Performance: {item.fingerprint.performanceTier}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Installation --------------------------------------------------- */}
          <TabsContent value="install">
            <AdvancedInstallSection slug={item.slug} onViewCode={() => setActiveTab("code")} />
          </TabsContent>

          {/* Source Code ---------------------------------------------------- */}
          <TabsContent value="code" className="py-6 sm:py-10">
            <div className="mx-auto max-w-4xl">
              <CodeBlock
                caption={`openui/${item.category}/${item.slug}.tsx`}
                language="tsx"
                code={item.sourceCode}
                showLineNumbers
                maxLines={40}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Related / Composes With                                             */}
      {/* ------------------------------------------------------------------ */}
      {related.length > 0 && (
        <section className="shell mt-24">
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
            <p className="eyebrow">Composes with</p>
            <p className="eyebrow">Shared tags and category</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {related.map((other, index) => (
              <article
                key={other.slug}
                className="group relative flex flex-col bg-white dark:bg-[#141413] border border-line/30 dark:border-line/20 rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-ink/40 dark:hover:border-ink/50 transition-all duration-normal ease-editorial hover:-translate-y-0.5"
              >
                {/* Index Badge */}
                <span
                  aria-hidden
                  className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-10 font-mono text-[10px] tracking-[0.2em] text-graphite bg-white/90 dark:bg-black/80 px-2 py-0.5 rounded border border-line/20 backdrop-blur-xs shadow-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Live Preview Stage */}
                <div
                  className="h-44 sm:h-52 w-full border-b border-line/25 overflow-hidden relative flex items-center justify-center bg-[#f8f6f1] dark:bg-[#0c0c0b] p-4"
                  style={{
                    backgroundImage: "radial-gradient(hsl(var(--line) / 0.12) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center pointer-events-none transform scale-90">
                    <AdvancedPreview item={other} />
                  </div>
                </div>

                {/* Category & License */}
                <div className="flex items-center gap-2 px-5 pt-5 sm:px-6 sm:pt-6">
                  <span className="eyebrow text-[10px] sm:text-[11px] uppercase tracking-wider">
                    {other.category}
                  </span>
                  <span aria-hidden className="text-graphite/50">·</span>
                  <span className="eyebrow text-[10px] sm:text-[11px]">MIT</span>
                </div>

                {/* Title */}
                <h3 className="max-w-[24ch] font-display text-xl sm:text-step-2 leading-tight sm:leading-[1.1] tracking-tight text-ink mt-3 px-5 sm:px-6">
                  <Link
                    to={`/advanced/${other.category}/${other.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-oxide transition-colors"
                  >
                    {other.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="max-w-[44ch] text-[0.82rem] sm:text-[0.88rem] leading-relaxed text-graphite line-clamp-2 mt-2.5 px-5 sm:px-6">
                  {other.description}
                </p>

                {/* DNA Strip & Dependencies */}
                <div className="mt-auto px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <DnaStrip
                    dna={{
                      genre: (other.fingerprint.visualFamily as any) || "minimal",
                      macrostructure: (other.fingerprint.responsiveProfile as any) || "stack",
                      density: "compact",
                      shapeLanguage: "rounded",
                      motionLanguage: (other.fingerprint.motionProfile as any) || "mechanical",
                      typographyStyle: "grotesk",
                    }}
                  />
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/10 pt-3">
                    <p className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite truncate">
                      {other.dependencies.length === 0
                        ? "zero dependencies"
                        : other.dependencies.length === 1
                        ? other.dependencies[0]
                        : `${other.dependencies.length} deps`}
                    </p>
                    <span className="flex items-center gap-1 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite transition-colors duration-fast group-hover:text-oxide shrink-0">
                      Open
                      <ArrowUpRight aria-hidden className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
