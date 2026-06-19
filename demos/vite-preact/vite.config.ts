import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { CodeInspectorPlugin } from 'simple-code-inspector-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // simple-code-inspector-plugin need to be used before @preact/preset-vite
    CodeInspectorPlugin({
      bundler: 'vite',
    }),
    preact(),
  ],
});
