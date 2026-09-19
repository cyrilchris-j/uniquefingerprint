import { z } from "zod";

/**
 * Environment configuration.
 *
 * Validated once, at startup, with Zod — a missing `DATABASE_URL` should stop the
 * process with a clear message rather than surface as a 500 on the first request.
 *
 * Secrets never leave this module: `publicConfig()` returns the fields that are
 * safe to expose, and nothing else is serialised into a response.
 */

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8787),

  DATABASE_URL: z
    .string()
    .min(1)
    .default("postgresql://postgres:postgres@127.0.0.1:54322/postgres"),

  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  /** Only for projects still on HS256 signing keys. */
  SUPABASE_JWT_SECRET: z.string().min(16).optional(),

  API_BASE_URL: z.string().url().default("http://localhost:8787"),
  REGISTRY_BASE_URL: z.string().url().default("https://openui.dev/r"),
  /**
   * Directory holding the built registry artifacts (`index.json`, `<name>.json`).
   * Relative paths resolve against the repository root so the default works from
   * any workspace without a symlink. In production this is the deployed copy of
   * the build output.
   */
  REGISTRY_ARTIFACTS_DIR: z.string().default("apps/web/public/r"),
  /** Seconds a built artifact stays in the in-process cache before re-reading. */
  REGISTRY_CACHE_TTL: z.coerce.number().int().nonnegative().default(300),

  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(120),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),

  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ENVIRONMENT: z.string().default("development"),

  /** Salt for hashing client addresses before they are stored. */
  TELEMETRY_SALT: z.string().min(8).default("openui-local-telemetry-salt"),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${details}`);
  }
  return result.data;
}

export interface PublicConfig {
  environment: Env["NODE_ENV"];
  apiBaseUrl: string;
  registryBaseUrl: string;
  authEnabled: boolean;
  rateLimitPerMinute: number;
}


/**
 * What the API is willing to say about itself. Used by `/api/v1/health` and by
 * the website's diagnostics panel — note there is no secret in this shape, by
 * construction rather than by discipline.
 */
export function publicConfig(env: Env): PublicConfig {
  return {
    environment: env.NODE_ENV,
    apiBaseUrl: env.API_BASE_URL,
    registryBaseUrl: env.REGISTRY_BASE_URL,
    authEnabled: Boolean(env.SUPABASE_URL || env.SUPABASE_JWT_SECRET),
    rateLimitPerMinute: env.RATE_LIMIT_PER_MINUTE,
  };
}

export function allowedOrigins(env: Env): string[] {
  return env.CORS_ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
