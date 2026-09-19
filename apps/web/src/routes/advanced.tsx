import * as React from "react";
import { Link, Navigate, useSearchParams, useParams } from "react-router";
import { Button, EmptyState, SegmentedControl } from "@openui/ui";

import { SectionHeader } from "../components/SectionHeader.js";
import { ScrollReveal } from "../visual-engine/index.js";
import {
  ADVANCED_CATEGORIES,
  ADVANCED_RESOURCES,
  getAdvancedItemBySlug,
  type AdvancedCategorySlug,
  type AdvancedTechnology,
} from "../advanced/index.js";
import { AdvancedPreview } from "../advanced/renderers/AdvancedPreview.js";

export default function AdvancedExplorerPage(): React.JSX.Element {
  const { category: pathCategory } = useParams<{ category?: string }>();
  const [params, setParams] = useSearchParams();

  const itemMatch = pathCategory ? getAdvancedItemBySlug(pathCategory) : undefined;

  const selectedCategory = (pathCategory ?? params.get("category") ?? "all") as AdvancedCategorySlug | "all";
  const selectedTech = (params.get("tech") ?? "all") as AdvancedTechnology | "all";
  const searchQuery = params.get("q")?.toLowerCase() ?? "";

  const filteredItems = React.useMemo(() => {
    return ADVANCED_RESOURCES.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedTech !== "all" && item.technology !== selectedTech) {
        return false;
      }
      if (searchQuery) {
        const matchesText =
          item.title.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery));
        if (!matchesText) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedTech, searchQuery]);

  if (itemMatch) {
    return <Navigate to={`/advanced/${itemMatch.category}/${itemMatch.slug}`} replace />;
  }

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all" || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  return (
    <div className="shell py-8 sm:py-16">
      <SectionHeader
        as="h1"
        eyebrow="UniqueFingerprint · Advanced Resource Ecosystem"
        title="Original 3D, WebGL, Motion & Creative Primitives."
        description={`A bespoke ecosystem of ${ADVANCED_RESOURCES.length} advanced resources engineered for high-performance creative interfaces. Complete with live interactive previews, physical spring calibration, and accessible fallbacks.`}
        actions={
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/explore">Core 800 Catalogue</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/search">Advanced Search</Link>
            </Button>
          </div>
        }
      />

      {/* Category Filter */}
      <div className="mt-8 border-t border-line pt-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SegmentedControl
            label="Category"
            value={selectedCategory}
            onValueChange={(val) => updateParam("category", val)}
            options={[
              { value: "all", label: `All (${ADVANCED_RESOURCES.length})` },
              ...ADVANCED_CATEGORIES.map((cat) => ({
                value: cat.slug,
                label: `${cat.title} (${cat.itemCount})`,
              })),
            ]}
          />

          <p className="eyebrow text-graphite text-[11px] self-start sm:self-auto">
            {filteredItems.length} {filteredItems.length === 1 ? "resource" : "resources"} available
          </p>
        </div>

        {/* Technology Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-mono text-[10px] text-graphite uppercase tracking-wider mr-1">Tech:</span>
          {[
            { id: "all", label: "All Technologies" },
            { id: "three-webgl", label: "Three.js / WebGL" },
            { id: "canvas-2d", label: "Procedural Canvas" },
            { id: "spring-physics", label: "Spring Physics" },
            { id: "dom-motion", label: "DOM Motion" },
            { id: "css-transforms", label: "CSS Layouts" },
          ].map((tech) => (
            <button
              key={tech.id}
              onClick={() => updateParam("tech", tech.id)}
              className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors ${
                selectedTech === tech.id
                  ? "bg-ink text-paper border-ink"
                  : "bg-surface/50 text-graphite border-line/40 hover:text-ink hover:border-line"
              }`}
            >
              {tech.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          className="mt-12"
          eyebrow="No Matches"
          title="No advanced resources match the active filters."
          description="Try selecting a different category or clearing the technology filters."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setParams(new URLSearchParams(), { replace: true });
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="catalogue-grid mt-8 sm:mt-12">
          {filteredItems.map((item) => (
            <article
              key={item.slug}
              className="group relative flex flex-col justify-between overflow-hidden border border-line bg-paper rounded-lg transition-all duration-fast hover:border-ink/60 hover:shadow-xs"
            >
              {/* Live Preview Container */}
              <div className="h-44 sm:h-48 w-full border-b border-line/30 overflow-hidden bg-surface/20">
                <AdvancedPreview item={item} />
              </div>

              {/* Meta & Info */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-graphite">
                      {item.category} · {item.technology}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono border border-line/50 text-ink/70">
                      {item.fingerprint.performanceTier}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-ink text-base group-hover:text-ink">
                    <Link to={`/advanced/${item.category}/${item.slug}`} className="focus:outline-hidden">
                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-1 text-[12px] text-graphite line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/30 flex items-center justify-between text-[11px] font-mono text-graphite">
                  <span className="truncate">
                    {item.tags.slice(0, 2).map((t) => `#${t}`).join(" ")}
                  </span>
                  <span className="text-ink/60 group-hover:text-ink transition-colors">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
