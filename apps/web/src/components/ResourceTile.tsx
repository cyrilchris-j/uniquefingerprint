import { ArrowUpRight } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import type { RegistryIndexEntry } from "@openui/types";
import { cn } from "@openui/ui";

import { getAdvancedItemBySlug } from "../advanced/index.js";
import { DnaStrip } from "./DnaStrip.js";
import { TilePreview } from "./TilePreview.js";

/**
 * A catalogue tile.
 *
 * Square, hairline-bordered, and part of a 1px-gap grid so the tiles read as
 * cells of one plate rather than as separate floating cards — the grid's own
 * rules do the separating.
 *
 * The whole tile is a link, and the link wraps the *heading* rather than the
 * tile: this keeps one tab stop per tile, keeps the target size large, and keeps
 * the accessible name equal to the resource title. A tile that contains three
 * links plus a favourite button is four tab stops for one destination.
 */
export interface ResourceTileProps {
  item: RegistryIndexEntry;
  /** Catalogue position, rendered as a monospace index. */
  index?: number;
  /** Render a lazy live preview above the metadata. Opt-in per surface. */
  withPreview?: boolean;
  className?: string;
}

export function ResourceTile({ item, index, withPreview = true, className }: ResourceTileProps): React.JSX.Element {
  const adv = getAdvancedItemBySlug(item.name);
  const href = adv ? `/advanced/${adv.category}/${adv.slug}` : `/${categorySegmentFor(item.category)}/${item.name}`;
  const dependencies = item.dependencies.filter((name) => name !== "react");

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white dark:bg-[#141413] border border-line/30 dark:border-line/20 rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-ink/40 dark:hover:border-ink/50 transition-all duration-normal ease-editorial hover:-translate-y-0.5",
        withPreview ? "" : "p-5 sm:p-6",
        className,
      )}
    >
      {index !== undefined ? (
        <span
          aria-hidden
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-10 font-mono text-[10px] tracking-[0.2em] text-graphite bg-white/90 dark:bg-black/80 px-2 py-0.5 rounded border border-line/20 backdrop-blur-xs shadow-xs"
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}

      {withPreview ? <TilePreview item={item} /> : null}

      <div className={cn("flex items-center gap-2", withPreview && "px-5 pt-5 sm:px-6 sm:pt-6")}>
        <span className="eyebrow text-[10px] sm:text-[11px]">{item.type.replace("registry:", "")}</span>
        {item.license ? (
          <>
            <span aria-hidden className="text-graphite/50">
              ·
            </span>
            <span className="eyebrow text-[10px] sm:text-[11px]">{item.license}</span>
          </>
        ) : null}
      </div>

      <h3 className={cn("max-w-[24ch] font-display text-xl sm:text-step-2 leading-tight sm:leading-[1.1] tracking-tight text-ink", withPreview ? "mt-3 px-5 sm:px-6" : "mt-2.5 sm:mt-3")}>
        <Link
          to={href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {item.title}
        </Link>
      </h3>

      <p className={cn("max-w-[44ch] text-[0.82rem] sm:text-[0.88rem] leading-relaxed text-graphite line-clamp-2 sm:line-clamp-none", withPreview ? "mt-2.5 px-5 sm:px-6" : "mt-2.5 sm:mt-3")}>
        {item.description}
      </p>

      <div className={cn("mt-auto", withPreview ? "px-5 pb-5 pt-5 sm:px-6 sm:pb-6" : "pt-5 sm:pt-6")}>
        <DnaStrip dna={item.dna} />
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/10 pt-3">
          <p className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite truncate">
            {dependencies.length === 0 ? "zero dependencies" : dependencies.length === 1 ? dependencies[0] : `${dependencies.length} deps`}
          </p>
          <span className="flex items-center gap-1 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-graphite transition-colors duration-fast group-hover:text-oxide shrink-0">
            Open
            <ArrowUpRight aria-hidden className="h-3 w-3" />
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * The URL segment for a catalogue category, derived from the category name the
 * build normalised.
 */
export function categorySegmentFor(category: string): string {
  const known = new Set([
    "components",
    "text",
    "motion",
    "interactions",
    "backgrounds",
    "layouts",
    "sections",
    "blocks",
    "themes",
    "patterns",
    "templates",
    "design-systems",
    "ai",
  ]);
  return known.has(category) ? category : "components";
}

/** A compact row used in lists (search results, collections) rather than tiles. */
export function ResourceRow({ item }: { item: RegistryIndexEntry }): React.JSX.Element {
  const adv = getAdvancedItemBySlug(item.name);
  const href = adv ? `/advanced/${adv.category}/${adv.slug}` : `/${categorySegmentFor(item.category)}/${item.name}`;

  return (
    <li className="group relative border-b border-line">
      <Link
        to={href}
        className="flex flex-col gap-1 py-4 transition-colors duration-fast ease-editorial hover:bg-ink/[0.02] sm:flex-row sm:items-baseline sm:gap-6"
      >
        <span className="eyebrow w-[7.5rem] shrink-0">{item.type.replace("registry:", "")}</span>
        <span className="font-display text-step-1 tracking-tight text-ink">{item.title}</span>
        <span className="hidden flex-1 truncate text-[0.85rem] text-graphite md:block">
          {item.description}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
          {item.tags.slice(0, 2).join(" · ")}
        </span>
      </Link>
    </li>
  );
}
