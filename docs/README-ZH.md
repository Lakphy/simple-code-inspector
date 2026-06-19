<div align="center">
<img src="https://github.com/lakphy/simple-code-inspector/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="160px" style="margin-bottom: 12px;" />

<p align="center">
  <h2>simple-code-inspector-plugin</h2>
  <a href="https://inspector.fe-dev.cn">中文文档</a> | <a href="https://inspector.fe-dev.cn/en">Documentation</a>
</p>

[![NPM version](https://img.shields.io/npm/v/simple-code-inspector-plugin.svg)](https://www.npmjs.com/package/simple-code-inspector-plugin)
[![GITHUB star](https://img.shields.io/github/stars/lakphy/simple-code-inspector?style=flat&label=%E2%AD%90%EF%B8%8F%20stars)](https://github.com/lakphy/simple-code-inspector)
[![NPM Downloads](https://img.shields.io/npm/dm/simple-code-inspector-plugin.svg)](https://npmcharts.netlify.app/compare/simple-code-inspector-plugin?minimal=true)
[![MIT-license](https://img.shields.io/npm/l/code-inspector.svg)](https://opensource.org/licenses/MIT)
[![GITHUB-language](https://img.shields.io/github/languages/top/lakphy/simple-code-inspector?logoColor=purple&color=purple)](https://github.com/lakphy/simple-code-inspector)

</div>

<hr />

## 📖 介绍

点击页面上的元素，即可将元素对应的源码位置复制到剪贴板，方便粘贴到终端或 AI 助手中。

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)

## 💻 在线体验

- [vue online demo](https://stackblitz.com/edit/vitejs-vite-4pseos?file=vite.config.ts)
- [react online demo](https://stackblitz.com/edit/vitejs-vite-svtwrr?file=vite.config.ts)
- [preact online demo](https://stackblitz.com/edit/vitejs-vite-iyawbf?file=vite.config.ts)
- [solid online demo](https://stackblitz.com/edit/solidjs-templates-6u76jn?file=vite.config.ts)
- [qwik online demo](https://stackblitz.com/edit/vitejs-vite-antzds?file=vite.config.ts)
- [svelte online demo](https://stackblitz.com/edit/vitejs-vite-zoncqr?file=vite.config.ts)
- [astro online demo](https://stackblitz.com/edit/withastro-astro-f5xq1t?file=astro.config.mjs)

## 🎨 支持列表

当前支持的编译器、web 框架如下:

- 当前支持以下打包工具<br />
  ✅ webpack<br />
  ✅ vite<br />
  ✅ rspack / rsbuild<br />
  ✅ next.js / Nuxt / Umijs 等
- 当前支持以下 Web 框架<br />
  ✅ vue2<br />
  ✅ vue3<br />
  ✅ react<br />
  ✅ preact<br />
  ✅ solid<br />
  ✅ qwik<br />
  ✅ svelte<br />
  ✅ astro

## 🚀 安装

```perl
npm i simple-code-inspector-plugin -D
# or
yarn add simple-code-inspector-plugin -D
# or
pnpm add simple-code-inspector-plugin -D
```

## 🌈 使用

完整的接入及使用方式请查看：[simple-code-inspector-plugin 配置](https://inspector.fe-dev.cn/guide/start.html#%E9%85%8D%E7%BD%AE)

- 1.配置打包工具

  <details>
    <summary>点击展开查看 <b>webpack</b> 项目配置</summary>

  ```js
  // webpack.config.js
  const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

  module.exports = () => ({
    plugins: [
      codeInspectorPlugin({
        bundler: 'webpack',
      }),
    ],
  });
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>vite</b> 项目配置</summary>

  ```js
  // vite.config.js
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

  </details>

  <details>
    <summary>点击展开查看 <b>rspack</b> 项目配置</summary>

  ```js
  // rspack.config.js
  const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

  module.exports =  = {
    // other config...
    plugins: [
      codeInspectorPlugin({
        bundler: 'rspack',
      }),
      // other plugins...
    ],
  };
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>rsbuild</b> 项目配置</summary>

  ```js
  // rsbuild.config.js
  const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

  module.exports = {
    // other config...
    tools: {
      rspack: {
        plugins: [
          codeInspectorPlugin({
            bundler: 'rspack',
          }),
        ],
      },
    },
  };
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>vue-cli</b> 项目配置</summary>

  ```js
  // vue.config.js
  const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

  module.exports = {
    // ...other code
    chainWebpack: (config) => {
      config.plugin('simple-code-inspector-plugin').use(
        codeInspectorPlugin({
          bundler: 'webpack',
        })
      );
    },
  };
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>nuxt</b> 项目配置</summary>

  nuxt3.x :

  ```js
  // nuxt.config.js
  import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    vite: {
      plugins: [codeInspectorPlugin({ bundler: 'vite' })],
    },
  });
  ```

  nuxt2.x :

  ```js
  // nuxt.config.js
  import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

  export default {
    build: {
      extend(config) {
        config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
        return config;
      },
    },
  };
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>next.js</b> 项目配置</summary>

  ```js
  // next.config.js
  const { codeInspectorPlugin } = require('simple-code-inspector-plugin');

  const nextConfig = {
    webpack: (config, { dev, isServer }) => {
      config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
      return config;
    },
  };

  module.exports = nextConfig;
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>umi.js</b> 项目配置</summary>

  ```js
  // umi.config.js or umirc.js
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
    // other config
  });
  ```

  </details>

  <details>
    <summary>点击展开查看 <b>astro</b> 项目配置</summary>

  ```js
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
  import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

  export default defineConfig({
    vite: {
      plugins: [codeInspectorPlugin({ bundler: 'vite' })],
    },
  });
  ```

  </details>

- 2.使用功能

  现在你可以尽情的使用功能了！~

  在页面上按住组合键时，鼠标在页面移动即会在 DOM 上出现遮罩层并显示相关信息，点击一下即可将元素对应的源码位置（如 `/src/App.tsx:12:3 <div>`）复制到剪贴板。 (Mac 系统默认组合键是 `Option + Shift`；Window 的默认组合键是 `Alt + Shift`，在浏览器控制台会输出相关组合键提示)

  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/console-success.png" width="700px" />

## 👨‍💻 Contributors

特别鸣谢本项目的贡献者：<br />
<img src="https://contrib.rocks/image?repo=lakphy/simple-code-inspector" height="40" />

## 📧 交流与反馈

任何使用问题可以加入 QQ 群 `769748484`、微信群或者添加作者微信 `zhoulx1688888` 进行咨询与反馈:

<div style="display: flex; column-gap: 16px; row-gap: 16px; flex-wrap: wrap;">
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/qq-group.png" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-group.jpg" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-qrcode.jpg" width="200" height="272" />
</div>

## 💖 赞助

赞助此项目可以帮助作者更好地创作，如果您愿意，可以通过支付宝或微信对作者进行赞助：

<div style="display: flex; column-gap: 16px; row-gap: 16px; flex-wrap: wrap;">
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wxpay.jpg" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/alipay.jpg" width="180" height="272" />
</div>
