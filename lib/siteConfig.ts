// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://mapmygenetic.com",
  siteName: "MapMyGenetic.com",
  description:
    "An open library of honest, cited, jargon-free answers to the questions people " +
    "actually ask about genetic testing, inheritance, ancestry, and disease risk. " +
    "Reviewed by clinicians. Updated as the science updates.",
} as const;
