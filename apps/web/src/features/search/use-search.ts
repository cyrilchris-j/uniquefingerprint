import * as React from "react";

import { parseSearchParams, searchInMemory, serializeSearchParams } from "@openui/search";
import type { DesignDna, RegistryIndexEntry, SearchResult } from "@openui/types";

import { useDebounced } from "../../hooks/use-async.js";
import * as api from "../../lib/api.js";
import { useAuth } from "../../lib/auth.js";
import { useRegistryIndex } from "../resources/use-catalogue.js";

/**
 * Search.
 *
 * Two strategies, chosen by what is available, and the choice is explicit in the
 * returned `strategy` so the UI can say which one ran:
 *
 *  1. **API** — PostgreSQL full-text with a trigram fallback. This is the real
 *     one: it ranks, it paginates, and it has facet counts from the database.
 *  2. **Local** — the shared ranking function in `@openui/search`, evaluated over
 *     the registry index in the browser.
 *
 * The fallback exists for a concrete reason: the catalogue must be searchable
 * before a database is provisioned, and a deployment with no API should degrade
 * to prefix matching over the published index rather than to an error page. It
 * uses the *same* ranking module as the server-side in-memory path, so results
 * are consistent rather than merely plausible.
 */

export interface UseSearchOptions {
  /** The query string of the current URL, e.g. `?q=hero&type=section`. */
  search: string;
}

export interface SearchState {
  result: SearchResult | undefined;
  isLoading: boolean;
  error: Error | undefined;
  /** Which path produced the result. */
  strategy: SearchResult["strategy"] | "local" | undefined;
  reload: () => void;
}

export function useSearch({ search }: UseSearchOptions): SearchState {
  const { token } = useAuth();
  const index = useRegistryIndex();
  const params = React.useMemo(() => parseSearchParams(search), [search]);

  // Debouncing the *serialised* query rather than the raw string means a filter
  // change is debounced too, which keeps a rapid series of checkbox clicks from
  // firing a request each.
  const serialised = React.useMemo(() => serializeSearchParams(params).toString(), [params]);
  const debounced = useDebounced(serialised, 200);

  const [result, setResult] = React.useState<SearchResult | undefined>(undefined);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [isLoading, setLoading] = React.useState(true);
  const [nonce, setNonce] = React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);

    const query = new URLSearchParams(debounced);

    const runApi = async (): Promise<SearchResult> => {
      const flat: api.SearchParams = {
        q: query.get("q") ?? undefined,
        sort: query.get("sort") ?? undefined,
        page: numberOrUndefined(query.get("page")),
        perPage: numberOrUndefined(query.get("perPage")),
      };
      // Repeated keys are joined, which is what the API's parser expects.
      for (const key of [
        "type",
        "category",
        "tag",
        "designSystem",
        "license",
        "difficulty",
        "genre",
        "density",
        "shape",
        "motion",
        "typography",
      ] as const) {
        const values = query.getAll(key);
        if (values.length > 0) flat[key] = values;
      }
      return api.searchResources(flat, token);
    };

    const runLocal = async (): Promise<SearchResult> => {
      const { indexEntryToSummary, loadIndex: readIndex } = await import("../../lib/registry.js");
      const { ADVANCED_RESOURCES } = await import("../../advanced/index.js");
      const indexValue = index.data ?? (await readIndex());
      const advancedSlugs = new Set(ADVANCED_RESOURCES.map((r) => r.slug.toLowerCase()));
      const coreSummaries = indexValue.items
        .filter((item: import("@openui/types").RegistryIndexEntry) => !advancedSlugs.has(item.name.toLowerCase()))
        .map(indexEntryToSummary);

      const advancedSummaries: import("@openui/types").ResourceSummary[] = ADVANCED_RESOURCES.map((adv) => ({
        id: `advanced/${adv.slug}`,
        slug: adv.slug,
        name: adv.slug,
        title: adv.title,
        description: adv.description,
        resourceType: (adv.category === "text-animations"
          ? "text"
          : adv.category === "motion-design"
            ? "motion"
            : adv.category === "backgrounds"
              ? "background"
              : adv.category === "heroes"
                ? "section"
                : adv.category === "landing-pages"
                  ? "template"
                  : adv.category === "css-layouts"
                    ? "layout"
                    : "component") as import("@openui/types").ResourceType,
        status: "published" as const,
        categorySlug: adv.category,
        categoryName: adv.category,
        designSystemSlug: null,
        licenseSpdx: "MIT",
        author: null,
        latestVersion: "1.0.0",
        tags: [...adv.tags, adv.technology, "advanced"],
        subcategory: adv.subcategory,
        fingerprint: {
          visualFamily: adv.fingerprint.visualFamily,
          motionProfile: adv.fingerprint.motionProfile,
          interactionProfile: adv.fingerprint.interactionProfile,
          performanceTier: adv.fingerprint.performanceTier,
        },
        design: {
          genre: "editorial",
          macrostructure: "fluid",
          density: "medium",
          shapeLanguage: "sharp",
          motionLanguage: "expressive",
          typographyStyle: "grotesk",
          colorStrategy: "accent-only",
        },
        dependencies: adv.dependencies,
        registryDependencies: [],
        downloadCount: 0,
        viewCount: 0,
        favoriteCount: 0,
        difficulty: "advanced",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      }));

      return searchInMemory([...coreSummaries, ...advancedSummaries], params);
    };

    const execute = async () => {
      try {
        // Prefer the API; fall back only when it is unreachable, not when it
        // reports a real error the user should see.
        const value = await runApi().catch((cause: unknown) => {
          if (cause instanceof api.ApiError && cause.status >= 400 && cause.status < 500) {
            throw cause;
          }
          return runLocal();
        });
        if (!active) return;
        setResult(value);
        setError(undefined);
      } catch (cause) {
        if (!active) return;
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(cause instanceof Error ? cause : new Error(String(cause)));
      } finally {
        if (active) setLoading(false);
      }
    };

    void execute();
    return () => {
      active = false;
      controller.abort();
    };
  }, [debounced, token, nonce, index.data, params]);

  return {
    result,
    isLoading,
    error,
    strategy: result?.strategy,
    reload: () => setNonce((value) => value + 1),
  };
}

