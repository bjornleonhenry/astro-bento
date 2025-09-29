import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts };