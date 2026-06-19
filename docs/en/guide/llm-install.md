# LLM Installation Instructions

This page is written for AI coding agents that need to add `simple-code-inspector-plugin` to an existing project.

## Canonical facts

- Package name: `simple-code-inspector-plugin`
- Export name: `codeInspectorPlugin`
- Install it as a development dependency.
- Install only the public entry package. Do not add `@simple-code-inspector/*` packages directly; they are internal dependencies.
- Use `latest` (`1.6.2` or later). If the target project's lockfile pins `1.6.1`, update it.
- Add it only in the build configuration file. Do not import it from application source files.
- The plugin copies a clicked DOM element's source code location to the system clipboard during local development.
- Default copied text: `{file}:{line}:{column} <{tag}>`
- Default trigger: hold `Alt + Shift` (macOS: `Option + Shift`) and click a DOM element.
- Do not set `server: 'close'` when clipboard copy is required.

## Install command

Choose the package manager from the existing lockfile.

```sh
pnpm add simple-code-inspector-plugin@latest -D
```

```sh
npm install simple-code-inspector-plugin@latest -D
```

```sh
yarn add simple-code-inspector-plugin@latest -D
```

## Bundler selection

Use the `bundler` value that matches the host project:

| Project type | Configuration location | `bundler` |
| --- | --- | --- |
| Vite, Vite Vue, Vite React, Svelte, Solid, Qwik | `vite.config.*` | `vite` |
| Astro | `astro.config.*` under `vite.plugins` | `vite` |
| Webpack, Vue CLI, Next.js <= 14 | webpack config or webpack hook | `webpack` |
| Rspack, Rsbuild | rspack config or `tools.rspack.plugins` | `rspack` |
| Esbuild | esbuild plugin list | `esbuild` |
| Farm | `vitePlugins` | `vite` |
| Mako or Umi with Mako | mako plugin list | `mako` |
| Next.js 15 with Turbopack | `turbopack.rules` or `experimental.turbo.rules` | `turbopack` |

## Minimal configurations

### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineConfig({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
});
```

### Webpack

```js
// webpack.config.js
const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

module.exports = {
  plugins: [
    codeInspectorPlugin({
      bundler: 'webpack',
    }),
  ],
};
```

### Rspack

```ts
// rspack.config.ts
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default {
  plugins: [
    codeInspectorPlugin({
      bundler: 'rspack',
    }),
  ],
};
```

### Rsbuild

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineConfig({
  tools: {
    rspack: {
      plugins: [
        codeInspectorPlugin({
          bundler: 'rspack',
        }),
      ],
    },
  },
});
```

### Esbuild

```js
// esbuild.config.js
const esbuild = require('esbuild');
const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

esbuild.build({
  plugins: [
    codeInspectorPlugin({
      bundler: 'esbuild',
      dev: () => true,
    }),
  ],
});
```

### Astro

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineConfig({
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
      }),
    ],
  },
});
```

### Nuxt 3

```ts
// nuxt.config.ts
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineNuxtConfig({
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
      }),
    ],
  },
});
```

### Next.js <= 14

```js
// next.config.js
const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      codeInspectorPlugin({
        bundler: 'webpack',
      })
    );
    return config;
  },
};

module.exports = nextConfig;
```

### Next.js 15.0.x to 15.2.x

```ts
// next.config.ts
import type { NextConfig } from 'next';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: codeInspectorPlugin({
        bundler: 'turbopack',
      }),
    },
  },
};

export default nextConfig;
```

### Next.js >= 15.3.x

```ts
// next.config.ts
import type { NextConfig } from 'next';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

const nextConfig: NextConfig = {
  turbopack: {
    rules: codeInspectorPlugin({
      bundler: 'turbopack',
    }),
  },
};

export default nextConfig;
```

### Umi with Webpack

```ts
// .umirc.ts
import { defineConfig } from '@umijs/max';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineConfig({
  chainWebpack(memo) {
    memo.plugin('simple-code-inspector-plugin').use(
      codeInspectorPlugin({
        bundler: 'webpack',
      })
    );
  },
});
```

### Umi with Mako

```ts
// .umirc.ts
import { defineConfig } from 'umi';
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

export default defineConfig({
  mako: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'mako',
      }),
    ],
  },
});
```

## Useful options

```ts
codeInspectorPlugin({
  bundler: 'vite',
  copyFormat: '{file}:{line}:{column} <{tag}>',
  showSwitch: true,
  hotKeys: ['shiftKey', 'altKey'],
  pathType: 'relative',
});
```

- `copyFormat`: custom clipboard text format. Supports `{file}`, `{line}`, `{column}` and `{tag}`.
- `showSwitch`: shows a page switch, useful when keyboard shortcuts are inconvenient.
- `hotKeys`: custom trigger keys.
- `pathType`: default is `relative`. Use `absolute` when the copied path must include the full filesystem path.

## Verification checklist

1. Start the local development server.
2. Confirm the browser console prints the `simple-code-inspector-plugin` shortcut hint.
3. Hold the trigger keys and move over the page; an overlay should appear.
4. Click a DOM element; the source code location should be copied to the system clipboard.
5. On Linux, install one of `wl-copy`, `xclip` or `xsel` if clipboard copy fails.
