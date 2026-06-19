---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Simple Code Inspector'
  text: 'A Magic Tool for Developing'
  tagline: Click on the DOM element on the page, and it copies the source code location of the DOM to your clipboard.
  image:
    src: /logo.svg
    alt: ChoDocs
  actions:
    - theme: brand
      text: Get Started
      link: /guide/start
    - theme: alt
      text: Feedback
      link: /more/feedback
    - theme: alt
      text: Original Project
      link: https://github.com/zh-lx/code-inspector
    - theme: alt
      text: Original README
      link: https://github.com/zh-lx/code-inspector#readme

features:
  - icon: 🚀
    title: Improve Efficiency
    details: Click on the DOM element on the page, and it copies the source code location to your clipboard, greatly improving development experience and efficiency.
  - icon: 📖
    title: User-Friendly
    details: No intrusion into the source code, effective by simply including it in the bundler, the entire integration process is as easy as drinking water.
  - icon: 🎨
    title: Strong Adaptability
    details: Supports usage in webpack/vite/rspack/nextjs/nuxt/umijs, and supports multiple frameworks such as Vue/React/Preact/Solid/Qwik/Svelte/Astro.
  - icon: 📌
    title: Forked from Code Inspector
    details: Simple Code Inspector is forked from Code Inspector. It keeps the DOM-to-source-location workflow, but copies the location to the clipboard instead of launching an IDE directly.
---
