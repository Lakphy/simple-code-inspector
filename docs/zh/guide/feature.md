# 功能大全

本篇介绍 `simple-code-inspector-plugin` 提供了所有功能。

## 复制源码位置

点击 DOM 元素时，`simple-code-inspector-plugin` 会将其源码位置复制到系统剪贴板，方便粘贴到终端或 AI 助手中。复制操作在 Node.js 层完成（本地 dev server 在浏览器中通常没有剪贴板权限），因此在本地开发时能稳定生效。

Simple Code Inspector 基于 [Code Inspector](https://github.com/zh-lx/code-inspector) fork 而来，原项目与原文说明见 [Code Inspector README](https://github.com/zh-lx/code-inspector#readme)。与上游不同，本项目会复制源码位置到系统剪贴板，而不是直接唤起 IDE。

你可以通过 [copyFormat](../api/advance.html#copyformat) 参数自定义复制的文本格式（默认 `{file}:{line}:{column} <{tag}>`）：

```js
codeInspectorPlugin({
  copyFormat: '{file}:{line}:{column} <{tag}>',
}),
```

### 完全自定义行为

`simple-code-inspector-plugin` 在点击元素遮罩层时内部会触发如下事件，因此你可以通过在代码中自定义 `code-inspector:trackCode` 事件去控制对应的表现。

```js
window.addEventListener('code-inspector:trackCode', () => {
  sendLog('trackCode');
});
```

## 快速选择元素

目前选择元素的方式有两种:

### 方式一(推荐)

在页面上按住组合键时，鼠标在页面移动即会在 DOM 上出现遮罩层并显示相关信息，点击一下即可将元素对应的源码位置复制到剪贴板。 (Mac 系统默认组合键是 `Option + Shift`；Window 的默认组合键是 `Alt + Shift`，在浏览器控制台会输出相关组合键提示)
![image](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/console-success.png)

### 方式二(移动端推荐)

当插件参数中配置了 `showSwitch: true` 时，会在页面显示一个`代码审查开关按钮`，点击可切换`代码审查模式`开启/关闭，`代码审查模式`开启后使用方式同方式一中按住组合键。当开关的颜色为彩色时，表示`代码审查模式`开启 <img src="https://github.com/lakphy/simple-code-inspector/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="20" style="display: inline-block;" />；当开关颜色为黑白时，表示`代码审查模式`关闭 <img src="https://user-images.githubusercontent.com/73059627/230129864-e2813188-8d49-4a8e-a6bc-dda19c79b491.png" width="20" style="display: inline-block;" />。

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)

## 滚轮切换父子元素

按住组合键时，通过滚轮可以切换父子元素：
- 向上滚动：切换至父元素
- 向下滚动：切换至子元素

![wheel](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wheel.gif)

## DOM 树选择元素

按住组合键时，右键点击元素，会打开 DOM 树选择元素，选择后会将选中元素对应的源码位置复制到剪贴板。

![dom-tree](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/dom-tree.gif)
