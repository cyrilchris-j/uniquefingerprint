import * as React from "react";
import { Link } from "react-router";

import type { RegistryIndexEntry } from "@openui/types";
import { cn } from "@openui/ui";

import { getAdvancedItemBySlug } from "../advanced/index.js";
import { TilePreview } from "./TilePreview.js";

/**
 * A catalogue tile.
 *
 * Clean, standard card container displaying the component's live preview,
 * category taxonomy, performance tier, title, description, tags, and detail action.
 */
export interface ResourceTileProps {
  item: RegistryIndexEntry;
  /** Catalogue position, preserved for API compatibility. */
  index?: number;
  /** Render a live preview above the metadata. Opt-in per surface. */
  withPreview?: boolean;
  className?: string;
}

function recordTileClick(itemName: string) {
  try {
    sessionStorage.setItem("openui_last_clicked_item", itemName);
    sessionStorage.setItem(`openui_scroll_${window.location.pathname}`, String(window.scrollY));
    sessionStorage.setItem(`openui_target_item_${window.location.pathname}`, itemName);
    sessionStorage.setItem("openui_last_origin_path", window.location.pathname);
  } catch {
    // Ignore storage issues
  }
}

export function ResourceTile({
  item,
  withPreview = true,
  className,
}: ResourceTileProps): React.JSX.Element {
  const adv = getAdvancedItemBySlug(item.name);
  const href = adv ? `/advanced/${adv.category}/${adv.slug}` : `/${categorySegmentFor(item.category)}/${item.name}`;

  const categoryText = (item.category || "component").toUpperCase();
  const subcategoryText = item.subcategory
    ? item.subcategory.toUpperCase()
    : item.dna?.genre
      ? String(item.dna.genre).toUpperCase()
      : "";
  const categoryHeader = subcategoryText ? `${categoryText} · ${subcategoryText}` : categoryText;

  const tierBadge =
    adv?.fingerprint?.performanceTier ||
    item.difficulty ||
    (item.dna?.density ? String(item.dna.density) : null) ||
    "moderate";

  const tags =
    item.tags && item.tags.length > 0
      ? item.tags.slice(0, 2).map((t) => `#${t.replace(/^#/, "")}`).join(" ")
      : `#${item.category} #${item.subcategory || "ui"}`;

  return (
    <article
      id={`item-${item.name}`}
      data-item-slug={item.name}
      onClick={() => recordTileClick(item.name)}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border border-line bg-paper rounded-lg transition-all duration-fast hover:border-ink/60 hover:shadow-xs",
        className,
      )}
    >
      {/* Live Preview Container */}
      {withPreview ? (
        <div className="h-44 sm:h-48 w-full border-b border-line/30 overflow-hidden bg-surface/20">
          <TilePreview item={item} />
        </div>
      ) : null}

      {/* Meta & Info */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-graphite">
              {categoryHeader}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono border border-line/50 text-ink/70">
              {tierBadge}
            </span>
          </div>

          <h3 className="font-display font-semibold text-ink text-base group-hover:text-ink">
            <Link
              to={href}
              onClick={() => recordTileClick(item.name)}
              className="focus:outline-hidden"
            >
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
            {tags}
          </span>
          <span className="text-ink/60 group-hover:text-ink transition-colors flex items-center gap-1">
            View Details &rarr;
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
    <li id={`item-${item.name}`} data-item-slug={item.name} className="group relative border-b border-line">
      <Link
        to={href}
        onClick={() => recordTileClick(item.name)}
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
