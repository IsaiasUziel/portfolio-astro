import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localeSchema = z.enum(['es', 'en']);

const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    locale: localeSchema,
    published: z.boolean().default(true),
    name: z.string(),
    headline: z.string(),
    location: z.string(),
    summary: z.array(z.string()).min(1),
    availability: z.string(),
    order: z.number().default(1),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    locale: localeSchema,
    published: z.boolean().default(true),
    company: z.string(),
    role: z.string(),
    location: z.string(),
    start: z.coerce.string(),
    end: z.coerce.string().optional(),
    bullets: z.array(z.string()).min(1),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    locale: localeSchema,
    published: z.boolean().default(true),
    title: z.string(),
    excerpt: z.string(),
    stack: z.array(z.string()).min(1),
    href: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    locale: localeSchema,
    published: z.boolean().default(true),
    categories: z
      .array(
        z.object({
          title: z.string(),
          items: z.array(z.string()).min(1),
        }),
      )
      .min(1),
    order: z.number().default(1),
  }),
});

const contactSocial = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contact-social' }),
  schema: z.object({
    locale: localeSchema,
    published: z.boolean().default(true),
    email: z.email(),
    linkedin: z.url(),
    website: z.url().optional(),
    order: z.number().default(1),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    locale: localeSchema,
    published: z.boolean().default(false),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// Seeded manually from LinkedIn recommendations — dynamic LinkedIn API integration planned for Phase 2
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    published: z.boolean().default(true),
    name: z.string(),
    role: z.string(),
    linkedin: z.url(),
    relation: z.string(),
    date: z.string(),
    quote: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = {
  profile,
  experience,
  projects,
  skills,
  'contact-social': contactSocial,
  writing,
  testimonials,
};
