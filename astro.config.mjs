import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://icordero.dev',
  integrations: [mdx()],
  adapter: vercel(),
});
