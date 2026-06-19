import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
        mdx: true,
      }),
    ],
  },
});
