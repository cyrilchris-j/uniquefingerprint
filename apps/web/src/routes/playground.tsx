import * as React from "react";
import { Link, useSearchParams } from "react-router";

import type { BuiltRegistryItem } from "@openui/types";
import {
  Badge,
  Button,
  EmptyState,
  SegmentedControl,
  Skeleton,
} from "@openui/ui";

import { SectionHeader } from "../components/SectionHeader.js";
import { Sandbox, SandboxSkeleton } from "../features/playground/Sandbox.js";
import { buildSandboxFiles } from "../features/playground/files.js";
import { useRegistryIndex, useRegistryItem } from "../features/resources/use-catalogue.js";
import { categorySegmentFor } from "../components/ResourceTile.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";
import { ADVANCED_RESOURCES, getAdvancedItemBySlug } from "../advanced/index.js";

/**
 * The playground.
 *
 * Two panes with distinct jobs, and the distinction is the point:
 *
 *  - **Sandpack** answers "what does this do?" It runs the resource in an
 *    isolated sandbox, so a broken or hostile contribution cannot affect this
 *    page. Nothing is edited here.
 *  - **Monaco** answers "what would this look like if I changed it?" The editor
 *    holds a *copy* of the source. Nothing typed here is written anywhere —
 *    which is stated on the page, because a code editor that silently discards
 *    work is a bad surprise.
 *
 * The editor is intentionally *not* wired to the sandbox. A live two-way binding
 * would mean re-bundling on every keystroke, and the bundle is where the latency
 * is; composing the edited source into Sandpack is available as an explicit
 * action instead.
 */
