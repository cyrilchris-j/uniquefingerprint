import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { hashFiles, sha256Integrity } from "@openui/utils/node";
import { ADVANCED_RESOURCES } from "../apps/web/src/advanced/catalogue-data.js";

const REGISTRY_DIR = join(process.cwd(), "apps", "web", "public", "r");
const REGISTRY_JSON_PATH = join(REGISTRY_DIR, "registry.json");
const INDEX_JSON_PATH = join(REGISTRY_DIR, "index.json");

function sha256(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

async function run() {
  console.log(`Exporting ${ADVANCED_RESOURCES.length} advanced items to registry...`);

  // Read existing registry.json
  const registryRaw = await readFile(REGISTRY_JSON_PATH, "utf8");
  const registryData = JSON.parse(registryRaw);
  const existingNames = new Set(registryData.items.map((i: any) => i.name));

  // Clean out any old items without integrity
  registryData.items = registryData.items.filter((i: any) => i.integrity);
  const validNames = new Set(registryData.items.map((i: any) => i.name));

  let addedCount = 0;

  for (const item of ADVANCED_RESOURCES) {
    const slug = item.slug;
    const content = item.sourceCode;
    const sizeBytes = Buffer.byteLength(content, "utf8");
    const contentHash = sha256(content);
    const integrity = sha256Integrity(hashFiles([{ path: `${slug}.tsx`, content }]));

    const artifact = {
      $schema: "../schema/registry-item.json",
      name: slug,
      type: "registry:component",
      title: item.title,
      description: item.description,
      category: item.category,
      dependencies: item.dependencies,
      registryDependencies: ["cn"],
      files: [
        {
          path: `${slug}.tsx`,
          type: "registry:component",
          content,
          contentHash,
          sizeBytes,
        },
      ],
      tags: item.tags,
      license: "MIT",
      url: `https://uniquefingerprint.web.app/r/${slug}.json`,
    };

    // Write individual item JSON file
    const itemPath = join(REGISTRY_DIR, `${slug}.json`);
    await writeFile(itemPath, JSON.stringify(artifact, null, 2), "utf8");

    // Add to registry index if not already present
    if (!validNames.has(slug)) {
      registryData.items.push({
        name: slug,
        namespace: "default",
        type: "registry:component",
        title: item.title,
        description: item.description,
        category: item.category,
        resourceType: "advanced",
        tags: item.tags,
        dependencies: item.dependencies,
        registryDependencies: ["cn"],
        url: `https://uniquefingerprint.web.app/r/${slug}.json`,
        integrity,
        license: "MIT",
      });
      validNames.add(slug);
      addedCount++;
    }
  }

  // Update registry.json and index.json
  const updatedJson = JSON.stringify(registryData, null, 2);
  await writeFile(REGISTRY_JSON_PATH, updatedJson, "utf8");
  if (existsSync(INDEX_JSON_PATH)) {
    await writeFile(INDEX_JSON_PATH, updatedJson, "utf8");
  }

  console.log(`Successfully exported all ${ADVANCED_RESOURCES.length} advanced items! (${addedCount} newly added to registry index).`);
  console.log(`Total registry items now: ${registryData.items.length}`);
}

run().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
