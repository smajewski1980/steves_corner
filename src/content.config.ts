import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

const nascarCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/nascar",
    // Automatically strips out file extensions and /index suffixes from post.id
    generateId: ({ entry }) => {
      return entry.replace(/\/index$/, "").replace(/\.(md|mdx)$/, "");
    },
  }),
  schema: ({ image }) =>
    z.object({
      raceTitle: z.string(),
      raceDate: z.date(),
      raceWinner: z.string().optional(), // remove the optional later
      mainImage: image(),
      mainImageAlt: z.string(),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  blog: blogCollection,
  nascar: nascarCollection,
};
