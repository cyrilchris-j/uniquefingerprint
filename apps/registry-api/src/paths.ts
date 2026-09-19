import { existsSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { Env } from "./env.js";

/**
 * Repository root, derived from this file's location.
 *
 * The API is bundled with esbuild but keeps its source-relative layout for the
 * paths that matter, so `apps/registry-api/src/../..` is the monorepo root
 * regardless of the process's working directory.
 */
export const REPO_ROOT_FROM_HERE = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

/** Absolute path of the built registry artifacts directory. */
export function artifactsDirectory(env: Env): string {
  if (isAbsolute(env.REGISTRY_ARTIFACTS_DIR)) {
    return env.REGISTRY_ARTIFACTS_DIR;
  }

  const candidates = [
    resolve(REPO_ROOT_FROM_HERE, env.REGISTRY_ARTIFACTS_DIR),
    resolve(process.cwd(), env.REGISTRY_ARTIFACTS_DIR),
    resolve(process.cwd(), "public/r"),
    resolve(dirname(fileURLToPath(import.meta.url)), "../artifacts/r"),
    resolve(REPO_ROOT_FROM_HERE, "apps/web/public/r"),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return resolve(REPO_ROOT_FROM_HERE, env.REGISTRY_ARTIFACTS_DIR);
}
