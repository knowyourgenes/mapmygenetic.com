import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  homepageQuery,
  categoriesQuery,
  questionsQuery,
  countsQuery,
} from "./queries";

// ----- Portable-text shapes (kept raw so the renderer can honour bold marks) -----
export type AnswerSpan = { _type?: string; text?: string; marks?: string[] };
export type AnswerBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: AnswerSpan[];
};

export type NavLink = { label: string; anchor: string };
export type SearchPill = { label: string; tag: string };
export type Pillar = { num: string; title: string; text: string };
export type StatConfig = {
  label: string;
  source: string;
  customValue?: string;
};

export type HomepageContent = {
  brandName: string;
  brandTld: string;
  navLinks: NavLink[];
  navCtaLabel: string;
  navCtaAnchor: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSubhead: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaAnchor: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaAnchor: string;
  searchPlaceholder: string;
  searchPills: SearchPill[];
  stats: StatConfig[];
  categoriesLabel: string;
  categoriesTitle: string;
  categoriesTitleAccent: string;
  allQuestionsLabel: string;
  faqTitle: string;
  standardsLabel: string;
  standardsHeadline: string;
  standardsHeadlineAccent: string;
  standardsBody: string;
  pillars: Pillar[];
  newsletterHeadline: string;
  newsletterHeadlineAccent: string;
  newsletterSubhead: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterNote: string;
  footerLinks: NavLink[];
  footerCopy: string;
};

export type Category = {
  slug: string;
  title: string;
  order: number;
  count: number;
};

export type Question = {
  slug: string;
  question: string;
  tags: string[];
  answer: AnswerBlock[];
  categorySlug: string;
  categoryTitle: string;
  reviewerName: string;
  reviewerTitle: string;
};

export type Stat = { label: string; value: string };

export type HomeData = {
  content: HomepageContent;
  categories: Category[];
  questions: Question[];
  stats: Stat[];
};

type Counts = { questions: number; categories: number; reviewers: number };

function resolveStats(stats: StatConfig[], counts: Counts): Stat[] {
  return (stats ?? []).map((s) => {
    let value: string;
    switch (s.source) {
      case "questions":
        value = String(counts.questions);
        break;
      case "categories":
        value = String(counts.categories);
        break;
      case "reviewers":
        value = String(counts.reviewers);
        break;
      default:
        value = s.customValue ?? "";
    }
    return { label: s.label, value };
  });
}

export async function getHomeData(): Promise<HomeData> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local, then run `pnpm seed`."
    );
  }

  const [content, categories, questions, counts] = await Promise.all([
    client.fetch<HomepageContent | null>(homepageQuery),
    client.fetch<Category[]>(categoriesQuery),
    client.fetch<Question[]>(questionsQuery),
    client.fetch<Counts>(countsQuery),
  ]);

  if (!content) {
    throw new Error(
      "No homepage document found in Sanity. Run `pnpm seed` to populate the dataset."
    );
  }

  return {
    content,
    categories: categories ?? [],
    questions: questions ?? [],
    stats: resolveStats(
      content.stats ?? [],
      counts ?? { questions: 0, categories: 0, reviewers: 0 }
    ),
  };
}
