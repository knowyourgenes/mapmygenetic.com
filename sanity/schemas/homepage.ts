import { defineType, defineField, defineArrayMember } from "sanity";

const linkObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "link",
        fields: [
          defineField({
            name: "label",
            type: "string",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "anchor",
            type: "string",
            description: "In-page anchor or URL, e.g. #faq",
            validation: (r) => r.required(),
          }),
        ],
        preview: {
          select: { title: "label", subtitle: "anchor" },
        },
      }),
    ],
  });

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & Nav" },
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats" },
    { name: "sections", title: "Section Headings" },
    { name: "standards", title: "Standards" },
    { name: "newsletter", title: "Newsletter" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ---- Brand & Nav ----
    defineField({
      name: "brandName",
      type: "string",
      group: "brand",
      initialValue: "MapMyGenetic",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brandTld",
      type: "string",
      group: "brand",
      initialValue: ".com",
      validation: (r) => r.required(),
    }),
    { ...linkObject("navLinks", "Nav links"), group: "brand" },
    defineField({
      name: "navCtaLabel",
      title: "Nav CTA label",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "navCtaAnchor",
      title: "Nav CTA anchor",
      type: "string",
      group: "brand",
    }),

    // ---- Hero ----
    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({
      name: "heroHeadline",
      type: "string",
      group: "hero",
      description: "First line of the hero headline.",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero headline accent",
      type: "string",
      group: "hero",
      description: "Second line, rendered in the italic serif accent style.",
    }),
    defineField({ name: "heroSubhead", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string", group: "hero" }),
    defineField({
      name: "heroPrimaryCtaAnchor",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaAnchor",
      type: "string",
      group: "hero",
    }),
    defineField({ name: "searchPlaceholder", type: "string", group: "hero" }),
    defineField({
      name: "searchPills",
      title: "Search pills",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          name: "pill",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "tag",
              type: "string",
              description: "Search term applied when the pill is clicked.",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "tag" } },
        }),
      ],
    }),

    // ---- Stats ----
    defineField({
      name: "stats",
      title: "Stats bar",
      type: "array",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "source",
              type: "string",
              description: "Where the number comes from.",
              options: {
                list: [
                  { title: "Count of questions", value: "questions" },
                  { title: "Count of categories", value: "categories" },
                  { title: "Count of reviewers", value: "reviewers" },
                  { title: "Custom value", value: "custom" },
                ],
                layout: "radio",
              },
              initialValue: "custom",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "customValue",
              type: "string",
              description: "Shown only when source is 'Custom value'.",
              hidden: ({ parent }) => parent?.source !== "custom",
            }),
          ],
          preview: {
            select: {
              title: "label",
              source: "source",
              customValue: "customValue",
            },
            prepare: ({ title, source, customValue }) => ({
              title,
              subtitle: source === "custom" ? customValue : `auto: ${source}`,
            }),
          },
        }),
      ],
    }),

    // ---- Section headings ----
    defineField({ name: "categoriesLabel", type: "string", group: "sections" }),
    defineField({ name: "categoriesTitle", type: "string", group: "sections" }),
    defineField({
      name: "categoriesTitleAccent",
      type: "string",
      group: "sections",
      description: "Italic accent portion of the categories title.",
    }),
    defineField({
      name: "allQuestionsLabel",
      type: "string",
      group: "sections",
      description: "Label for the 'all categories' filter card.",
      initialValue: "All questions",
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ section title",
      type: "string",
      group: "sections",
    }),

    // ---- Standards ----
    defineField({ name: "standardsLabel", type: "string", group: "standards" }),
    defineField({
      name: "standardsHeadline",
      type: "string",
      group: "standards",
    }),
    defineField({
      name: "standardsHeadlineAccent",
      type: "string",
      group: "standards",
      description: "Italic accent line of the standards headline.",
    }),
    defineField({
      name: "standardsBody",
      type: "text",
      rows: 5,
      group: "standards",
    }),
    defineField({
      name: "pillars",
      title: "Standards pillars",
      type: "array",
      group: "standards",
      of: [
        defineArrayMember({
          type: "object",
          name: "pillar",
          fields: [
            defineField({
              name: "num",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "text",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "num" } },
        }),
      ],
    }),

    // ---- Newsletter ----
    defineField({
      name: "newsletterHeadline",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterHeadlineAccent",
      type: "string",
      group: "newsletter",
      description: "Italic accent line of the newsletter headline.",
    }),
    defineField({
      name: "newsletterSubhead",
      type: "text",
      rows: 3,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterButton",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterNote",
      type: "string",
      group: "newsletter",
    }),

    // ---- Footer ----
    { ...linkObject("footerLinks", "Footer links"), group: "footer" },
    defineField({ name: "footerCopy", type: "string", group: "footer" }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage content" }),
  },
});
