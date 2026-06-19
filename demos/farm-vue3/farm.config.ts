import { defineConfig } from '@farmfe/core';
import vue from '@vitejs/plugin-vue';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin'

export default defineConfig({
  vitePlugins: [
    vue(),
    codeInspectorPlugin({
      bundler: 'vite'
    })
  ]
});
