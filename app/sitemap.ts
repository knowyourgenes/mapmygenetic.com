import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getClient } from "../sanity/client";
import { isSanityConfigured } from "../sanity/env";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

// Most-recent content update across the documents that drive the homepage.
// Used as the home page's lastModified. Wrapped so the route still emits if
// Sanity is unavailable.
const lastUpdatedQuery = `*[_type in ["homepage", "category", "question", "reviewer"]] | order(_updatedAt desc)[0]._updatedAt`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // This site renders all content on the homepage (categories + Q&A library
  // via in-page anchors), so the homepage is the only indexable route.
  let homeLastModified: Date = now;

  if (isSanityConfigured) {
    try {
      const client = getClient();
      if (client) {
        const updatedAt = await client.fetch<string | null>(lastUpdatedQuery);
        if (updatedAt) {
          const d = new Date(updatedAt);
          if (!Number.isNaN(d.getTime())) homeLastModified = d;
        }
      }
    } catch (err) {
      console.warn("[sitemap] CMS fetch failed, using current time:", err);
    }
  }

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Dedupe by URL.
  const seen = new Set<string>();
  return routes.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
