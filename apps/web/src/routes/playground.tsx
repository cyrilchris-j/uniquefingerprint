import { ArrowUpRight } from "lucide-react";
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

import { Sandbox, SandboxSkeleton } from "../features/playground/Sandbox.js";
import { buildSandboxFiles } from "../features/playground/files.js";
import { useRegistryIndex, useRegistryItem } from "../features/resources/use-catalogue.js";
import { categorySegmentFor } from "../components/ResourceTile.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
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
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <${advItem.title.replace(/[^a-zA-Z0-9]/g, "")} />
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
    <div className="shell pt-6 sm:pt-10 pb-12">
      <div className="grid gap-8 lg:grid-cols-[18.5rem_minmax(0,1fr)] xl:grid-cols-[20.5rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
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

          <div className="mt-3 max-h-[36rem] lg:max-h-[calc(100vh-14rem)] overflow-y-auto border-t border-line divide-y divide-line/25 pr-1">
            {index.isLoading ? (
              <Skeleton lines={8} className="pt-4" />
            ) : (
              <ul>
                {options.map((option) => (
                  <li key={option.name}>
                    <button
                      type="button"
                      aria-current={option.name === selected ? "true" : undefined}
                      onClick={() => setParams({ item: option.name }, { replace: true })}
                      className={[
                        "flex w-full items-center justify-between gap-3 py-2.5 px-2 rounded-md text-left transition-all duration-fast cursor-pointer",
                        option.name === selected
                          ? "bg-surface/90 text-ink font-medium shadow-2xs"
                          : "text-graphite hover:text-ink hover:bg-surface/40",
                      ].join(" ")}
                    >
                      <div className="flex flex-col min-w-0 pr-1">
                        <span className="text-[0.88rem] leading-snug">{option.title}</span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-graphite/70 mt-0.5">
                          {option.category} {option.isAdvanced ? "· Adv" : ""}
                        </span>
                      </div>
                      {option.name === selected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-moss shrink-0" />
                      )}
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
  const [copied, setCopied] = React.useState(false);

  const adv = getAdvancedItemBySlug(item.name);
  const resourceHref = adv
    ? `/advanced/${adv.category}/${adv.slug}`
    : `/${categorySegmentFor(item.category)}/${item.name}`;

  const handleCopy = () => {
    void navigator.clipboard.writeText(`npx uniquefingerprint add ${item.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-step-2 leading-tight tracking-tight">{item.title}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-2">
            <Link
              to={resourceHref}
              className="eyebrow transition-colors hover:text-ink"
            >
              {item.name}
            </Link>
            <Badge tone="ink">{item.type.replace("registry:", "")}</Badge>
            {item.license ? <Badge tone="moss">{item.license}</Badge> : null}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="h-8 px-3.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 hover:border-oxide hover:text-oxide transition-colors"
        >
          <Link to={resourceHref} title={`Open dedicated page for ${item.title}`}>
            <span>Open</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Visual Engine Controls Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-line/30 py-3 bg-surface/30 px-3 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-graphite">Install:</span>
          <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-paper border border-line/30 text-ink">
            npx uniquefingerprint add {item.name}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 px-2 text-[10px] font-mono uppercase tracking-wider"
          >
            {copied ? "Copied" : "Copy"}
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
