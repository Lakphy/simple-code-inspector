import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      formats: ['cjs', 'es'],
      fileName: '[name]',
      name: 'CodeInspectorPlugin',
    },
    minify: true,
    emptyOutDir: false,
    rollupOptions: {
      external: [
        '@simple-code-inspector/core',
        '@simple-code-inspector/vite',
        '@simple-code-inspector/webpack',
        '@simple-code-inspector/esbuild',
        '@simple-code-inspector/turbopack',
        '@simple-code-inspector/mako',
        'chalk',
        'path',
        'url',
      ],
    },
    target: ['node8', 'es2015'],
  },
});
