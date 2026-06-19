import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
  test: {
    environment: 'jsdom',
    fileParallelism: false,
    coverage: {
      include: ['packages/*/src/**'],
    },
    alias: {
      '@': path.resolve(__dirname, 'packages'),
      '@simple-code-inspector/core': path.resolve(__dirname, 'packages/core/src'),
      '@simple-code-inspector/vite': path.resolve(__dirname, 'packages/vite/src'),
      '@simple-code-inspector/webpack': path.resolve(__dirname, 'packages/webpack/src'),
      '@simple-code-inspector/esbuild': path.resolve(__dirname, 'packages/esbuild/src'),
      '@simple-code-inspector/mako': path.resolve(__dirname, 'packages/mako/src'),
      '@simple-code-inspector/turbopack': path.resolve(__dirname, 'packages/turbopack/src'),
    }
  },
})