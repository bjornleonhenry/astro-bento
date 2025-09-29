import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    projectURL: z.string().optional(),
    repoURL: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts };