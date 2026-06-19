# LLM 安装说明

这页写给需要把 `simple-code-inspector-plugin` 接入已有项目的 AI 编码助手。

## 事实信息

- 包名：`simple-code-inspector-plugin`
- 导出名：`codeInspectorPlugin`
- 作为开发依赖安装。
- 只安装公开入口包，不要直接添加 `@simple-code-inspector/*` 子包；这些子包会作为内部依赖自动安装。
- 使用 `latest`（`1.6.2` 或更高版本）。如果目标项目 lockfile 锁定了 `1.6.1`，需要升级。
- 只在构建配置文件中引入，不要在业务源码中引入。
- 插件用于在本地开发时，将点击的 DOM 元素源码位置复制到系统剪贴板。
- 默认复制文本：`{file}:{line}:{column} <{tag}>`
- 默认触发方式：按住 `Alt + Shift`（macOS 为 `Option + Shift`）并点击 DOM 元素。
- 需要点击复制时，不要设置 `server: 'close'`。

## 安装命令

根据项目已有 lockfile 选择包管理器。

```sh
pnpm add simple-code-inspector-plugin@latest -D
```

```sh
npm install simple-code-inspector-plugin@latest -D
```

```sh
yarn add simple-code-inspector-plugin@latest -D
```

## 打包器选择

根据宿主项目选择 `bundler` 参数：

| 项目类型 | 配置位置 | `bundler` |
| --- | --- | --- |
| Vite、Vite Vue、Vite React、Svelte、Solid、Qwik | `vite.config.*` | `vite` |
| Astro | `astro.config.*` 的 `vite.plugins` | `vite` |
| Webpack、Vue CLI、Next.js <= 14 | webpack 配置或 webpack hook | `webpack` |
| Rspack、Rsbuild | rspack 配置或 `tools.rspack.plugins` | `rspack` |
| Esbuild | esbuild plugin 列表 | `esbuild` |
| Farm | `vitePlugins` | `vite` |
| Mako 或使用 Mako 的 Umi | mako plugin 列表 | `mako` |
| 使用 Turbopack 的 Next.js 15 | `turbopack.rules` 或 `experimental.turbo.rules` | `turbopack` |

## 最小配置

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

### Next.js 15.0.x 到 15.2.x

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

### 使用 Webpack 的 Umi

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

### 使用 Mako 的 Umi

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

## 常用选项

```ts
codeInspectorPlugin({
  bundler: 'vite',
  copyFormat: '{file}:{line}:{column} <{tag}>',
  showSwitch: true,
  hotKeys: ['shiftKey', 'altKey'],
  pathType: 'relative',
});
```

- `copyFormat`：自定义复制到剪贴板的文本格式，支持 `{file}`、`{line}`、`{column}`、`{tag}`。
- `showSwitch`：展示页面开关，适合不方便使用快捷键的场景。
- `hotKeys`：自定义触发组合键。
- `pathType`：默认是 `relative`。如果复制结果必须包含完整文件系统路径，则使用 `absolute`。

## 验证清单

1. 启动本地开发服务。
2. 确认浏览器控制台打印了 `simple-code-inspector-plugin` 的组合键提示。
3. 按住触发组合键并在页面移动鼠标，应出现 DOM 遮罩层。
4. 点击 DOM 元素，源码位置应被复制到系统剪贴板。
5. Linux 下如果复制失败，请安装 `wl-copy`、`xclip` 或 `xsel` 之一。
