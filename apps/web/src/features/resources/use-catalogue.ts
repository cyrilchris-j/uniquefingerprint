import * as React from "react";

import type { BuiltRegistryItem, RegistryIndex, RegistryIndexEntry } from "@openui/types";

import { useAsync, type AsyncState } from "../../hooks/use-async.js";
import { itemsInCategory, loadIndex, loadItem } from "../../lib/registry.js";

/**
 * Catalogue data hooks.
 *
 * Everything here reads the built registry artifacts through `lib/registry`,
 * which de-duplicates requests at the module level. A page that renders forty
 * tiles therefore issues one request, and navigating from the catalogue to a
 * detail page reads the item artifact — a second request whose content the
 * catalogue never needed.
 */

/** The whole index. One request for the entire application session. */
export function useRegistryIndex(): AsyncState<RegistryIndex> {
  return useAsync((signal) => loadIndex().then(assertNotAborted(signal)), []);
}

/** Items in one catalogue category. */
export function useCategoryItems(categorySlug: string): {
  state: AsyncState<RegistryIndex>;
  items: readonly RegistryIndexEntry[];
} {
  const state = useRegistryIndex();
  const items = React.useMemo(
    () => (state.data ? itemsInCategory(state.data, categorySlug) : []),
    [state.data, categorySlug],
  );
  return { state, items };
}

/** One resource's built artifact, including inlined file source. */
export function useRegistryItem(name: string, namespace = "default"): AsyncState<BuiltRegistryItem> {
  return useAsync(
    (signal) => loadItem(name, namespace).then(assertNotAborted(signal)),
    [name, namespace],
  );
}

/** Looks an item's index entry up without fetching its artifact. */
export function useIndexEntry(name: string): {
  entry: RegistryIndexEntry | undefined;
  state: AsyncState<RegistryIndex>;
} {
  const state = useRegistryIndex();
  const entry = React.useMemo(
    () => state.data?.items.find((item) => item.name === name),
    [state.data, name],
  );
  return { entry, state };
}

/** Items strictly within the same category as `entry`, ranked by tag overlap. */
export function useRelatedItems(entry: RegistryIndexEntry | undefined): readonly RegistryIndexEntry[] {
  const state = useRegistryIndex();

  return React.useMemo(() => {
    if (!state.data || !entry) return [];
    const tags = new Set(entry.tags);

    // Strictly enforce matching category (e.g. components only suggest components, text suggests text, motion suggests motion)
    const sameCategoryCandidates = state.data.items.filter(
      (candidate) => candidate.name !== entry.name && candidate.category === entry.category,
    );

    return sameCategoryCandidates
      .map((candidate) => ({
        candidate,
        overlap: candidate.tags.filter((tag) => tags.has(tag)).length,
      }))
      .sort((a, b) => b.overlap - a.overlap || a.candidate.name.localeCompare(b.candidate.name))
      .slice(0, 3)
      .map((scored) => scored.candidate);
  }, [state.data, entry]);
}

/**
 * A resolved fetch is discarded when the request has already been superseded.
 * `useAsync` handles the common case; this covers the window between a promise
 * settling and the hook's own guard running.
 */
function assertNotAborted(signal: AbortSignal) {
  return <T,>(value: T): T => {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return value;
  };
}
