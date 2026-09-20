import type { BuiltRegistryFile, BuiltRegistryItem, RegistryFileTarget } from "@openui/types";
import { explainUnsafePath, slugify } from "@openui/utils";

import { mergeNpmDependencies, type MergedDependencies } from "./resolve.js";

/**
 * Install planning.
 *
 * Nothing here touches the filesystem. The planner takes the resolved closure,
 * the project's aliases and a snapshot of the files that already exist, and
 * returns exactly what *would* happen. That separation is what makes
 * "never silently overwrite the user's files" testable.
 */

export interface AliasMap {
  components: string;
  lib: string;
  hooks?: string;
  styles?: string;
  ai?: string;
  app?: string;
  config?: string;
}

export const DEFAULT_ALIASES: Required<AliasMap> = {
  components: "src/components",
  lib: "src/lib",
  hooks: "src/hooks",
  styles: "src/styles",
  ai: ".openui",
  app: "src/app",
  config: ".",
};

const DEFAULT_TARGET_FOR_ITEM_TYPE: Record<string, RegistryFileTarget> = {
  "registry:component": "components",
  "registry:text": "components",
  "registry:motion": "components",
  "registry:interaction": "components",
  "registry:background": "components",
  "registry:layout": "components",
  "registry:section": "components",
  "registry:block": "components",
  "registry:pattern": "components",
  "registry:template": "app",
  "registry:theme": "styles",
  "registry:ai": "ai",
  "registry:hook": "hooks",
  "registry:utility": "lib",
  "registry:config": "config",
};

export type FileStatus = "new" | "identical" | "modified";

export interface PlannedFile {
  item: string;
  /** Path inside the item, as published. */
  source: string;
  /** Project-relative destination, computed from the aliases. */
  destination: string;
  status: FileStatus;
  content: string;
  contentHash: string;
  sizeBytes: number;
}

export interface PlannedPackage {
  name: string;
  range: string;
  requiredBy: string[];
}

export interface InstallPlan {
  files: PlannedFile[];
  packages: PlannedPackage[];
  dependencies: MergedDependencies;
  /** Stylesheets the consumer must import once (theme items). */
  requiredStylesheets: string[];
  /** Design systems the installed resources reference. */
  designSystems: string[];
  warnings: string[];
  /** Files that exist with different content and are protected by default. */
  protectedFiles: PlannedFile[];
}

export interface PlanOptions {
  aliases?: Partial<AliasMap>;
  /** Existing project files: destination path → current content. */
  existing?: Map<string, string>;
  /**
   * With `overwrite: false` (the default) a modified destination is reported in
   * `protectedFiles` and left untouched unless the caller passes `--overwrite`.
   */
  overwrite?: boolean;
}

function normalizeRelativeFolder(alias: string): string {
  return alias.replace(/^\.\//, "").replace(/\/+$/, "");
}

/**
 * Resolves the destination of one published file.
 *
 * The alias is chosen from the file's `target`, falling back to a default for
 * the item type. The file's own path is appended to that alias folder, so a
 * theme shipping `openui.css` lands in `src/styles/openui.css` and a component
 * shipping `magnetic-button.tsx` lands in `src/components/magnetic-button.tsx`.
 * Nested paths (rare, used by blocks) are preserved under the alias folder.
 */
export function destinationFor(
  item: BuiltRegistryItem,
  file: BuiltRegistryFile,
  aliases: Required<AliasMap>,
): string {
  const target = file.target ?? DEFAULT_TARGET_FOR_ITEM_TYPE[item.type] ?? "components";
  const folder = normalizeRelativeFolder(aliases[target] ?? DEFAULT_ALIASES[target]);
  const clean = file.path.replace(/^\.\//, "");
  const reason = explainUnsafePath(clean);
  if (reason) {
    throw new Error(`Unsafe registry path "${file.path}": ${reason}`);
  }
  return folder.length > 0 && folder !== "." ? `${folder}/${clean}` : clean;
}

export function buildInstallPlan(
  items: readonly BuiltRegistryItem[],
  options: PlanOptions = {},
): InstallPlan {
  const aliases: Required<AliasMap> = { ...DEFAULT_ALIASES, ...options.aliases };
  const existing = options.existing ?? new Map<string, string>();
  const warnings: string[] = [];

  const files: PlannedFile[] = [];
  const protectedFiles: PlannedFile[] = [];
  const destinations = new Map<string, string>();

  for (const item of items) {
    for (const file of item.files) {
      const destination = destinationFor(item, file, aliases);

      const owner = destinations.get(destination);
      if (owner) {
        warnings.push(
          `"${item.name}" writes ${destination}, which "${owner}" also provides. The last item in the install order wins.`,
        );
      }
      destinations.set(destination, item.name);

      const current = existing.get(destination);
      const status: FileStatus =
        current === undefined ? "new" : current === file.content ? "identical" : "modified";

      const planned: PlannedFile = {
        item: item.name,
        source: file.path,
        destination,
        status,
        content: file.content,
        contentHash: file.contentHash,
        sizeBytes: file.sizeBytes,
      };

      if (status === "modified" && options.overwrite !== true) {
        protectedFiles.push(planned);
        continue;
      }
      files.push(planned);
    }
  }

  // Report duplicate destinations once, not per file.
  const duplicateWarnings = new Set(warnings.filter((warning) => warning.includes("also provides")));

  const dependencies = mergeNpmDependencies(items);
  for (const conflict of dependencies.conflicts) {
    warnings.push(
      `"${conflict.name}" is required at incompatible ranges (${conflict.ranges.join(", ")}). Resolve before installing.`,
    );
  }

  const packages: PlannedPackage[] = [...dependencies.resolved.entries()].map(([name, range]) => ({
    name,
    range,
    requiredBy: items
      .filter((item) => item.dependencies.some((specifier) => specifier === name || specifier.startsWith(`${name}@`)))
      .map((item) => item.name),
  }));

  const requiredStylesheets = files
    .filter((file) => file.destination.endsWith(".css"))
    .map((file) => file.destination);

  const designSystems = [
    ...new Set(items.map((item) => item.designSystem).filter((value): value is string => Boolean(value))),
  ];

  if (items.some((item) => item.designRules)) {
    warnings.push(
      "Some resources ship a design.md. Install it with `uniquefingerprint design pull` so AI tools follow the same rules.",
    );
  }

  return {
    files,
    packages,
    dependencies,
    requiredStylesheets,
    designSystems,
    warnings: [...duplicateWarnings, ...warnings.filter((warning) => !duplicateWarnings.has(warning))],
    protectedFiles,
  };
}

/** Suggested import alias for a component file, e.g. `@/components/button`. */
export function importPathFor(destination: string, aliasPrefix = "@/src"): string {
  return `${aliasPrefix}/${destination.replace(/^src\//, "")}`;
}

/** Stable id used in the `.openui/manifest.json` written after an install. */
export function manifestEntryName(item: BuiltRegistryItem): string {
  return slugify(item.name);
}