function numberOrUndefined(value: string | null): number | undefined {
  if (value === null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export type FacetKey =
  | "type"
  | "category"
  | "designSystem"
  | "difficulty"
  | "genre"
  | "density"
  | "shape"
  | "motion";

/**
 * The three facet keys that are not also DNA keys.
 *
 * `shape` and `motion` are the *URL* names; the design DNA calls the same
 * dimensions `shapeLanguage` and `motionLanguage`. That mapping lives here rather
 * than in the DNA type, because the URL is a user-facing name and the DNA is a
 * schema — they are allowed to differ, and renaming one should not break the
 * other.
 */
const DNA_KEY_FOR: Partial<Record<FacetKey, keyof DesignDna & string>> = {
  shape: "shapeLanguage",
  motion: "motionLanguage",
};

/** Grouped values for the filter sidebar, derived from the index. */
export function facetValues(
  items: readonly RegistryIndexEntry[],
  key: FacetKey,
): Array<{ value: string; count: number }> {
  const counts = new Map<string, number>();

  for (const item of items) {
    let values: string[];

    switch (key) {
      case "type":
        values = [item.resourceType];
        break;
      case "category":
        values = [item.category];
        break;
      case "difficulty":
        values = item.difficulty ? [item.difficulty] : [];
        break;
      case "designSystem":
        values = item.designSystem ? [item.designSystem] : [];
        break;
      default: {
        const dnaKey = (DNA_KEY_FOR[key] ?? key) as keyof RegistryIndexEntry["dna"] & string;
        const value = item.dna?.[dnaKey];
        values = value ? [String(value)] : [];
      }
    }

    for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}
