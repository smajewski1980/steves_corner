import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

export const CATEGORIES = ["category-1", "category-2", "category-3"] as const;

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    category: z.enum(CATEGORIES),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

// when i switched from .md to .mdx i had to
// strip the end off the post.id for the url
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
      raceWinner: z.string(),
      mainImage: image(),
      mainImageAlt: z.string(),
      tags: z.array(z.string()),
    }),
});

export const MUSIC_COLLECTION_CATEGORIES = [
  "physical-media",
  "memorabilia",
  "equipment",
] as const;

const musicCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/music",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      artist: z.string(),
      category: z.enum(MUSIC_COLLECTION_CATEGORIES),
      tags: z.array(z.string()),
      coverImage: image(),
      coverImageAlt: z.string(),
      dateAdded: z.date(),
      imageAttribution: z.string().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
  nascar: nascarCollection,
  music: musicCollection,
};
