// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full answer bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer. This site renders everything on the
// homepage (categories + a Q&A library), so the index points at the home page
// and its in-page anchors (#categories, #faq, #standards).

import { siteConfig } from "./siteConfig";
import { getClient } from "../sanity/client";
import { isSanityConfigured } from "../sanity/env";
import {
  homepageQuery,
  categoriesQuery,
  questionsQuery,
} from "../sanity/queries";
import type {
  HomepageContent,
  Category,
  Question,
} from "../sanity/fetch";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

// ---------- Content fetch ----------
// Reuse the existing Sanity client + queries directly. The page-level fetch
// (getHomeData) throws when Sanity is unconfigured; these routes instead
// degrade to an empty result so /llms.txt still emits a useful index.

type LlmsData = {
  content: HomepageContent | null;
  categories: Category[];
  questions: Question[];
};

async function getLlmsData(): Promise<LlmsData> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    return { content: null, categories: [], questions: [] };
  }
  try {
    const [content, categories, questions] = await Promise.all([
      client.fetch<HomepageContent | null>(homepageQuery),
      client.fetch<Category[]>(categoriesQuery),
      client.fetch<Question[]>(questionsQuery),
    ]);
    return {
      content: content ?? null,
      categories: categories ?? [],
      questions: questions ?? [],
    };
  } catch (err) {
    console.warn("[llms] CMS fetch failed, emitting site identity only:", err);
    return { content: null, categories: [], questions: [] };
  }
}

/** One-line plain-text summary of a question's answer (first paragraph). */
function answerSummary(answer: Question["answer"]): string {
  const md = portableTextToMarkdown(answer);
  const first = md.split("\n\n").find((p) => p.trim().length > 0) ?? "";
  // Strip bold markers so the summary reads as plain text.
  return first.replace(/\*\*/g, "").trim();
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const { content, categories, questions } = await getLlmsData();

  const summary = content?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(
    `- [Home](${abs("/")}): Plain-language genetics Q&A library, browsable by category.`
  );
  lines.push(
    `- [Browse by category](${abs("/#categories")}): Questions grouped by topic.`
  );
  lines.push(
    `- [Q&A Library](${abs("/#faq")}): Every answered question in one place.`
  );
  lines.push(
    `- [Our Standards](${abs("/#standards")}): How these answers are researched and reviewed.`
  );
  lines.push("");

  if (categories.length) {
    lines.push("## Categories");
    for (const c of categories) {
      const n = c.count ?? 0;
      const suffix = `${n} ${n === 1 ? "answer" : "answers"}`;
      lines.push(`- **${c.title}** (${suffix})`);
    }
    lines.push("");
  }

  if (questions.length) {
    lines.push("## Questions");
    for (const q of questions) {
      const summ = answerSummary(q.answer);
      const desc = summ ? `: ${summ}` : "";
      lines.push(`- [${q.question}](${abs(`/#faq`)})${desc}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const { content, categories, questions } = await getLlmsData();

  const summary = content?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push(`- [Browse by category](${abs("/#categories")})`);
  lines.push(`- [Q&A Library](${abs("/#faq")})`);
  lines.push(`- [Our Standards](${abs("/#standards")})`);
  lines.push("");

  // Editorial standards block, inlined so AI answers can cite how content is made.
  if (content?.standardsBody?.trim()) {
    lines.push("## Editorial Standards");
    lines.push("");
    lines.push(content.standardsBody.trim());
    lines.push("");
    if (Array.isArray(content.pillars) && content.pillars.length) {
      for (const p of content.pillars) {
        lines.push(`### ${p.title}`);
        lines.push(p.text);
        lines.push("");
      }
    }
  }

  if (categories.length) {
    lines.push("## Categories");
    lines.push("");
    for (const c of categories) {
      const n = c.count ?? 0;
      lines.push(`- ${c.title} (${n} ${n === 1 ? "answer" : "answers"})`);
    }
    lines.push("");
  }

  // Full Q&A bodies. Answers are Portable Text; demote any body headings so
  // they nest under the question heading.
  if (questions.length) {
    lines.push("## Questions");
    lines.push("");
    for (const q of questions) {
      lines.push(`### ${q.question}`);
      lines.push(`URL: ${abs("/#faq")}`);
      if (q.categoryTitle) lines.push(`Category: ${q.categoryTitle}`);
      if (q.reviewerName) {
        const who = q.reviewerTitle
          ? `${q.reviewerName}, ${q.reviewerTitle}`
          : q.reviewerName;
        lines.push(`Reviewed by: ${who}`);
      }
      lines.push("");
      const body = portableTextToMarkdown(q.answer, 2);
      if (body) {
        lines.push(body);
        lines.push("");
      }
    }
  }

  return lines.join("\n").trim() + "\n";
}
