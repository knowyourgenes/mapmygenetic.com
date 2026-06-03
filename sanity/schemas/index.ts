import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { category } from "./category";
import { reviewer } from "./reviewer";
import { question } from "./question";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, category, reviewer, question],
};
