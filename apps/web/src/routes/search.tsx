import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";
import { useSearchParams } from "react-router";

import { Button, EmptyState, SegmentedControl, Skeleton } from "@openui/ui";

import { ResourceRow, ResourceTile } from "../components/ResourceTile.js";
import { SectionHeader } from "../components/SectionHeader.js";
import { useRegistryIndex } from "../features/resources/use-catalogue.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { ScrollReveal } from "../visual-engine/index.js";

/**
 * Search.
 *
 * Direct in-memory index search, operating over the complete registry index
 * just like Explore. Fast, responsive, with zero latency and zero broken API
 * dependencies.
 */
export default function SearchPage(): React.JSX.Element {
  const index = useRegistryIndex();
  const [params, setParams] = useSearchParams();

  const query = params.get("q") ?? "";
  const [draft, setDraft] = React.useState(query);
  const view = params.get("view") === "list" ? "list" : "grid";
  const typeFilter = params.get("type");

  useDocumentTitle(query ? `Search: ${query} — UniqueFingerprint` : "Search — UniqueFingerprint Design Registry");

  // Keep input in sync with URL
  React.useEffect(() => {
    setDraft(query);
  }, [query]);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "" || value === "__all__") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  const filteredItems = React.useMemo(() => {
    if (!index.data) return [];
    let list = index.data.items;

    if (typeFilter && typeFilter !== "__all__") {
      list = list.filter((item) => item.resourceType === typeFilter);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(q);
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = (item.description ?? "").toLowerCase().includes(q);
        const catMatch = (item.category ?? "").toLowerCase().includes(q);
        const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(q));
        return nameMatch || titleMatch || descMatch || catMatch || tagsMatch;
      });
    }

    return list;
  }, [index.data, typeFilter, query]);

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

  const quickTags = ["button", "hero", "card", "modal", "animation", "grid", "nav", "typography", "badge"];

  return (
    <div className="shell py-8 sm:py-16">
      <SectionHeader
        as="h1"
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search the registry"}
        description="Search across names, descriptions, categories and tags directly in the registry index."
      />

      {/* Search Input Bar */}
      <form
        role="search"
        className="mt-6 sm:mt-10 flex items-center gap-3 border-b border-line pb-3 sm:pb-4"
        onSubmit={(event) => {
          event.preventDefault();
          update("q", draft.trim());
        }}
      >
        <SearchIcon aria-hidden className="h-5 w-5 text-graphite shrink-0" />
        <label htmlFor="search-input" className="sr-only">
          Search the registry
        </label>
        <input
          id="search-input"
          type="search"
          value={draft}
          onChange={(event) => {
            const nextVal = event.target.value;
            setDraft(nextVal);
            update("q", nextVal);
          }}
          placeholder="Type to search (e.g. magnetic button, hero, card, motion)…"
          className="h-10 sm:h-12 w-full bg-transparent text-base sm:text-step-1 text-ink placeholder:text-graphite/60 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setDraft("");
              update("q", null);
            }}
            className="text-graphite hover:text-ink text-xs font-mono uppercase tracking-wider px-2 py-1 shrink-0 flex items-center gap-1 border border-line"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        ) : null}
      </form>

      {/* Quick Filter Tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Quick tags:</span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setDraft(tag);
              update("q", tag);
            }}
            className={`font-mono text-[10.5px] px-2.5 py-0.5 rounded-full border transition-colors ${
              query.toLowerCase() === tag
                ? "border-ink bg-ink text-paper"
                : "border-line/60 hover:border-ink/60 bg-surface/40 hover:bg-surface text-graphite hover:text-ink"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Type filter segmented control */}
      {typeOptions.length > 1 ? (
        <div className="mt-6 sm:mt-8">
          <SegmentedControl
            label="Filter by resource type"
            value={typeFilter ?? "__all__"}
            onValueChange={(value) => update("type", value)}
            options={typeOptions}
          />
        </div>
      ) : null}

      {/* Status bar: count & view toggle */}
      <div className="mt-5 sm:mt-8 flex items-center justify-between gap-3 border-t border-line pt-3.5 sm:pt-4">
        <p className="eyebrow text-[10px] sm:text-[11px]">
          {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
          {query ? ` for “${query}”` : ""}
          {typeFilter && typeFilter !== "__all__" ? ` · ${typeFilter}` : ""}
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

      {/* Results presentation */}
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
      ) : filteredItems.length === 0 ? (
        <EmptyState
          className="mt-8"
          eyebrow="No results"
          title="Nothing matches your search."
          description="Try a broader search term or clear the filters to explore all resources."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setDraft("");
                update("q", null);
                update("type", null);
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : view === "list" ? (
        <ul className="mt-6 sm:mt-8">
          {filteredItems.map((item) => (
            <ResourceRow key={item.name} item={item} />
          ))}
        </ul>
      ) : (
        <div className="catalogue-grid mt-6 sm:mt-8">
          {filteredItems.map((item, position) => (
            <ScrollReveal key={item.name} delayMs={Math.min(position * 20, 250)}>
              <ResourceTile item={item} index={position + 1} withPreview />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
