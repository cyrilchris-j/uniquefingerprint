#!/usr/bin/env tsx
/**
 * `pnpm materialize:registry [--dry-run] [--only <category>]`
 *
 * Turns resource definitions in `scripts/definitions/` into on-disk registry
 * item directories under `registry/default/<category>/<name>/`:
 *
 *   <name>.tsx        the primary source file
 *   demo.tsx          the runnable demo
 *   registry.json     the item manifest (schema-valid)
 *   README.md         docs generated from the definition, hand-editable after
 *   design.md         the design DNA + rules block
 *
 * Idempotence rule: an existing item directory is **never** rewritten unless
 * `--force` is passed. This is what makes the pipeline safe to re-run after
 * hand-tuning a generated item — the materializer upgrades metadata, but it
 * does not clobber source a maintainer edited.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { formatDesignDnaHeader, titleFromSlug } from "@openui/registry-schema";

import { REGISTRY_ROOT } from "./lib/paths.js";
import {
  assertDefinitionValid,
  RESOURCE_TYPE_FOR_CATEGORY,
  type ResourceDefinition,
} from "./lib/definitions.js";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const onlyIndex = args.indexOf("--only");
const only = onlyIndex >= 0 ? args[onlyIndex + 1] : undefined;

const DEFINITIONS_ROOT = join(process.cwd(), "scripts", "definitions");

async function loadDefinitions(): Promise<ResourceDefinition[]> {
  const definitions: ResourceDefinition[] = [];
  let files: string[] = [];
  try {
    files = (await readdir(DEFINITIONS_ROOT)).filter((file) => file.endsWith(".ts"));
  } catch {
    return definitions;
  }
  for (const file of files) {
    const module = await import(join(DEFINITIONS_ROOT, file));
    const batch: ResourceDefinition[] = module.default ?? [];
    if (!Array.isArray(batch)) continue;
    definitions.push(...batch);
  }
  return definitions;
}

function registryJsonFor(definition: ResourceDefinition): string {
  const type = RESOURCE_TYPE_FOR_CATEGORY[definition.category];
  // Registry dependencies are detected from the source rather than hand-listed:
  // every `@/hooks/<name>` import becomes a declared dependency on that hook
  // item, which is exactly what the CLI resolves on install.
  const hookDependencies = new Set<string>();
  const allSource = [definition.source, definition.demo, ...(definition.extraFiles ?? []).map((f) => f.content)];
  for (const source of allSource) {
    for (const match of source.matchAll(/from ["']@\/hooks\/([a-z0-9-]+)["']/g)) {
      hookDependencies.add(match[1]!);
    }
  }

  return `${JSON.stringify(
    {
      $schema: "../../../../schema/registry-item.json",
      name: definition.name,
      type,
      title: definition.title,
      description: definition.description,
      category: definition.category,
      dependencies: definition.dependencies,
      registryDependencies: ["cn", ...[...hookDependencies].sort()],
      files: [
        { path: `${definition.name}.tsx`, type },
        ...(definition.extraFiles ?? []).map((file) => ({ path: file.path, type })),
      ],
      tags: definition.tags,
      license: "MIT",
      meta: {
        difficulty: definition.difficulty,
        subcategory: definition.subcategory,
        fingerprint: definition.fingerprint,
        features: ["keyboard-accessible", "reduced-motion-safe", "responsive"],
        peer: { react: ">=19" },
        dna: definition.dna,
      },
    },
    null,
    2,
  )}\n`;
}

function readmeFor(definition: ResourceDefinition): string {
  const deps =
    definition.dependencies.filter((name) => name !== "react").length > 0
      ? definition.dependencies.filter((name) => name !== "react").join(", ")
      : "none beyond React";
  return `# ${definition.title}

${definition.description}

## Install

\`\`\`bash
openui add ${definition.name}
\`\`\`

Dependencies: ${deps}.

## What makes it distinct

- Category: \`${definition.category}\` → subcategory \`${definition.subcategory}\`
- Interaction model: \`${definition.fingerprint.interactionModel ?? "n/a"}\`
- Visual model: \`${definition.fingerprint.visualModel ?? "n/a"}\`
- Motion model: \`${definition.fingerprint.motionModel ?? "n/a"}\`
- Semantic purpose: \`${definition.fingerprint.semanticPurpose ?? "n/a"}\`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours \`prefers-reduced-motion\`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
`;
}

function designMdFor(definition: ResourceDefinition): string {
  return `# Design System

${formatDesignDnaHeader(definition.dna)}

## Rules

- ${titleFromSlug(definition.fingerprint.interactionModel ?? "static")}: the interaction model is part of the design, not an add-on.
- Reduced motion replaces animation with a state change; nothing is hidden behind motion.
- The component composes through \`cn\` and never hardcodes colours.

## Avoid

- Reskinning this resource and republishing it under a new name.
- Adding shadows or radii that contradict its shape language.
`;
}

async function writeIfChanged(path: string, content: string): Promise<boolean> {
  if (existsSync(path)) {
    const existing = await readFile(path, "utf8");
    if (existing === content) return false;
  }
  if (!dryRun) await writeFile(path, content, "utf8");
  return true;
}

const definitions = await loadDefinitions();
const filtered =
  only === undefined ? definitions : definitions.filter((d) => d.category === only);

let created = 0;
let updated = 0;
let skipped = 0;
const problems: string[] = [];

for (const definition of filtered) {
  problems.push(...assertDefinitionValid(definition));

  const itemDir = join(REGISTRY_ROOT, "default", definition.category, definition.name);
  const exists = existsSync(itemDir);
  if (exists && !force) {
    skipped++;
    continue;
  }

  const type = RESOURCE_TYPE_FOR_CATEGORY[definition.category];
  if (!dryRun) await mkdir(itemDir, { recursive: true });

  const writes: Array<[string, string]> = [
    [join(itemDir, `${definition.name}.tsx`), definition.source],
    [join(itemDir, "demo.tsx"), definition.demo],
    [join(itemDir, "registry.json"), registryJsonFor(definition)],
    [join(itemDir, "README.md"), readmeFor(definition)],
    [join(itemDir, "design.md"), designMdFor(definition)],
    ...(definition.extraFiles ?? []).map(
      (file) => [join(itemDir, file.path), file.content] as [string, string],
    ),
  ];

  // The declared files[] must exactly cover the materialized source files
  // (README/design.md/demo are auxiliary and excluded from files[]).
  if (definition.extraFiles) {
    const manifest = JSON.parse(registryJsonFor(definition));
    for (const file of definition.extraFiles) {
      if (!manifest.files.some((entry: { path: string }) => entry.path === file.path)) {
        problems.push(`${definition.name}: extra file ${file.path} missing from files[]`);
      }
    }
  }

  for (const [path, content] of writes) {
    const changed = await writeIfChanged(path, content);
    if (changed) exists ? updated++ : created++;
  }
  if (!exists) created++;
}

process.stdout.write(
  `Materialized ${filtered.length} definitions → ${created} created, ${updated} updated, ${skipped} skipped${dryRun ? " (dry run)" : ""}\n`,
);
if (problems.length > 0) {
  process.stderr.write(`\n${problems.length} definition problem(s):\n`);
  for (const problem of problems) process.stderr.write(`  ${problem}\n`);
  process.exitCode = 1;
}
