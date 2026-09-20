import {
  AUDIT_CATEGORIES,
  COLOR_STRATEGIES,
  DESIGN_GENRES,
  DENSITIES,
  DIFFICULTIES,
  MACROSTRUCTURES,
  MOTION_LANGUAGES,
  REGISTRY_FILE_TARGETS,
  REGISTRY_ITEM_TYPES,
  SHAPE_LANGUAGES,
  TYPOGRAPHY_STYLES,
  type BuiltRegistryItem,
  type RegistryItem,
  type RegistryIndex,
} from "@openui/types";
import { explainUnsafePath, isSafeRelativePath } from "@openui/utils";
import { z } from "zod";

import {
  ALLOWED_FILE_EXTENSIONS,
  DEPENDENCY_PATTERN,
  FORBIDDEN_DEPENDENCY_PREFIXES,
  LICENSE_ID_PATTERN,
  LIMITS,
  NAMESPACE_PATTERN,
  REGISTRY_ITEM_NAME_PATTERN,
  TAG_PATTERN,
  VERSION_PATTERN,
} from "./constants.js";

/**
 * Helper: build a Zod enum from a readonly tuple of string literals.
 * Zod's `z.enum` needs a mutable tuple, and every taxonomy in `@openui/types`
 * is declared `as const`.
 */
export function literalEnum<T extends string>(values: readonly T[]) {
  return z.enum(values as unknown as [T, ...T[]]);
}

export const registryItemTypeSchema = literalEnum(REGISTRY_ITEM_TYPES);
export const designGenreSchema = literalEnum(DESIGN_GENRES);
export const macrostructureSchema = literalEnum(MACROSTRUCTURES);
export const densitySchema = literalEnum(DENSITIES);
export const shapeLanguageSchema = literalEnum(SHAPE_LANGUAGES);
export const motionLanguageSchema = literalEnum(MOTION_LANGUAGES);
export const typographyStyleSchema = literalEnum(TYPOGRAPHY_STYLES);
export const colorStrategySchema = literalEnum(COLOR_STRATEGIES);
export const difficultySchema = literalEnum(DIFFICULTIES);
export const auditCategorySchema = literalEnum(AUDIT_CATEGORIES);

export const designDnaSchema = z.object({
  genre: designGenreSchema,
  macrostructure: macrostructureSchema,
  density: densitySchema,
  shapeLanguage: shapeLanguageSchema,
  motionLanguage: motionLanguageSchema,
  typographyStyle: typographyStyleSchema,
  colorStrategy: colorStrategySchema,
});

export const partialDesignDnaSchema = designDnaSchema.partial();

/** Registry item name: lowercase, hyphen separated, no leading/trailing hyphen. */
export const registryItemNameSchema = z
  .string()
  .min(1)
  .max(LIMITS.name)
  .regex(
    REGISTRY_ITEM_NAME_PATTERN,
    "Use lowercase letters, numbers and single hyphens (e.g. `magnetic-button`).",
  );

export const namespaceSchema = z.string().min(1).max(32).regex(NAMESPACE_PATTERN, "Invalid namespace.");

export const semverSchema = z.string().regex(VERSION_PATTERN, "Version must be semver, e.g. `1.2.0`.");

export const licenseIdSchema = z
  .string()
  .max(64)
  .regex(LICENSE_ID_PATTERN, "License must be an SPDX identifier such as `MIT` or `Apache-2.0`.");

