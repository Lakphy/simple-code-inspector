# Introduction

`simple-code-inspector-plugin` is a tool designed to enhance development efficiency based on `webpack/vite/rspack/nextjs/nuxt/umijs plugin`. By clicking on the DOM elements in your web page, it copies the corresponding source code location (e.g. `/src/App.tsx:12:3 <div>`) to your clipboard, ready to paste into your terminal or AI assistant.

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)

## Motive

In web development, to modify a module code, we first need to find the corresponding code file for the module. For some large projects with a large number of code files and deep file levels, it is not easy to quickly find the corresponding code files. Especially for developers who are new to a project, searching for the code corresponding to the module is often time-consuming and laborious.

Therefore, we yearn for a way for developers to quickly locate the code corresponding to the module, and `simple-code-inspector-plugin` has emerged. With just one click of the mouse, you can copy the source code location of the DOM to your clipboard, greatly improving the experience and efficiency of developers.

## Advantages

Compared to similar tools on the market, `simple-code-inspector-plugin` has some obvious leading advantages:

### Improve Efficiency

Click on a DOM element on the page, and it copies the source code location of the DOM to your clipboard. This greatly enhances the development experience and efficiency.

### User-Friendly

No intrusion into the source code, effective by simply including it in the bundler, the entire integration process is as easy as drinking water.

### Strong Adaptability

Supports usage in `webpack/vite/rspack/rsbuild/esbuild/farm/mako`, and supports multiple frameworks such as `vue/react/preact/solid/qwik/svelte/astro/nextjs/nuxt/umijs`.
