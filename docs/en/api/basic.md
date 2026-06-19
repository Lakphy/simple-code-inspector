# Basic Configuration

Simple Code Inspector is forked from [Code Inspector](https://github.com/zh-lx/code-inspector). See the original project and its [README](https://github.com/zh-lx/code-inspector#readme). This fork replaces direct IDE launching with copying the source code location to the system clipboard.

The detailed parameter configuration for `codeInspectorPlugin` is shown below:

```typescript
import { codeInspectorPlugin } from 'simple-code-inspector-plugin';

codeInspectorPlugin({
  bundler: 'vite',
  // See below for other properties...
});
```

## bundler

- Required
- Type: `string`
- Available values: `vite / webpack / rspack / esbuild`
- Description: Specifies the bundler tool used in the current project

## dev <Badge type="tip" text="0.5.0+" vertical="middle" />

- Optional
- Type: `boolean | (() => boolean)`
- Description: `simple-code-inspector-plugin` automatically determines the current environment based on bundler information and only works in the `development` environment. In some cases, such as older versions of `webpack` or custom environment variables, the `development` environment detection might fail, causing `simple-code-inspector-plugin` to not work. In such cases, you can manually add logic to determine if it's a `development` environment by setting the `dev` parameter to make `simple-code-inspector-plugin` work.

## enforcePre <Badge type="tip" text="0.4.0+" vertical="middle" />

- Optional. Default value is `true`
- Type: `boolean`
- Description: Whether to add `enforce: 'pre'` configuration for `simple-code-inspector-plugin`. Some projects (especially those created by `vue-cli`) have built-in `eslint-loader`. If `simple-code-inspector-plugin`'s compilation logic runs before `eslint-loader`'s validation logic, it might cause `eslint-loader` to throw errors. In this case, set this option to `false` to make `simple-code-inspector-plugin`'s compilation logic run after `eslint-loader`'s validation logic.

## hotKeys

- Optional. Default value is `['altKey', 'shiftKey']`
- Type: `('ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey')[]`
- Description: Keyboard shortcuts to trigger the source code location feature. An empty array will disable the shortcut trigger feature. (`ctrlKey` corresponds to the `control` key on Mac; `altKey` corresponds to the `option` key on Mac; `metaKey` corresponds to the `command` key on Mac)

## showSwitch

- Optional. Default value is `false`
- Type: `boolean`
- Description: Whether to display a switch on the page to enable and disable the source code location feature. When using on mobile devices, keyboard shortcuts might not be convenient, so it's recommended to use this switch to enable and disable the source code location feature.

## autoToggle

- Optional. Default value is `true`
- Type: `boolean`
- Description: Used with `showSwitch: true`. After triggering the copy feature, it automatically turns off the `switch` functionality. (This is mainly to prevent accidental triggering of the source code location feature when users switch back to the page and it gains focus.)