export const dependencySchema = z.string().min(1).max(96).superRefine((value, context) => {
  const forbidden = FORBIDDEN_DEPENDENCY_PREFIXES.find((prefix) => value.startsWith(prefix));
  if (forbidden) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Dependencies must be published npm packages; "${forbidden}" specifiers are not allowed.`,
    });
    return;
  }
  if (!DEPENDENCY_PATTERN.test(value)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Dependency must be a valid npm package name with an optional version range.",
    });
  }
});

export const registryDependencySchema = z.string().min(1).max(128).superRefine((value, context) => {
  const segments = value.split("/");
  if (segments.length > 2) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Registry dependency must be `name` or `namespace/name`.",
    });
    return;
  }
  const name = segments[segments.length - 1] ?? "";
  if (!REGISTRY_ITEM_NAME_PATTERN.test(name)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid registry dependency name." });
  }
  if (segments.length === 2 && !NAMESPACE_PATTERN.test(segments[0]!)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid registry dependency namespace." });
  }
});

export const registryItemFileSchema = z.object({
  path: z.string().min(1).max(256),
  type: registryItemTypeSchema,
  target: literalEnum(REGISTRY_FILE_TARGETS).optional(),
});

export const registryItemAuthorSchema = z.object({
  name: z.string().min(1).max(80),
  url: z.string().url().max(200).optional(),
});

/** One behavioural fingerprint axis: a lowercase slug, e.g. `spring-follow`. */
const fingerprintAxisSchema = z
  .string()
  .min(1)
  .max(48)
  .regex(TAG_PATTERN, "Fingerprint values must be lowercase slugs, e.g. `spring-follow`.");

export const registryItemMetaSchema = z
  .object({
    dna: partialDesignDnaSchema.optional(),
    difficulty: difficultySchema.optional(),
    features: z.array(z.string().min(1).max(48)).max(16).optional(),
    peer: z.record(z.string(), z.string()).optional(),
    /** Subcategory slug within the category, e.g. `navigation`, `forms`. */
    subcategory: z
      .string()
      .min(1)
      .max(48)
      .regex(TAG_PATTERN, "Subcategory must be a lowercase slug, e.g. `navigation`.")
      .optional(),
    /** Behavioural fingerprint used by the uniqueness engine. */
    fingerprint: z
      .object({
        interactionModel: fingerprintAxisSchema.optional(),
        visualModel: fingerprintAxisSchema.optional(),
        motionModel: fingerprintAxisSchema.optional(),
        layoutModel: fingerprintAxisSchema.optional(),
        semanticPurpose: fingerprintAxisSchema.optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

/**
 * `registry.json` inside one registry item directory.
 *
 * Strict: unknown keys are rejected so typos cannot silently disable metadata
 * that the search index, facets and CLI depend on.
 */
/**
 * File-level rules shared by contributor metadata and published artifacts.
 *
 * Declared once so a remote artifact (which may have been produced by an older
 * build, or by a registry we do not control) is held to exactly the same bar as
 * a local contribution.
 */
function validateItemFiles(
  item: any,
  context: z.RefinementCtx,
): void {
  const files: Array<{ path?: string }> = Array.isArray(item?.files) ? item.files : [];
  const seenPaths = new Set<string>();
  files.forEach((file, index) => {
    const filePath = file?.path ?? "";
    const reason = explainUnsafePath(filePath, { allowedExtensions: ALLOWED_FILE_EXTENSIONS });
    if (reason) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["files", index, "path"],
        message: reason,
      });
    }
    if (filePath && seenPaths.has(filePath)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["files", index, "path"],
        message: `Duplicate file path "${filePath}".`,
      });
    }
    if (filePath) seenPaths.add(filePath);
  });

  // AI resources are prose (rules, skills, agents, prompts) and ship markdown
  // only. Everything else must include runnable source.
  if (item?.type !== "registry:ai" && !files.some((file) => /\.(tsx?|jsx?|css)$/.test(file?.path ?? ""))) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["files"],
      message: "At least one source file (.ts/.tsx/.css) must be listed.",
    });
  }
}

/** The object shape, before file validation. Extended by the built artifact. */
export const registryItemBaseSchema = z
  .object({
    $schema: z.string().min(1).optional(),
    name: registryItemNameSchema,
    type: registryItemTypeSchema,
    title: z.string().min(2).max(LIMITS.title),
    description: z.string().min(LIMITS.descriptionMin).max(LIMITS.descriptionMax),
    category: z.string().min(1).max(48).regex(TAG_PATTERN, "Category must be a slug."),
    dependencies: z.array(dependencySchema).max(LIMITS.dependenciesMax).default([]),
    registryDependencies: z
      .array(registryDependencySchema)
      .max(LIMITS.registryDependenciesMax)
      .default([]),
    files: z.array(registryItemFileSchema).min(1).max(LIMITS.filesMax),
    tags: z
      .array(z.string().min(1).max(32).regex(TAG_PATTERN, "Tags must be slugs."))
      .max(LIMITS.tagsMax)
      .optional(),
    designSystem: registryItemNameSchema.optional(),
    license: licenseIdSchema.optional(),
    docs: z.string().url().max(300).optional(),
    author: registryItemAuthorSchema.optional(),
    meta: registryItemMetaSchema.optional(),
  })
  .strict();

export const registryItemSchema = registryItemBaseSchema.superRefine(validateItemFiles);

/** A file inside a published artifact: metadata plus inlined source. */
export const builtRegistryFileSchema = registryItemFileSchema.extend({
  content: z.string(),
  contentHash: z.string().min(8).max(128),
  sizeBytes: z.number().int().nonnegative(),
});

/**
 * A published registry artifact (what `/r/<name>.json` returns).
 *
 * Validating this on the client is a security control, not a formality: the
 * CLI refuses to write anything that does not satisfy the same schema the
 * repository enforces at build time.
 */
export const builtRegistryItemSchema = registryItemBaseSchema
  .extend({
    files: z.array(builtRegistryFileSchema).min(1).max(LIMITS.filesMax),
    url: z.string().min(1).max(512),
    designRules: z.string().max(40_000).optional(),
  })
  .superRefine(validateItemFiles);

export const registryIndexEntrySchema = z.object({
  name: registryItemNameSchema,
  namespace: namespaceSchema,
  type: registryItemTypeSchema,
  title: z.string().min(2).max(LIMITS.title),
  description: z.string().min(1).max(LIMITS.descriptionMax),
  category: z.string().min(1).max(48),
  resourceType: z.string().min(1).max(32),
  tags: z.array(z.string().max(32)).default([]),
  designSystem: registryItemNameSchema.optional(),
  dependencies: z.array(z.string().max(96)).default([]),
  registryDependencies: z.array(z.string().max(128)).default([]),
  license: licenseIdSchema.optional(),
  difficulty: difficultySchema.optional(),
  dna: partialDesignDnaSchema.optional(),
  subcategory: z.string().max(48).optional(),
  fingerprint: z.record(z.string().max(48)).optional(),
  url: z.string().min(1).max(512),
  integrity: z.string().min(8).max(128),
});

export const registryIndexSchema = z.object({
  $schema: z.string().min(1),
  name: z.string().min(1).max(64),
  homepage: z.string().url(),
  version: semverSchema,
  generatedAt: z.string().datetime(),
  namespaces: z.array(namespaceSchema).min(1),
  items: z.array(registryIndexEntrySchema),
});

/** `openui.json` — the project configuration written by `openui init`. */
export const openuiConfigSchema = z
  .object({
    $schema: z.string().min(1).optional(),
    registry: z.string().url(),
    namespaces: z.array(namespaceSchema).min(1).default(["default"]),
    aliases: z.object({
      components: z.string().min(1),
      lib: z.string().min(1),
      hooks: z.string().min(1).optional(),
      styles: z.string().min(1).optional(),
      ai: z.string().min(1).optional(),
      app: z.string().min(1).optional(),
    }),
    designSystem: registryItemNameSchema.optional(),
    tailwind: z
      .object({
        css: z.string().min(1),
        baseColor: z.string().min(1).optional(),
        cssVariables: z.boolean().default(true),
      })
      .optional(),
    typescript: z.boolean().default(true),
    rsc: z.boolean().default(true),
    /** Extra registry items installed alongside every new resource. */
    registryDependencies: z.array(registryDependencySchema).default([]),
  })
  .strict()
  .superRefine((config, context) => {
    for (const [key, value] of Object.entries(config.aliases)) {
      if (value.startsWith("/") || value.includes("..")) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["aliases", key],
          message: "Aliases must be project-relative and must not contain `..`.",
        });
      }
      if (!isSafeRelativePath(value.replace(/^\.\//, ""))) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["aliases", key],
          message: `Unsafe alias path "${value}".`,
        });
      }
    }
    if (config.aliases.components.startsWith("~/") || config.aliases.lib.startsWith("~/")) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["aliases"],
        message: "Use relative paths in aliases; the CLI resolves them from the config file.",
      });
    }
  });

/** A single published resource version, as accepted by the publish workflow. */
export const releaseVersionSchema = z.object({
  version: semverSchema,
  commitSha: z
    .string()
    .regex(/^[0-9a-f]{7,40}$/, "commit_sha must be a git SHA.")
    .optional(),
  changelog: z.string().max(LIMITS.changelogMax).optional(),
  /** Optimistic concurrency guard: the version the publisher last saw. */
  expectedLatestVersion: semverSchema.optional(),
});

export type OpenUIConfigInput = z.input<typeof openuiConfigSchema>;
export type OpenUIConfig = z.output<typeof openuiConfigSchema>;
export type RegistryItemInput = z.input<typeof registryItemSchema>;
export type RegistryItemParsed = z.output<typeof registryItemSchema>;
export type RegistryIndexParsed = z.output<typeof registryIndexSchema>;
export type ReleaseVersionInput = z.output<typeof releaseVersionSchema>;

/**
 * Parses an unknown value as a `RegistryItem`. Throws a `ZodError`; callers in
 * the CLI/API convert it with `formatZodError`.
 */
export function parseRegistryItem(value: unknown): RegistryItem {
  return registryItemSchema.parse(value) as RegistryItem;
}

export function parseRegistryIndex(value: unknown): RegistryIndex {
  return registryIndexSchema.parse(value) as unknown as RegistryIndex;
}

/** Parses a published artifact, e.g. from `/r/magnetic-button.json`. */
export function parseBuiltRegistryItem(value: unknown): BuiltRegistryItem {
  return builtRegistryItemSchema.parse(value) as unknown as BuiltRegistryItem;
}

export function formatZodError(error: z.ZodError): Array<{ path: string; message: string }> {
  return error.issues.map((issue) => ({
    path: issue.path.join(".") || "(root)",
    message: issue.message,
  }));
}
