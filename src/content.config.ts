import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { blogSchema } from "@/contents/schema";

const vnBlog = defineCollection({
  loader: glob({ base: "src/contents/vn/", pattern: ["**/*.mdx", "**/*.md"] }),
  schema: blogSchema,
});

const enBlog = defineCollection({
  loader: glob({ base: "src/contents/en/", pattern: ["**/*.mdx", "**/*.md"] }),
  schema: blogSchema,
});

export const collections = { enBlog, vnBlog };
