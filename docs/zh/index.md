---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Simple Code Inspector'
  # text: 'A Magic Tool for Developing'
  # tagline: Click the dom on the page, it copies the dom's source code location to your clipboard
  text: '页面开发提效的神器'
  tagline: 点击页面上的 DOM 元素，它能将 DOM 的源代码位置复制到剪贴板
  image:
    src: /logo.svg
    alt: ChoDocs
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/start
    - theme: alt
      text: 加入用户群
      link: /more/feedback
    - theme: alt
      text: 原项目
      link: https://github.com/zh-lx/code-inspector
    - theme: alt
      text: 原文说明
      link: https://github.com/zh-lx/code-inspector#readme

features:
  - icon: 🚀
    title: 开发提效
    details: 点击页面上的 DOM 元素，它能将 DOM 的源代码位置复制到剪贴板，大幅提升开发体验和效率
  - icon: 📖
    title: 简单易用
    details: 对源代码无任何侵入，只需要在打包工具中引入就能够生效，整个接入过程如喝水般一样简单
  - icon: 🎨
    title: 适配性强
    details: 支持在 webpack/vite/rspack/nextjs/nuxt/umijs 中使用，支持 vue/react/preact/solid/qwik/svelte/astro 等多个框架
  - icon: 📌
    title: Fork 自 Code Inspector
    details: Simple Code Inspector 基于 Code Inspector fork 而来，保留 DOM 到源码位置的定位能力，但改为复制源码位置到剪贴板，而不是直接唤起 IDE。
---
