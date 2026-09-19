#!/usr/bin/env tsx
/**
 * OpenUI CLI — openui add <resource> [resource2…]
 *
 * Usage:
 *   openui add magnetic-button
 *   openui add copy-button cursor-trail
 *   openui add asymmetric-split --overwrite
 *
 * The CLI fetches artifacts from the registry (https://openui.dev/r by default,
 * or OPENUI_REGISTRY env var), resolves the full install closure including
 * registry dependencies, plans the file writes, then executes them.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { cwd } from "node:process";

import { RegistryClient } from "@openui/registry-client";
import { buildInstallPlan, DEFAULT_ALIASES } from "@openui/registry-client";

// ─── Colour helpers ──────────────────────────────────────────────────────────
const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  cyan:   "\x1b[36m",
  grey:   "\x1b[90m",
};

function ok(msg: string)   { process.stdout.write(`${c.green}✓${c.reset} ${msg}\n`); }
function warn(msg: string) { process.stdout.write(`${c.yellow}⚠${c.reset} ${msg}\n`); }
function err(msg: string)  { process.stderr.write(`${c.red}✗${c.reset} ${msg}\n`); }
function info(msg: string) { process.stdout.write(`${c.cyan}${msg}${c.reset}\n`); }
function dim(msg: string)  { process.stdout.write(`${c.dim}${msg}${c.reset}\n`); }

// ─── CLI entry ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  printHelp();
  process.exit(0);
}

const [command, ...rest] = args;

if (command === "add") {
  await runAdd(rest);
} else {
  err(`Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}

// ─── `openui add` ────────────────────────────────────────────────────────────
async function runAdd(rawArgs: string[]) {
  const overwrite = rawArgs.includes("--overwrite") || rawArgs.includes("-f");
  const names = rawArgs.filter((a) => !a.startsWith("--") && !a.startsWith("-"));

  if (names.length === 0) {
    err("Provide at least one resource name.\n  Example: openui add magnetic-button");
    process.exit(1);
  }

  const registryBaseUrl =
    process.env["UNIQUEFINGERPRINT_REGISTRY"] ??
    process.env["OPENUI_REGISTRY"] ??
    process.env["REGISTRY_BASE_URL"] ??
    "https://uniquefingerprint.web.app/r";

  const client = new RegistryClient({
    baseUrl: registryBaseUrl,
    logger: (msg) => dim(`  ${msg}`),
  });

  info(`\n${c.bold}UniqueFingerprint Registry${c.reset}  ${c.grey}${registryBaseUrl}${c.reset}\n`);

  // Resolve the full closure (transitive registry deps)
  let resolved;
  try {
    info(`Resolving ${names.join(", ")}…`);
    resolved = await client.resolve(names);
  } catch (e: unknown) {
    err(`Failed to resolve resources: ${String(e)}`);
    process.exit(1);
  }

  if (resolved.missing.length > 0) {
    err(`Could not find: ${resolved.missing.join(", ")}`);
    process.exit(1);
  }

  // Read existing files so we can detect conflicts
  const projectRoot = cwd();
  const existingFiles = new Map<string, string>();
  for (const item of resolved.order) {
    for (const file of item.files) {
      const dest = join(projectRoot, DEFAULT_ALIASES.components, file.path);
      if (existsSync(dest)) {
        try { existingFiles.set(dest, readFileSync(dest, "utf8")); } catch { /* ignore */ }
      }
    }
  }

  // Build the install plan
  const plan = buildInstallPlan(resolved.order, {
    overwrite,
    existing: existingFiles,
  });

  if (plan.warnings.length > 0) {
    for (const w of plan.warnings) warn(w);
    process.stdout.write("\n");
  }

  if (plan.protectedFiles.length > 0 && !overwrite) {
    warn("The following files already exist with different content and were skipped:");
    for (const f of plan.protectedFiles) {
      process.stdout.write(`  ${c.yellow}${f.destination}${c.reset}\n`);
    }
    process.stdout.write(`\nRun with ${c.bold}--overwrite${c.reset} to replace them.\n\n`);
  }

  if (plan.files.length === 0) {
    info("Nothing to install.");
    process.exit(0);
  }

  // Write files
  for (const planned of plan.files) {
    const dest = resolve(projectRoot, planned.destination);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, planned.content, "utf8");
    const label = planned.status === "new" ? `${c.green}new${c.reset}` : `${c.yellow}updated${c.reset}`;
    ok(`${label}  ${c.grey}${planned.destination}${c.reset}`);
  }

  // Npm dependencies summary
  if (plan.packages.length > 0) {
    process.stdout.write("\n");
    info("Install npm dependencies:");
    const pkgList = plan.packages.map((p) => `${p.name}@${p.range}`).join(" ");
    process.stdout.write(`  ${c.bold}pnpm add ${pkgList}${c.reset}\n`);
  }

  process.stdout.write(`\n${c.green}${c.bold}Done!${c.reset}\n\n`);
}

// ─── Help ────────────────────────────────────────────────────────────────────
function printHelp() {
  process.stdout.write(`
${c.bold}uniquefingerprint${c.reset} — UniqueFingerprint Design Registry CLI

${c.bold}Commands:${c.reset}
  ${c.cyan}add <resource…>${c.reset}   Install one or more registry resources
                   ${c.grey}Example: uniquefingerprint add magnetic-button liquid-chrome-fluid${c.reset}

${c.bold}Flags:${c.reset}
  ${c.cyan}--overwrite, -f${c.reset}  Replace existing files that have been modified
  ${c.cyan}--help, -h${c.reset}       Show this help message

${c.bold}Environment:${c.reset}
  UNIQUEFINGERPRINT_REGISTRY  Override the registry base URL
                             ${c.grey}Default: https://uniquefingerprint.web.app/r${c.reset}
`);
}
