import { defineType, defineField } from "sanity";

export const reviewer = defineType({
  name: "reviewer",
  title: "Reviewer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "e.g. Dr. Vikram K.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      description: "Specialty, e.g. medical geneticist",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
  },
});
