# 剪贴板

`simple-code-inspector-plugin` 会将点击元素的源码位置复制到系统剪贴板。

## 工作原理

1. 编译阶段会在你的 DOM 元素上注入 `data-insp-path` 属性（`file:line:column:tag`）。
2. 当你按住组合键点击元素时，浏览器会把该位置信息发送给本地的 Node.js server。
3. Node.js server 将格式化后的源码位置写入**系统剪贴板**。

复制操作之所以放在 Node.js 层完成，是因为本地 dev server 通常以纯 `http://localhost` 提供服务，浏览器的剪贴板 API 在此场景下不可用或被拦截。在 Node.js 层执行复制可以保证本地开发时稳定生效。

## 复制的文本格式

默认复制的文本为 `{file}:{line}:{column} <{tag}>`，例如：

```
/Users/me/project/src/App.tsx:12:3 <div>
```

你可以通过 [`copyFormat`](../api/advance.html#copyformat) 配置自定义，支持 `{file}`、`{line}`、`{column}`、`{tag}` 模版：

```ts
codeInspectorPlugin({
  bundler: 'vite',
  copyFormat: '{file}:{line}:{column}',
});
```

## 平台支持

复制能力使用操作系统自带的工具实现，无需额外依赖：

- **macOS**：`pbcopy`
- **Windows**：`clip`
- **Linux**：依次尝试 `wl-copy`、`xclip`、`xsel`——如果复制失败，请安装其中之一（如 `sudo apt install xclip`）。

如果上述工具均不可用，会在终端打印一条警告，请求被忽略，但不会导致 dev server 崩溃。
