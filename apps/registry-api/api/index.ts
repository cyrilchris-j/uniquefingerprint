import { handle } from "hono/vercel";
import { createApp } from "../src/app.js";
import { createDatabase } from "../src/db/client.js";
import { loadEnv } from "../src/env.js";
import { createRegistryStore } from "../src/registry/store.js";

const env = loadEnv();
const database = createDatabase(env);
const store = createRegistryStore(env);
const app = createApp({ env, sql: database.sql, store });

// Middleware to fix rewritten paths on Vercel
app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  const pathParam = url.searchParams.get("__path");
  if (pathParam !== null && (url.pathname === "/api" || url.pathname === "/api/")) {
    url.searchParams.delete("__path");
    url.pathname = pathParam.startsWith("/") ? pathParam : `/${pathParam}`;
    return app.fetch(new Request(url.toString(), c.req.raw));
  }
  const matchedPath = c.req.header("x-matched-path") || c.req.header("x-forwarded-uri");
  if (matchedPath && (url.pathname === "/api" || url.pathname === "/api/")) {
    url.pathname = matchedPath;
    return app.fetch(new Request(url.toString(), c.req.raw));
  }
  await next();
});

export default handle(app);
