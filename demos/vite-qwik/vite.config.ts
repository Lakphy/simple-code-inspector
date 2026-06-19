import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite'
    }),
    qwikVite({
      csr: true,
    }),
  ],
})
