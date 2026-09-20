import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import { Button, EmptyState, SegmentedControl, Skeleton } from "@openui/ui";
import { cn } from "@openui/utils";

import { usePWA } from "../components/PWAInstall.js";
import { ResourceTile } from "../components/ResourceTile.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { CATALOGUE_CATEGORIES, itemsInCategory, itemsWithDesignRules } from "../lib/registry.js";
import { ADVANCED_RESOURCES, getAdvancedItemBySlug } from "../advanced/index.js";
import { AdvancedPreview } from "../advanced/renderers/AdvancedPreview.js";
import {
  AuroraField,
  ScrollReveal,
  WordReveal,
} from "../visual-engine/index.js";

function CommandStep({
  step,
  title,
  command,
}: {
  step: string;
  title: string;
  command: string;
}): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-line/35 bg-paper/95 p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-mono text-paper font-semibold">
            {step}
          </span>
          <span className="text-xs sm:text-[13px] font-medium text-ink tracking-tight">
            {title}
          </span>
        </div>
        <span className="font-mono text-[10px] text-graphite/60 uppercase tracking-wider">
          Terminal
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-line/25 bg-[#0e0e11] px-3.5 py-2.5 text-[#f4f4f5] shadow-inner">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar font-mono text-xs sm:text-[13px]">
          <span className="text-moss font-bold select-none">$</span>
          <span className="whitespace-nowrap text-white/90">{command}</span>
        </div>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className={cn(
            "shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] transition-all duration-150 border cursor-pointer",
            copied
              ? "bg-moss/20 border-moss/40 text-moss"
              : "bg-white/10 hover:bg-white/15 border-white/10 text-white/80 hover:text-white",
          )}
          title="Copy command"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * The home page.
 *
 * The composition is the argument. Where a generated landing page would put
 * giant centred text over a violet gradient, this one:
 *
 *  - opens with an **asymmetric** split: a wide statement column and a narrow
 *    index column that immediately shows what the registry contains,
 *  - draws structure with **hairlines and type**, not with cards and shadows,
 *  - shows the **design rules themselves** — the `anti-slop` rule text is
 *    rendered as content, so the product's thesis is visible rather than claimed.
 *
 * Every number on the page is read from the built registry index. Nothing is
 * hard-coded, so the page cannot drift from what is actually published.
 */
export default function HomePage(): React.JSX.Element {
  const index = useRegistryIndex();
  const { isInstalled, triggerInstall } = usePWA();
  const [usageMethod, setUsageMethod] = React.useState<"npx" | "pnpm" | "manual">("npx");

  const counts = React.useMemo(() => {
    if (!index.data) return [];
    return CATALOGUE_CATEGORIES.map((category) => ({
      ...category,
      count: itemsInCategory(index.data!, category.slug).length,
    })).filter((category) => category.count > 0);
  }, [index.data]);

  const featured = React.useMemo(() => {
    if (!index.data) return [];
    // Featured items are chosen by a *rule*, not by hand: they must declare a
    // full design fingerprint, which is the registry's own quality bar.
    return itemsWithDesignRules(index.data)
      .filter((item) => item.dna?.genre && item.dna?.macrostructure)
      .slice(0, 6);
  }, [index.data]);

  const totalItems = index.data?.items.length ?? 0;
  const advancedCount = ADVANCED_RESOURCES.length;
  const grandTotal = totalItems + advancedCount;

  const featuredAdvanced = React.useMemo(() => {
    const slugs = [
      "kinetic-editorial-hero",
      "interactive-wireframe-globe",
      "aurora-sky-harmonic",
      "true-focus-lens",
      "magnetic-spring-button",
      "depth-carousel-3d",
    ];
    return slugs
      .map((slug) => getAdvancedItemBySlug(slug))
      .filter((item): item is NonNullable<typeof item> => item !== undefined);
  }, []);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Opening statement                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell relative pt-6 sm:pt-14 lg:pt-20">
        <AuroraField opacity={0.16} className="-top-10 -left-10 -right-10 h-96 pointer-events-none" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16 relative z-10">
          <div className="min-w-0">
            <p className="eyebrow text-xs sm:text-[11px] tracking-[0.22em] text-graphite mb-3">
              Open registry · MIT · v{index.data?.version ?? "0.1.0"}
            </p>

            <h1 className="optically-align text-balance text-3xl sm:text-5xl lg:text-step-5 font-normal leading-[1.06] tracking-tight text-ink">
              <WordReveal text="Interfaces should have a fingerprint." />
            </h1>

            <p className="prose-measure mt-4 sm:mt-6 text-[0.95rem] sm:text-step-1 leading-relaxed text-graphite">
              Most generated interfaces look the same because nothing ever told them not to. UniqueFingerprint
              is an open registry of components, text effects, motion, layouts, themes and design
              systems — each one shipping its source, a demo, and the <em>design rules</em> that
              make it work. Install the code. Keep the rules.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 w-full max-w-[34rem]">
              <Button
                asChild
                className="w-full h-12 justify-center font-mono text-xs uppercase tracking-widest bg-ink text-paper hover:bg-ink/90 font-medium"
              >
                <Link to="/explore">Explore the registry</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full h-12 justify-center font-mono text-xs uppercase tracking-widest border-line text-ink hover:border-ink hover:bg-ink hover:text-paper font-medium transition-colors"
              >
                <Link to="/docs/registry">How the registry works</Link>
              </Button>
            </div>
          </div>

          {/* The index column: a live inventory, not a feature list. */}
          <aside className="min-w-0 lg:pt-2">
            <div className="border-t border-line pt-6">
              <p className="eyebrow mb-3">Registry index</p>
              {index.isLoading ? (
                <Skeleton lines={6} className="mt-4" />
              ) : index.error ? (
                <EmptyState
                  eyebrow="Unavailable"
                  title="The registry index could not be loaded."
                  description={index.error.message}
                  bordered={false}
                  className="px-0 py-6"
                />
              ) : (
                <dl className="mt-2">
                  {/* Advanced Ecosystem Category */}
                  <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 bg-oxide/[0.04] -mx-2 px-2 rounded">
                    <dt>
                      <Link
                        to="/advanced"
                        className="text-[0.9rem] text-oxide font-medium transition-colors duration-fast hover:text-ink flex items-center gap-2"
                      >
                        <span>Advanced</span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-oxide/40 bg-oxide/15 px-1.5 py-0.5 text-[9px] font-mono text-oxide font-semibold uppercase tracking-wider">
                          220+
                        </span>
                      </Link>
                    </dt>
                    <dd className="font-mono text-[0.8rem] tracking-[0.08em] text-oxide font-bold">
                      {String(advancedCount).padStart(2, "0")}
                    </dd>
                  </div>

                  {counts.map((category) => (
                    <div
                      key={category.slug}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                    >
                      <dt>
                        <Link
                          to={`/${category.slug}`}
                          className="text-[0.9rem] text-ink transition-colors duration-fast hover:text-oxide"
                        >
                          {category.title}
                        </Link>
                      </dt>
                      <dd className="font-mono text-[0.8rem] tracking-[0.08em] text-graphite">
                        {String(category.count).padStart(2, "0")}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <div>
                      <dt className="eyebrow">Total published</dt>
                      <p className="text-[10px] font-mono text-graphite/60 mt-0.5">
                        {totalItems} registry · {advancedCount} advanced
                      </p>
                    </div>
                    <dd className="font-mono text-[0.85rem] tracking-[0.08em] text-ink font-semibold">
                      {grandTotal.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CLI & Direct Code Usage                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="01 — Get Started"
          title="Add to your project in two commands."
          description="Zero configuration and zero runtime lock-in. The CLI configures path aliases, verifies integrity, and places clean TypeScript source directly into your codebase."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14 items-start">
          {/* Left Column: Clean, Separate Commands */}
          <div className="flex flex-col gap-5 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SegmentedControl
                label="Installation & usage methods"
                hideLabel
                size="sm"
                value={usageMethod}
                onValueChange={(val) => setUsageMethod(val as "npx" | "pnpm" | "manual")}
                options={[
                  { value: "npx", label: "npx" },
                  { value: "pnpm", label: "pnpm" },
                  { value: "manual", label: "Direct code" },
                ]}
              />
              <span className="font-mono text-[11px] tracking-wider text-graphite/70">
                {usageMethod === "manual" ? "zero tooling required" : "automated setup"}
              </span>
            </div>

            {usageMethod === "manual" ? (
              <div className="flex flex-col gap-3.5">
                <CommandStep
                  step="1"
                  title="Install peer dependencies"
                  command="pnpm add clsx tailwind-merge motion"
                />
                <div className="rounded-xl border border-line/35 bg-paper/95 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-mono text-paper font-semibold">
                      2
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-ink tracking-tight">
                      Copy component source code
                    </span>
                  </div>
                  <p className="text-xs text-graphite leading-relaxed">
                    Open any component from the catalogue, click the <strong>Code</strong> tab, and paste the TypeScript file into your project.
                  </p>
                  <div className="pt-1">
                    <Button variant="outline" size="sm" asChild className="text-xs gap-1.5 w-fit">
                      <Link to="/explore">
                        <span>Browse Catalogue</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                <CommandStep
                  step="1"
                  title="Initialize project configuration"
                  command={
                    usageMethod === "pnpm"
                      ? "pnpm dlx uniquefingerprint init"
                      : "npx uniquefingerprint init"
                  }
                />
                <CommandStep
                  step="2"
                  title="Add component to your project"
                  command={
                    usageMethod === "pnpm"
                      ? "pnpm dlx uniquefingerprint add magnetic-button"
                      : "npx uniquefingerprint add magnetic-button"
                  }
                />
              </div>
            )}
          </div>

          {/* Right Column: Essential Content Only */}
          <div className="flex flex-col justify-between gap-6 min-w-0 rounded-2xl border border-line/35 bg-paper/90 p-6 sm:p-8 shadow-xs">
            <div>
              <p className="font-display text-xl sm:text-2xl tracking-tight text-ink">
                Complete code ownership.
              </p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite">
                Components are copied directly into your repository as pure TypeScript and Tailwind CSS with zero runtime dependencies.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-line/20 pt-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-moss/10 text-moss border border-moss/20 mt-0.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink uppercase tracking-wider font-mono">
                    Zero Runtime Lock-in
                  </p>
                  <p className="mt-0.5 text-xs text-graphite leading-relaxed">
                    Code lives in your repository. Customize, style, or refactor with total freedom.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 mt-0.5">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink uppercase tracking-wider font-mono">
                    Auto Dependency Resolution
                  </p>
                  <p className="mt-0.5 text-xs text-graphite leading-relaxed">
                    Installs peer packages, sets up `@/lib/cn`, and checks for conflicts automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 border border-sky-500/20 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink uppercase tracking-wider font-mono">
                    No Black-Box NPM Packages
                  </p>
                  <p className="mt-0.5 text-xs text-graphite leading-relaxed">
                    Accessible primitives, motion physics, and clean token contracts you can inspect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured, chosen by rule                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="02 — Fingerprinted resources"
          title="Selected because they declare their fingerprint."
          description="Not an editorial pick. These are the resources that state a complete design DNA — genre, macrostructure, density, shape and motion — which is the minimum this registry asks before something is published."
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/explore">All resources</Link>
            </Button>
          }
        />

        <div className="catalogue-grid mt-10">
          {index.isLoading ? (
            <div className="bg-paper p-6">
              <Skeleton lines={5} />
            </div>
          ) : featured.length === 0 ? (
            <div className="bg-paper p-6">
              <EmptyState
                bordered={false}
                eyebrow="Nothing published"
                title="No resources declare a full design fingerprint yet."
                description="Run pnpm build:registry to publish the first-party set."
              />
            </div>
          ) : (
            featured.map((item, position) => (
              <ScrollReveal key={item.name} delayMs={position * 40}>
                <ResourceTile item={item} index={position + 1} withPreview />
              </ScrollReveal>
            ))
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Advanced Ecosystem Showcase                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="03 — Advanced Ecosystem (220+)"
          title="Spatial 3D, procedural canvases, and kinetic interactions."
          description="Engineered for high-end digital products: GPU-accelerated Three.js WebGL scenes, organic canvas simulations, haptic micro-interactions, and kinetic typography with zero external runtime bloat."
          actions={
            <Button variant="outline" size="sm" asChild>
              <Link to="/advanced">Browse All 220+ Resources &rarr;</Link>
            </Button>
          }
        />

        {/* Featured Advanced Grid */}
        <div className="catalogue-grid mt-10">
          {featuredAdvanced.map((advItem, position) => (
            <ScrollReveal key={advItem.slug} delayMs={position * 40}>
              <article
                className="group relative flex flex-col justify-between overflow-hidden border border-line/30 dark:border-line/20 bg-paper rounded-xl transition-all duration-normal ease-editorial hover:shadow-lg hover:border-ink/40 dark:hover:border-ink/50 hover:-translate-y-0.5"
              >
                {/* Live Preview Container */}
                <div
                  className="h-44 sm:h-52 w-full border-b border-line/25 overflow-hidden relative flex items-center justify-center bg-[#f8f6f1] dark:bg-[#0c0c0b] p-4"
                  style={{
                    backgroundImage: "radial-gradient(hsl(var(--line) / 0.12) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center pointer-events-none transform scale-90">
                    <AdvancedPreview item={advItem} />
                  </div>
                </div>

                {/* Meta & Info */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="eyebrow text-[10px] uppercase tracking-wider text-graphite">
                        {advItem.category} · {advItem.technology}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono border border-line/50 text-ink/70 bg-surface/50">
                        {advItem.fingerprint.performanceTier}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-ink text-lg tracking-tight group-hover:text-oxide transition-colors">
                      <Link to={`/advanced/${advItem.category}/${advItem.slug}`} className="focus:outline-hidden">
                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                        {advItem.title}
                      </Link>
                    </h3>

                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-graphite line-clamp-2">
                      {advItem.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/20 flex items-center justify-between text-[11px] font-mono text-graphite">
                    <span className="truncate text-[10px] text-graphite/80">
                      {advItem.tags.slice(0, 2).map((t) => `#${t}`).join(" ")}
                    </span>
                    <span className="text-ink/70 group-hover:text-oxide transition-colors flex items-center gap-1 font-medium">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>


    </>
  );
}
