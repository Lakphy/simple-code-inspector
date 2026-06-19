# Clipboard

`simple-code-inspector-plugin` copies the clicked element's source code location to your system clipboard.

## How it works

1. During compilation, a `data-insp-path` attribute (`file:line:column:tag`) is injected into your DOM elements.
2. When you click an element (while holding the shortcut), the browser sends the location to a local Node.js server.
3. The Node.js server writes the formatted source code location to your **system clipboard**.

The copy is performed in the Node.js layer on purpose: local dev servers are usually served over plain `http://localhost`, where the browser's Clipboard API is unavailable or blocked. Doing the copy in Node.js makes it reliable during local development.

## Copied text format

By default the copied text is `{file}:{line}:{column} <{tag}>`, e.g.:

```
/Users/me/project/src/App.tsx:12:3 <div>
```

You can customize it with the [`copyFormat`](../api/advance.html#copyformat) option, which supports the `{file}`, `{line}`, `{column}` and `{tag}` templates:

```ts
codeInspectorPlugin({
  bundler: 'vite',
  copyFormat: '{file}:{line}:{column}',
});
```

## Platform support

The clipboard write uses the operating system's built-in tools, with no extra dependency:

- **macOS**: `pbcopy`
- **Windows**: `clip`
- **Linux**: tries `wl-copy`, then `xclip`, then `xsel` — install one of them (e.g. `sudo apt install xclip`) if copying fails.

If none of the tools are available, a warning is printed to the terminal and the request is ignored without crashing the dev server.
