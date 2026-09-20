import {
  ArrowRight,
  Box,
  Check,
  Compass,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  Type,
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

const SPECIMEN_TABS = [
  {
    id: "spatial-3d",
    label: "3D Spatial",
    slug: "interactive-wireframe-globe",
    icon: Globe,
    techBadge: "Three.js · WebGL",
  },
  {
    id: "text-animations",
    label: "Kinetic Text",
    slug: "true-focus-lens",
    icon: Type,
    techBadge: "Kinetic Optics",
  },
  {
    id: "backgrounds",
    label: "Canvas Shader",
    slug: "aurora-sky-harmonic",
    icon: Sparkles,
    techBadge: "GLSL Shader",
  },
  {
    id: "buttons",
    label: "Tactile Button",
    slug: "magnetic-spring-button",
    icon: Zap,
    techBadge: "Spring Physics",
  },
] as const;

function HeroSpecimenShowcase(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [copied, setCopied] = React.useState(false);

  const tab = SPECIMEN_TABS[activeTab] ?? SPECIMEN_TABS[0];
  const item = getAdvancedItemBySlug(tab.slug);

  const cliCommand = `pnpm dlx uniquefingerprint add ${tab.slug}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(cliCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-line/50 bg-paper/90 dark:bg-[#111114]/90 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300">
      {/* Tab Selector Header */}
      <div className="flex items-center justify-between border-b border-line/40 bg-surface/70 px-3 py-2 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {SPECIMEN_TABS.map((t, idx) => {
            const Icon = t.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-ink text-paper dark:bg-white dark:text-black shadow-xs"
                    : "text-graphite hover:text-ink hover:bg-line/20",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-moss" />
          </span>
          <span className="font-mono text-[10px] text-graphite uppercase tracking-wider font-semibold">
            Interactive
          </span>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0c0c0e] flex items-center justify-center p-4">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-oxide/10 via-transparent to-transparent opacity-60" />

        {/* Specimen Live Indicator Pill */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-moss animate-pulse" />
          <span>{tab.techBadge}</span>
        </div>

        {/* Live Preview Component */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {item ? (
            <AdvancedPreview item={item} />
          ) : (
            <div className="text-white/60 font-mono text-xs">Loading preview...</div>
          )}
        </div>
      </div>

      {/* Specimen Info & Copy Action Footer */}
      <div className="p-4 sm:p-5 flex flex-col gap-3.5 border-t border-line/40 bg-paper">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-oxide font-bold">
                {item?.category ?? tab.id}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-line/50 text-graphite bg-surface">
                {item?.fingerprint.performanceTier ?? "60fps"}
              </span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-ink tracking-tight truncate">
              {item?.title ?? tab.label}
            </h3>
            <p className="mt-0.5 text-xs text-graphite line-clamp-1">
              {item?.description}
            </p>
          </div>

          {item && (
            <Link
              to={`/advanced/${item.category}/${item.slug}`}
              className="shrink-0 flex items-center gap-1 text-xs font-mono font-semibold text-oxide hover:text-ink transition-colors mt-1"
            >
              <span>Inspect</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {/* CLI Command Pill */}
        <div className="flex items-center justify-between gap-2 rounded-xl border border-line/30 bg-[#0e0e11] px-3 py-2 text-[#f4f4f5] shadow-inner">
          <div className="flex items-center gap-2 min-w-0 overflow-x-auto no-scrollbar font-mono text-xs">
            <span className="text-moss font-bold select-none">$</span>
            <span className="whitespace-nowrap text-white/90 truncate">{cliCommand}</span>
          </div>
          <button
            type="button"
            onClick={() => void handleCopy()}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] transition-all border cursor-pointer",
              copied
                ? "bg-moss/20 border-moss/40 text-moss"
                : "bg-white/10 hover:bg-white/20 border-white/10 text-white/80 hover:text-white",
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
    </div>
  );
}

export default function HomePage(): React.JSX.Element {
  const index = useRegistryIndex();
  const [usageMethod, setUsageMethod] = React.useState<"pnpm" | "npx">("pnpm");

  const counts = React.useMemo(() => {
    if (!index.data) return [];
    return CATALOGUE_CATEGORIES.map((category) => ({
      ...category,
      count: itemsInCategory(index.data!, category.slug).length,
    })).filter((category) => category.count > 0);
  }, [index.data]);

  const featured = React.useMemo(() => {
    if (!index.data) return [];
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
      <section className="shell relative pt-6 sm:pt-12 lg:pt-16">
        <AuroraField opacity={0.16} className="-top-10 -left-10 -right-10 h-96 pointer-events-none" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,6.5fr)_minmax(0,5.5fr)] lg:gap-12 relative z-10 items-center">
          {/* Left Column: Heading, Thesis, Action CTAs & Metrics */}
          <div className="min-w-0 flex flex-col justify-between">
            <div>
              {/* Release announcement pill */}
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-oxide/40 bg-oxide/10 text-oxide text-xs font-mono uppercase tracking-wider mb-4 hover:border-oxide transition-colors duration-fast group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oxide opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-oxide" />
                </span>
                <span className="font-semibold">UniqueFingerprint 2.0</span>
                <span className="text-graphite font-normal">·</span>
                <span className="text-ink group-hover:text-oxide transition-colors">1,260+ Open Source UI Components &rarr;</span>
              </Link>

              <h1 className="optically-align text-balance text-3xl sm:text-5xl lg:text-step-5 font-normal leading-[1.08] tracking-tight text-ink">
                Interfaces should have a{" "}
                <span className="bg-gradient-to-r from-oxide via-amber-500 to-orange-500 bg-clip-text text-transparent font-bold">
                  distinctive fingerprint.
                </span>
              </h1>

              <p className="prose-measure mt-4 sm:mt-6 text-[0.95rem] sm:text-step-1 leading-relaxed text-graphite">
                Most modern interfaces feel identical because they lack intentional design rules.
                UniqueFingerprint is an open architecture of 1,260+ production-ready React
                components, GPU-accelerated WebGL scenes, kinetic typography, and procedural
                shaders. Direct code ownership. Zero runtime lock-in.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="h-11 sm:h-12 px-6 justify-center font-mono text-xs uppercase tracking-widest bg-ink text-paper hover:bg-ink/90 font-semibold shadow-md cursor-pointer"
                >
                  <Link to="/explore">Explore 1,260+ Components &rarr;</Link>
                </Button>

                <a
                  href="https://github.com/cyrilchris-j/uniquefingerprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 rounded-lg border border-line bg-surface/80 hover:bg-ink hover:text-paper dark:hover:bg-white dark:hover:text-black transition-all font-mono text-xs uppercase tracking-wider font-semibold shadow-2xs group"
                >
                  <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>Star on GitHub</span>
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                </a>

                <Button
                  variant="outline"
                  asChild
                  className="h-11 sm:h-12 px-5 justify-center font-mono text-xs uppercase tracking-widest border-line text-ink hover:border-oxide hover:text-oxide font-semibold transition-colors"
                >
                  <Link to="/advanced">220+ 3D & Shaders</Link>
                </Button>
              </div>
            </div>

            {/* Metrics stats row */}
            <div className="mt-8 pt-6 border-t border-line/40 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  {grandTotal > 0 ? `${grandTotal.toLocaleString()}+` : "1,260+"}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-graphite mt-1">
                  Published Items
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-oxide">
                  {advancedCount > 0 ? `${advancedCount}+` : "220+"}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-graphite mt-1">
                  WebGL 3D & Shaders
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  0
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-graphite mt-1">
                  Runtime Bloat
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  100%
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-graphite mt-1">
                  Open Source (MIT)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Specimen Showcase Stage */}
          <div className="flex flex-col gap-3 min-w-0">
            <HeroSpecimenShowcase />
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl border border-line/30 bg-surface/50 text-xs font-mono text-graphite">
              <Link
                to="/advanced"
                className="hover:text-ink transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-oxide" />
                <span>Browse all 220+ Advanced Resources</span>
              </Link>
              <span className="font-semibold text-ink">
                {grandTotal.toLocaleString()} in catalogue
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 01 — CLI & Direct Code Usage                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="01 — Get Started"
          title="Add to your project in one command."
          description="Zero configuration and zero runtime lock-in. The CLI configures path aliases, verifies integrity, and places clean TypeScript source directly into your codebase."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14 items-start">
          {/* Left Column: Clean, Separate Commands */}
          <div className="flex flex-col gap-5 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SegmentedControl
                label="Package manager"
                hideLabel
                size="sm"
                value={usageMethod}
                onValueChange={(val) => setUsageMethod(val as "pnpm" | "npx")}
                options={[
                  { value: "pnpm", label: "pnpm" },
                  { value: "npx", label: "npx" },
                ]}
              />
              <span className="font-mono text-[11px] tracking-wider text-graphite/70">
                automated registry CLI
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              <CommandStep
                step="1"
                title="Install any component directly"
                command={
                  usageMethod === "pnpm"
                    ? "pnpm dlx uniquefingerprint add magnetic-spring-button"
                    : "npx uniquefingerprint add magnetic-spring-button"
                }
              />
              <CommandStep
                step="2"
                title="Install multiple components at once"
                command={
                  usageMethod === "pnpm"
                    ? "pnpm dlx uniquefingerprint add magnetic-spring-button liquid-chrome-fluid"
                    : "npx uniquefingerprint add magnetic-spring-button liquid-chrome-fluid"
                }
              />
            </div>
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
                    Installs peer packages, sets up @/lib/cn, and checks for conflicts automatically.
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
      {/* 02 — Featured, chosen by rule                                     */}
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
      {/* 03 — Advanced Ecosystem Showcase                                 */}
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
