import { groq } from "next-sanity";

// Singleton homepage doc; fetch the most recently updated one.
export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  brandName,
  brandTld,
  navLinks[]{ label, anchor },
  navCtaLabel,
  navCtaAnchor,
  heroEyebrow,
  heroHeadline,
  heroHeadlineAccent,
  heroSubhead,
  heroPrimaryCtaLabel,
  heroPrimaryCtaAnchor,
  heroSecondaryCtaLabel,
  heroSecondaryCtaAnchor,
  searchPlaceholder,
  searchPills[]{ label, tag },
  stats[]{ label, source, customValue },
  categoriesLabel,
  categoriesTitle,
  categoriesTitleAccent,
  allQuestionsLabel,
  faqTitle,
  standardsLabel,
  standardsHeadline,
  standardsHeadlineAccent,
  standardsBody,
  pillars[]{ num, title, text },
  newsletterHeadline,
  newsletterHeadlineAccent,
  newsletterSubhead,
  newsletterPlaceholder,
  newsletterButton,
  newsletterNote,
  footerLinks[]{ label, anchor },
  footerCopy
}`;

// Categories with a live count of the questions that reference them.
export const categoriesQuery = groq`*[_type == "category"] | order(order asc) {
  "slug": slug.current,
  title,
  order,
  "count": count(*[_type == "question" && references(^._id)])
}`;

export const questionsQuery = groq`*[_type == "question"] | order(order asc) {
  "slug": slug.current,
  question,
  tags,
  answer,
  "categorySlug": category->slug.current,
  "categoryTitle": category->title,
  "reviewerName": reviewer->name,
  "reviewerTitle": reviewer->title
}`;

export const countsQuery = groq`{
  "questions": count(*[_type == "question"]),
  "categories": count(*[_type == "category"]),
  "reviewers": count(*[_type == "reviewer"])
}`;
