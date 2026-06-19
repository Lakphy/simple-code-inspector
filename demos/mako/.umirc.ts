import { defineConfig } from 'umi';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
  ],
  npmClient: 'pnpm',
  mako: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'mako',
      }),
    ],
  },
});
