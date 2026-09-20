import * as React from "react";
import { Link, useSearchParams } from "react-router";

import { Button, EmptyState, SegmentedControl, Skeleton } from "@openui/ui";

import { ResourceRow, ResourceTile } from "../components/ResourceTile.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";
import { ScrollReveal } from "../visual-engine/index.js";

/**
 * Explore.
 *
 * The whole catalogue in one place, switchable between a tile grid and an index
 * row. The view mode lives in the URL so that a filtered, tiled view is a
 * shareable link — a state that only exists in component state cannot be sent to
 * a colleague.
 *
 * The type filter is a *segmented control of resource types*, and the counts come
 * from the index, so an empty category is visible rather than hidden. Knowing
 * that a category exists and is empty is information.
 */
export default function ExplorePage(): React.JSX.Element {
  const index = useRegistryIndex();
  const [params, setParams] = useSearchParams();

  const view = params.get("view") === "list" ? "list" : "grid";
  const typeFilter = params.get("type");

  const items = React.useMemo(() => {
    if (!index.data) return [];
    const all = index.data.items;
    return typeFilter ? all.filter((item) => item.resourceType === typeFilter) : all;
  }, [index.data, typeFilter]);

  const typeOptions = React.useMemo(() => {
    if (!index.data) return [];
    const counts = new Map<string, number>();
    for (const item of index.data.items) {
      counts.set(item.resourceType, (counts.get(item.resourceType) ?? 0) + 1);
    }
    return [
      { value: "__all__", label: `All (${index.data.items.length})` },
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([value, count]) => ({ value, label: `${value} (${count})` })),
    ];
  }, [index.data]);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "__all__") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  return (
    <div className="shell py-8 sm:py-16">
      <SectionHeader
        as="h1"
        eyebrow="Explore"
        title="Every published resource, in one index."
        description={
          <>
            {index.data
              ? `${index.data.items.length} items across ${CATALOGUE_CATEGORIES.length} categories. Each one ships its source, a demo and a design fingerprint.`
              : "Loading the registry index…"}
          </>
        }
      />

      {typeOptions.length > 1 ? (
        <div className="mt-6 sm:mt-10">
          <SegmentedControl
            label="Filter by resource type"
            value={typeFilter ?? "__all__"}
            onValueChange={(value) => update("type", value)}
            options={typeOptions}
          />
        </div>
      ) : null}

      <div className="mt-5 sm:mt-8 flex items-center justify-between gap-3 border-t border-line pt-3.5 sm:pt-4">
        <p className="eyebrow text-[10px] sm:text-[11px]">
          {items.length} {items.length === 1 ? "result" : "results"}
          {typeFilter ? ` · ${typeFilter}` : ""}
        </p>
        <SegmentedControl
          label="View"
          hideLabel
          value={view}
          onValueChange={(value) => update("view", value)}
          options={[
            { value: "grid", label: "Grid" },
            { value: "list", label: "Index" },
          ]}
        />
      </div>

      {index.isLoading ? (
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, position) => (
            <Skeleton key={position} lines={5} />
          ))}
        </div>
      ) : index.error ? (
        <EmptyState
          className="mt-8"
          eyebrow="Unavailable"
          title="The registry index could not be loaded."
          description={index.error.message}
        />
      ) : items.length === 0 ? (
        <EmptyState
          className="mt-8"
          eyebrow="No results"
          title="Nothing matches that filter."
          description="The registry has no published item of this type yet. Clear the filter to see everything."
          action={
            <Button variant="outline" onClick={() => update("type", null)}>
              Clear the filter
            </Button>
          }
        />
      ) : view === "list" ? (
        <ul className="mt-6 sm:mt-8">
          {items.map((item) => (
            <ResourceRow key={item.name} item={item} />
          ))}
        </ul>
      ) : (
        <div className="catalogue-grid mt-6 sm:mt-8">
          {items.map((item, position) => (
            <ScrollReveal key={item.name} delayMs={Math.min(position * 20, 250)}>
              <ResourceTile item={item} index={position + 1} withPreview />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
