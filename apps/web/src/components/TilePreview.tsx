import * as React from "react";
import { Link } from "react-router";

import type { RegistryIndexEntry } from "@openui/types";
import { Skeleton } from "@openui/ui";

import { useInView } from "../hooks/use-in-view.js";
import { getCatalogueVisualPreview } from "../visual-engine/catalogue-previews.js";
import { getAdvancedItemBySlug } from "../advanced/index.js";

/**
 * Lazy tile preview.
 *
 * A catalogue of 800 live demos cannot mount 800 sandboxes; it cannot even
 * *fetch* 800 artifacts. This component checks for bespoke native visual
 * previews first (instant 60fps render, zero iframe cost). If none is available,
 * it renders a metadata-only tile until it scrolls within visibility, then
 * loads the sandbox demo in an isolated iframe.
 */
const TileSandbox = React.lazy(() =>
  import("../features/playground/TileSandbox.js").then((module) => ({
    default: module.TileSandbox,
  })),
);

export function TilePreview({ item }: { item: RegistryIndexEntry }): React.JSX.Element {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, rootMargin: "600px" });
  const bespoke = getCatalogueVisualPreview(item.name, item.category);
  const adv = getAdvancedItemBySlug(item.name);
  const targetHref = adv ? `/advanced/${adv.category}/${adv.slug}` : `/${item.category}/${item.name}`;

  return (
    <div ref={ref} className="w-full h-full overflow-hidden pointer-events-none select-none relative flex items-center justify-center">
      {bespoke ? (
        bespoke
      ) : inView ? (
        <React.Suspense fallback={<PreviewSkeleton />}>
          <TileSandbox name={item.name} />
        </React.Suspense>
      ) : (
        <Link
          to={targetHref}
          className="flex h-full items-end p-4 w-full"
          tabIndex={-1}
          aria-hidden
        >
          <span className="eyebrow text-[10px] text-graphite/70">scroll to preview</span>
        </Link>
      )}
    </div>
  );
}

function PreviewSkeleton(): React.JSX.Element {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Skeleton lines={3} />
    </div>
  );
}
