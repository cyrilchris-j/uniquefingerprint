import { API_PREFIX } from "@openui/types";

/**
 * Runtime configuration.
 *
 * Every value here is *public by definition* — Vite inlines `VITE_*` variables
 * into the bundle, so a secret placed here would be shipped to every visitor.
 * The service-role key and the database URL are therefore deliberately absent,
 * and `missingConfiguration` below turns a misconfigured deployment into an
 * explicit, visible message rather than a failing fetch.
 */

function read(key: string, fallback: string): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface AppConfig {
  /** Base URL of the registry API, without the `/api/v1` suffix. */
  apiBaseUrl: string;
  /** Where built registry artifacts are served from. */
  registryBaseUrl: string;
  firebase: FirebaseConfig;
  firebaseConfigured: boolean;
  /** True when auth is configured. */
  authEnabled: boolean;
  environment: "development" | "production";
}

export const config: AppConfig = {
  // Defaults point at relative paths so CDN / hosting deployments work out of the box.
  apiBaseUrl: (
    import.meta.env.PROD && read("VITE_API_BASE_URL", "/api/v1").includes("localhost")
      ? "/api/v1"
      : read("VITE_API_BASE_URL", "/api/v1")
  ).replace(/\/+$/, ""),
  registryBaseUrl: (
    import.meta.env.PROD && read("VITE_REGISTRY_BASE_URL", "/r").includes("localhost")
      ? "/r"
      : read("VITE_REGISTRY_BASE_URL", "/r")
  ).replace(/\/+$/, ""),
  firebase: {
    apiKey: read("VITE_FIREBASE_API_KEY", "AIzaSyC46YYMRXtFm-xuL3gQJr4fnFdnjl2VSmc"),
    authDomain: read("VITE_FIREBASE_AUTH_DOMAIN", "uniquefingerprint.firebaseapp.com"),
    projectId: read("VITE_FIREBASE_PROJECT_ID", "uniquefingerprint"),
    storageBucket: read("VITE_FIREBASE_STORAGE_BUCKET", "uniquefingerprint.firebasestorage.app"),
    messagingSenderId: read("VITE_FIREBASE_MESSAGING_SENDER_ID", "337898544351"),
    appId: read("VITE_FIREBASE_APP_ID", "1:337898544351:web:f49f640435ca5f45d35d6a"),
  },
  get firebaseConfigured(): boolean {
    return Boolean(this.firebase.apiKey && this.firebase.projectId);
  },
  get authEnabled(): boolean {
    return this.firebaseConfigured;
  },
  environment: import.meta.env.PROD ? "production" : "development",
};

/** Full URL of an API path, e.g. `/resources/magnetic-button`. */
export function apiUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  // The default `apiBaseUrl` already includes the version prefix.
  return config.apiBaseUrl.endsWith(API_PREFIX)
    ? `${config.apiBaseUrl}${normalised}`
    : `${config.apiBaseUrl}${API_PREFIX}${normalised}`;
}

/** Full URL of a built registry artifact, e.g. `magnetic-button.json`. */
export function registryUrl(path: string): string {
  return `${config.registryBaseUrl}/${path.replace(/^\/+/, "")}`;
}

/**
 * Configuration that is absent or suspicious, for the diagnostics page.
 */
export function configurationIssues(): Array<{ key: string; problem: string }> {
  const issues: Array<{ key: string; problem: string }> = [];
  if (!config.firebaseConfigured) {
    issues.push({
      key: "VITE_FIREBASE_API_KEY",
      problem: "Firebase credentials not set. Authentication and favourites are disabled.",
    });
  }
  return issues;
}
