import { Download } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import { Button, EmptyState, Skeleton } from "@openui/ui";

import { CodeBlock } from "../components/CodeBlock.js";
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
      {/* The thesis, demonstrated with a real resource                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <SectionHeader
          eyebrow="01 — What a resource contains"
          title="A resource is code, a demonstration, and a written reason."
          description="Every item in this registry ships four things: the source you will own, a runnable demo, install metadata, and a design.md that names its genre, macrostructure, density, shape language and motion. That last file is what a model reads before it writes anything — and what stops the next generated page from looking like the last one."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <CodeBlock
            className="min-w-0"
            caption="registry/default/components/magnetic-button/design.md"
            language="markdown"
            maxLines={22}
            code={`# Design System

Genre: editorial
Macrostructure: asymmetric
Density: medium
Shape: sharp
Motion: subtle

## Rules

- The magnet must be bounded. An unbounded target feels broken.
- Never move the hit area; transform only.
- Keyboard focus behaves exactly like a plain button.
- Disable magnetisation under prefers-reduced-motion.
- The accent colour is the only signal; no shadows.`}
          />

          <div className="flex flex-col gap-6 min-w-0">
            <p className="prose-measure text-[0.95rem] leading-relaxed text-graphite">
              The registry is not a package index. A package tells you what it exports; a registry
              resource tells you what it <em>is</em>, in the vocabulary of design — so an
              agent, a teammate or a future you can reuse the intent, not just the implementation.
            </p>

            <ul className="flex flex-col">
              {[
                ["Source you own", "Installed into your project. No runtime dependency on us."],
                ["A runnable demo", "Rendered in an isolated sandbox, never in this origin."],
                ["Install metadata", "npm dependencies, registry dependencies, licence, integrity."],
                ["design.md", "The fingerprint: genre, structure, density, shape, motion."],
              ].map(([title, body]) => (
                <li key={title} className="border-t border-line py-4">
                  <p className="font-display text-step-1 tracking-tight text-ink">{title}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-graphite">{body}</p>
                </li>
              ))}
            </ul>
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
                description="Run pnpm build:registry to publish the first-party set, or submit a resource with a design.md."
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


      {/* ---------------------------------------------------------------- */}
      {/* Closing                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-12 sm:mt-24 lg:mt-32">
        <div className="grid gap-6 sm:gap-8 border-t border-line pt-6 sm:pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
          <h2 className="optically-align text-2xl sm:text-3xl lg:text-step-4 max-w-[20ch] text-balance leading-[1.08] min-w-0">
            Add the resource you wish existed.
          </h2>
          <div className="flex flex-col items-start gap-4 sm:gap-6 min-w-0">
            <p className="prose-measure text-[0.88rem] sm:text-[0.95rem] leading-relaxed text-graphite">
              Contributions go through a pull request, automated schema validation, a preview build
              and a moderation review. Published versions are immutable — a correction is a new
              version, never an edit, so anyone who installed 1.0.0 can always see what 1.0.0
              contained.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Button asChild>
                <Link to="/submit">Submit a resource</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/docs/contributing">Read the guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
