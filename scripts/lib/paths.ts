import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Repository root, derived from this file's location so scripts are cwd-agnostic. */
export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** Source of truth for registry content, committed to git. */
export const REGISTRY_ROOT = resolve(REPO_ROOT, "registry");

/** Where generated artifacts are written for the website to serve. */
export const WEB_REGISTRY_OUT = resolve(REPO_ROOT, "apps", "web", "public", "r");

/** Where generated artifacts are written for the docs site. */
export const DOCS_REGISTRY_OUT = resolve(REPO_ROOT, "apps", "docs", "public", "r");

/** Index + search artefacts kept in the repository for consumers that clone it. */
export const REGISTRY_INDEX_FILE = resolve(REGISTRY_ROOT, "index.json");
export const REGISTRY_VERSIONS_FILE = resolve(REGISTRY_ROOT, "versions.json");

export const REGISTRY_BASE_URL = process.env["REGISTRY_BASE_URL"] ?? "https://uniquefingerprint.web.app/r";
export const SITE_HOMEPAGE = process.env["SITE_HOMEPAGE"] ?? "https://uniquefingerprint.web.app";
export const DEFAULT_NAMESPACE = process.env["REGISTRY_DEFAULT_NAMESPACE"] ?? "default";
export const REGISTRY_VERSION = process.env["REGISTRY_VERSION"] ?? "0.1.0";

export const DATABASE_DIR = resolve(REPO_ROOT, "database");
export const MIGRATIONS_DIR = resolve(DATABASE_DIR, "migrations");
export const SEEDS_DIR = resolve(DATABASE_DIR, "seeds");
