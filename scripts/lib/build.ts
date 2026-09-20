import { relative } from "node:path";

import {
  REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE,
  type BuiltRegistryItem,
  type BuiltRegistryFile,
  type RegistryIndex,
  type RegistryIndexEntry,
  type RegistryItemFile,
  type RegistryValidationIssue,
} from "@openui/types";
import { loadRegistryItem, validateRegistry, type LoadedRegistryItem } from "@openui/registry-schema/node";

import { hashFiles, sha256Hex, sha256Integrity, toPosix } from "@openui/utils/node";

import { REGISTRY_BASE_URL, REGISTRY_VERSION, SITE_HOMEPAGE, DEFAULT_NAMESPACE } from "./paths.js";

/**
 * Registry build pipeline.
 *
 * ```text
 * registry source  →  schema validation  →  metadata normalisation
 *                  →  dependency resolution  →  item artifacts
 *                  →  index  →  search index  →  publish
 * ```
 *
 * This module implements the middle of that pipeline: it turns validated source
 * directories into immutable artifacts plus one index. It deliberately does the
 * minimum that a *published* artifact needs — the artifacts are the contract the
 * CLI and the website consume, so they carry fully inlined file content and an
 * integrity digest.
 */

export interface BuildRegistryOptions {
  registryRoot: string;
  baseUrl?: string;
  homepage?: string;
  version?: string;
  /** Fail on warnings as well as errors. Used by `release`. */
  strict?: boolean;
  /** Report missing previews as errors. Off during development. */
  requireScreenshot?: boolean;
  /** Called once per built item, for progress output. */
  onItem?: (item: BuiltRegistryItem, index: number, total: number) => void;
}

export interface BuiltArtifact {
  /** Path relative to the output directory, e.g. `magnetic-button.json`. */
  path: string;
  json: string;
}

export interface BuildRegistryResult {
  index: RegistryIndex;
  artifacts: BuiltArtifact[];
  items: BuiltRegistryItem[];
  issues: RegistryValidationIssue[];
  /** Keyed by registry item name. */
  namespaceOf: Map<string, string>;
}

/** The namespace is the first directory level under `registry/`. */
export function namespaceOf(item: LoadedRegistryItem, registryRoot: string): string {
  const relativePath = toPosix(relative(registryRoot, item.directory));
  const [namespace] = relativePath.split("/");
  return namespace || DEFAULT_NAMESPACE;
}

/** Artifact URL. The default namespace is served from the registry root. */
export function artifactUrl(name: string, namespace: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  return namespace === DEFAULT_NAMESPACE ? `${base}/${name}.json` : `${base}/${namespace}/${name}.json`;
}

/** Artifact path inside the output directory, mirroring the URL. */
export function artifactPath(name: string, namespace: string): string {
  return namespace === DEFAULT_NAMESPACE ? `${name}.json` : `${namespace}/${name}.json`;
}

function fileEntryFor(item: LoadedRegistryItem, path: string): RegistryItemFile {
  const declared = item.item.files.find((file) => file.path === path);
  if (declared) return declared;
  return { path, type: item.item.type };
}

export function toBuiltItem(
  item: LoadedRegistryItem,
  namespace: string,
  options: { baseUrl: string },
): BuiltRegistryItem {
  const files: BuiltRegistryFile[] = item.files.map((file) => ({
    ...fileEntryFor(item, file.path),
    content: file.content,
    contentHash: file.contentHash,
    sizeBytes: file.sizeBytes,
  }));

  // Include demo.tsx in the artifact so the website's Sandpack preview can use
  // it as the entry point (App.tsx). It is an auxiliary file — not installed by
  // the CLI — but the built artifact needs it so the browser sandbox can render
  // a real demo rather than a generated placeholder.
  if (item.demoSource) {
    files.push({
      path: "demo.tsx",
      type: item.item.type,
      content: item.demoSource,
      contentHash: sha256Hex(item.demoSource),
      sizeBytes: Buffer.byteLength(item.demoSource, "utf8"),
    });
  }

  return {
    ...item.item,
    $schema: "../schema/registry-item.json",
    files,
    url: artifactUrl(item.item.name, namespace, options.baseUrl),
    ...(item.designMarkdown ? { designRules: item.designMarkdown } : {}),
  };
}

/** Stable digest of an item's publishable content, published in the index. */
export function integrityOf(item: BuiltRegistryItem): string {
  return sha256Integrity(
    hashFiles(item.files.map((file) => ({ path: file.path, content: file.content }))),
  );
}

export function toIndexEntry(
  item: BuiltRegistryItem,
  namespace: string,
  options: { baseUrl: string },
): RegistryIndexEntry {
  return {
    name: item.name,
    namespace,
    type: item.type,
    title: item.title,
    description: item.description,
    category: item.category,
    resourceType: REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE[item.type],
    tags: item.tags ?? [],
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    url: artifactUrl(item.name, namespace, options.baseUrl),
    integrity: integrityOf(item),
    ...(item.author ? { author: item.author } : {}),
    ...(item.designSystem ? { designSystem: item.designSystem } : {}),
    ...(item.license ? { license: item.license } : {}),
    ...(item.meta?.difficulty ? { difficulty: item.meta.difficulty } : {}),
    ...(item.meta?.dna ? { dna: item.meta.dna } : {}),
    ...(item.meta?.subcategory ? { subcategory: item.meta.subcategory } : {}),
    ...(item.meta?.fingerprint ? { fingerprint: item.meta.fingerprint } : {}),
  };
}

/**
 * Validates the whole registry and builds every artifact.
 *
 * The validation step is not optional and not separate: an artifact that fails
 * schema validation is never written, which is what makes "published versions are
 * immutable" enforceable rather than aspirational.
 */
export async function buildRegistry(options: BuildRegistryOptions): Promise<BuildRegistryResult> {
  const baseUrl = options.baseUrl ?? REGISTRY_BASE_URL;
  const homepage = options.homepage ?? SITE_HOMEPAGE;
  const version = options.version ?? REGISTRY_VERSION;

  const validation = await validateRegistry({
    registryRoot: options.registryRoot,
    strict: options.strict ?? false,
    requireScreenshot: options.requireScreenshot ?? false,
  });

  const items: BuiltRegistryItem[] = [];
  const artifacts: BuiltArtifact[] = [];
  const entries: RegistryIndexEntry[] = [];
  const namespaceOfMap = new Map<string, string>();
  const namespaces = new Set<string>();

  validation.items.forEach((loaded, position) => {
    const namespace = namespaceOf(loaded, options.registryRoot);
    namespaces.add(namespace);
    namespaceOfMap.set(loaded.item.name, namespace);

    const built = toBuiltItem(loaded, namespace, { baseUrl });
    items.push(built);
    entries.push(toIndexEntry(built, namespace, { baseUrl }));

    const itemJson = JSON.stringify(built, null, 2);
    artifacts.push({ path: artifactPath(loaded.item.name, namespace), json: `${itemJson}\n` });
    options.onItem?.(built, position, validation.items.length);
  });

  const index: RegistryIndex = {
    $schema: "../schema/registry.json",
    name: "openui",
    homepage,
    version,
    generatedAt: new Date().toISOString(),
    namespaces: [...namespaces].sort(),
    items: entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)),
  };

  return { index, artifacts, items, issues: validation.issues, namespaceOf: namespaceOfMap };
}