export default function PlaygroundPage(): React.JSX.Element {
  const [params, setParams] = useSearchParams();
  const index = useRegistryIndex();
  const [ecosystem, setEcosystem] = React.useState<"all" | "core" | "advanced">("all");

  const options = React.useMemo(() => {
    const core = (index.data?.items ?? [])
      .filter((item) => item.type !== "registry:ai")
      .map((item) => ({
        name: item.name,
        title: item.title,
        category: item.category,
        isAdvanced: false,
      }));

    const advanced = ADVANCED_RESOURCES.map((item) => ({
      name: item.slug,
      title: item.title,
      category: item.category,
      isAdvanced: true,
    }));

    if (ecosystem === "core") return core;
    if (ecosystem === "advanced") return advanced;
    return [...advanced, ...core];
  }, [index.data, ecosystem]);

  const advancedQuery = params.get("advanced");
  const selected = params.get("item") ?? (advancedQuery ? advancedQuery : options[0]?.name ?? "");
  const advItem = React.useMemo(() => getAdvancedItemBySlug(selected), [selected]);
  const coreItem = useRegistryItem(advItem ? "" : selected);

  const itemData: BuiltRegistryItem | undefined = React.useMemo(() => {
    if (advItem) {
      return {
        name: advItem.slug,
        type: "registry:component",
        title: advItem.title,
        description: advItem.description,
        category: advItem.category,
        dependencies: advItem.dependencies,
        registryDependencies: ["cn"],
        files: [
          {
            path: `${advItem.slug}.tsx`,
            type: "registry:component",
            content: advItem.sourceCode,
          },
          {
            path: "demo.tsx",
            type: "registry:component",
            content: `import React from "react";
import { ${advItem.title.replace(/[^a-zA-Z0-9]/g, "")} } from "./${advItem.slug}";

export default function Demo() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "#fcfbf7" }}>
      <div style={{ width: "100%", maxWidth: "600px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>${advItem.title}</h2>
        <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1.5rem" }}>${advItem.description}</p>
        <${advItem.title.replace(/[^a-zA-Z0-9]/g, "")} />
      </div>
    </div>
  );
}`,
          },
        ],
        meta: {
          dna: {
            genre: "editorial",
            macrostructure: "asymmetric",
            density: "medium",
            shapeLanguage: "sharp",
            motionLanguage: "expressive",
          },
        },
      } as unknown as BuiltRegistryItem;
    }
    return coreItem.data;
  }, [advItem, coreItem.data]);

  useDocumentTitle(itemData ? `${itemData.title} — Playground — UniqueFingerprint` : "Playground — UniqueFingerprint");

  const sandboxFiles = React.useMemo(() => {
    if (!itemData) return null;
    return buildSandboxFiles(itemData);
  }, [itemData]);

  return (
    <div className="shell py-16">
      <SectionHeader
        as="h1"
        eyebrow="Playground"
        title="Interactive Sandbox."
        description="The preview runs inside a sandboxed iframe with isolated rendering and live interaction."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
        {/* Resource picker */}
        <aside aria-label="Choose a resource">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Resources</p>
            <span className="font-mono text-[10px] text-graphite">{options.length}</span>
          </div>

          <div className="mt-2 mb-3">
            <SegmentedControl
              label="Ecosystem"
              value={ecosystem}
              onValueChange={(val) => setEcosystem(val as typeof ecosystem)}
              options={[
                { value: "all", label: "All" },
                { value: "core", label: "Core" },
                { value: "advanced", label: "Advanced" },
              ]}
            />
          </div>

          <div className="mt-3 max-h-[32rem] overflow-y-auto border-t border-line">
            {index.isLoading ? (
              <Skeleton lines={8} className="pt-4" />
            ) : (
              <ul>
                {options.map((option) => (
                  <li key={option.name} className="border-b border-line">
                    <button
                      type="button"
                      aria-current={option.name === selected ? "true" : undefined}
                      onClick={() => setParams({ item: option.name }, { replace: true })}
                      className={[
                        "flex w-full flex-col items-start gap-0.5 py-2.5 text-left transition-colors duration-fast",
                        option.name === selected ? "text-ink" : "text-graphite hover:text-ink",
                      ].join(" ")}
                    >
                      <span className="text-[0.85rem]">{option.title}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/70">
                        {option.category} {option.isAdvanced ? "· Adv" : ""}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Work surface */}
        <div>
          {index.isLoading || (!advItem && coreItem.isLoading) ? (
            <SandboxSkeleton />
          ) : !advItem && coreItem.error ? (
            <EmptyState
              eyebrow="Unavailable"
              title="That resource could not be loaded."
              description={coreItem.error.message}
            />
          ) : !itemData ? (
            <EmptyState
              eyebrow="Nothing selected"
              title="Choose a resource from the index."
              description="Published resources with a demo run here in an isolated sandbox."
            />
          ) : (
            <PlaygroundSurface
              item={itemData}
              sandboxFiles={sandboxFiles}
            />
          )}
        </div>
      </div>

      <nav aria-label="Browse by category" className="mt-20 border-t border-line pt-6">
        <p className="eyebrow mb-4">Browse</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {CATALOGUE_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                to={`/${category.slug}`}
                className="text-[0.9rem] text-graphite transition-colors duration-fast hover:text-ink"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

interface SurfaceProps {
  item: BuiltRegistryItem;
  sandboxFiles: Record<string, string> | null;
}

function PlaygroundSurface({
  item,
  sandboxFiles,
}: SurfaceProps): React.JSX.Element {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <div>
          <h2 className="font-display text-step-2 leading-tight tracking-tight">{item.title}</h2>
          <p className="mt-1 flex flex-wrap items-center gap-2">
            <Link
              to={`/${categorySegmentFor(item.category)}/${item.name}`}
              className="eyebrow transition-colors hover:text-ink"
            >
              {item.name}
            </Link>
            <Badge tone="ink">{item.type.replace("registry:", "")}</Badge>
            {item.license ? <Badge tone="moss">{item.license}</Badge> : null}
          </p>
        </div>
      </div>

      {/* Visual Engine Controls Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-line/30 py-3 bg-surface/30 px-3 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Install:</span>
          <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-paper border border-line/30 text-ink">
            pnpm dlx uniquefingerprint add {item.name}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard.writeText(`pnpm dlx uniquefingerprint add ${item.name}`)}
            className="h-6 px-2 text-[10px] font-mono uppercase tracking-wider"
          >
            Copy
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-graphite hidden sm:inline">Engine:</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border border-line/30 bg-paper text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
            Active
          </span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-line/30 bg-paper text-graphite">
            {item.meta?.dna?.motionLanguage ?? "subtle motion"}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <React.Suspense fallback={<SandboxSkeleton />}>
          {sandboxFiles ? (
            <Sandbox item={item} files={sandboxFiles} view="preview" />
          ) : (
            <SandboxSkeleton />
          )}
        </React.Suspense>
      </div>
    </>
  );
}
