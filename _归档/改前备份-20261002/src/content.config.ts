import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        type: z.enum(['product', 'blog', 'solution', 'case']).optional(),
        price: z.string().optional(),
        pain_point: z.string().optional(),
        core_selling: z.string().optional(),
      }),
    }),
  }),
};