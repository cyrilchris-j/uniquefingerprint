import { handle } from "hono/vercel";
import { createApp } from "../src/app.js";
import { createDatabase } from "../src/db/client.js";
import { loadEnv } from "../src/env.js";
import { createRegistryStore } from "../src/registry/store.js";

const env = loadEnv();
const database = createDatabase(env);
const store = createRegistryStore(env);
const app = createApp({ env, sql: database.sql, store });

export default handle(app);
