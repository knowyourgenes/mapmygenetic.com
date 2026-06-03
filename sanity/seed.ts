/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env vars (in .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (Editor role - used for writes)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import {
  categories,
  homepageContent,
  questions,
  reviewers,
  type Paragraph,
} from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const candidates = [".env.local", ".env"];
    for (const file of candidates) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

// Convert our segment-based paragraphs into Sanity portable-text blocks,
// preserving bold runs as spans with a `strong` mark.
function paragraphsToBlocks(paragraphs: Paragraph[]) {
  return paragraphs.map((segments, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: segments.map((seg, j) => {
      const isBold = typeof seg !== "string";
      return {
        _type: "span",
        _key: `s${i}_${j}`,
        text: typeof seg === "string" ? seg : seg.b,
        marks: isBold ? ["strong"] : [],
      };
    }),
  }));
}

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  // Wipe existing content docs so renamed slugs don't linger.
  const oldIds = await client.fetch<string[]>(
    `*[_type in ["question", "category", "reviewer"]]._id`
  );
  if (oldIds.length > 0) {
    console.log(`Deleting ${oldIds.length} existing content docs.`);
  }

  const tx = client.transaction();
  for (const id of oldIds) tx.delete(id);

  // Homepage singleton - stable ID so re-runs replace cleanly.
  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  // Categories
  for (const c of categories) {
    tx.createOrReplace({
      _id: `category.${c.slug}`,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      order: c.order,
    });
  }

  // Reviewers
  for (const r of reviewers) {
    tx.createOrReplace({
      _id: `reviewer.${r.slug}`,
      _type: "reviewer",
      name: r.name,
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      order: r.order,
    });
  }

  // Questions
  for (const q of questions) {
    tx.createOrReplace({
      _id: `question.${q.slug}`,
      _type: "question",
      question: q.question,
      slug: { _type: "slug", current: q.slug },
      category: { _type: "reference", _ref: `category.${q.categorySlug}` },
      reviewer: { _type: "reference", _ref: `reviewer.${q.reviewerSlug}` },
      tags: q.tags,
      answer: paragraphsToBlocks(q.answer),
      order: q.order,
    });
  }

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
