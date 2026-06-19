# Feature All

This article introduces all the features provided by `simple-code-inspector-plugin`.

## Copy Source Code Location

When you click a DOM element, `simple-code-inspector-plugin` copies its source code location to your clipboard, ready to paste into your terminal or AI assistant. The copy is performed in the Node.js layer (local dev servers usually lack clipboard permission in the browser), so it works reliably during local development.

You can customize the copied text via the [copyFormat](../api/advance.html#copyformat) parameter (default `{file}:{line}:{column} <{tag}>`):

```js
codeInspectorPlugin({
  copyFormat: '{file}:{line}:{column} <{tag}>',
}),
```

### Custom Behavior

`simple-code-inspector-plugin` will trigger the following event when clicking the element mask layer, so you can customize the `code-inspector:trackCode` event in the code to control the corresponding behavior.

```js
window.addEventListener('code-inspector:trackCode', () => {
  sendLog('trackCode'); 
});
```

## Quick Select Element

There are two ways to select elements:

### Way One (Recommended)

When you press the combination key on the page, the mouse moves on the page will show a mask layer and display related information, click once to copy the source code location of the element to your clipboard. (The default combination key for Mac is `Option + Shift`; the default combination key for Windows is `Alt + Shift`, the combination key will be output in the browser console.)

![image](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/console-success.png)

### Way Two (Mobile Recommended)

When the `showSwitch: true` parameter is configured in the plugin parameters, a `code inspection switch button` will be displayed on the page, clicking which can toggle the `code inspection mode` on/off. When the switch is colored, it means the `code inspection mode` is on <img src="https://github.com/lakphy/simple-code-inspector/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="20" style="display: inline-block;" />; when the switch is黑白, it means the `code inspection mode` is off <img src="https://user-images.githubusercontent.com/73059627/230129864-e2813188-8d49-4a8e-a6bc-dda19c79b491.png" width="20" style="display: inline-block;" />.

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)

## Scroll Switch Parent/Child Element

When the combination key is pressed, the parent/child elements can be switched by scrolling with the mouse wheel:
- Scroll up: switch to parent element
- Scroll down: switch to child element 

![wheel](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wheel.gif)

## DOM Tree Select Element

When the combination key is pressed, right-click on an element, the DOM tree selection element will be opened, and after selection, the source code location of the selected element will be copied to your clipboard.

![dom-tree](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/dom-tree.gif)
