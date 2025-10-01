import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
  // optional frontmatter flag to mark a post/project as active
  active: z.boolean().optional(),
  // optional frontmatter flag to mark a post as featured
  featured: z.boolean().optional(),
    image: z.string(),
    tags: z.array(z.string()),
    projectURL: z.string().optional(),
    repoURL: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts };