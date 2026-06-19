# Frequently Asked Questions

Simple Code Inspector is forked from [Code Inspector](https://github.com/zh-lx/code-inspector). See the original project and its [README](https://github.com/zh-lx/code-inspector#readme). When reading older Code Inspector guidance, note that this fork copies source locations to the clipboard instead of launching an IDE directly.

## Do I need to manually distinguish between production/development environments?

The plugin automatically detects whether it's in production or development environment based on the bundler's internal parameters. It only takes effect in the development environment, so users don't need to manually distinguish between production and development environments.

## Using in Micro-Frontend

If you encounter issues where DOM selection and copying don't work in micro-frontend child projects, you need to apply `simple-code-inspector-plugin` in both the main project and child projects for normal operation.

If the main and child applications of micro-frontend are distributed in multiple repositories, you need to add the configuration `pathType: 'absolute'` to the plugin.

## SSR Scenarios

Most conventional framework SSR projects are supported by default. For custom-rendered SSR projects, please join our user group for adaptation guidance.

## Eslint Plugin Errors

If this plugin causes Eslint Plugin errors, please add `enforcePre: false` to your `simple-code-inspector-plugin` configuration.

## How to ignore certain files

You can add `code-inspector-ignore` or `code-inspector-disable` comments to certain files to ignore them, for example:

- vue / svelte files:
  ```html
  <!-- code-inspector-ignore -->
  ```
  
- jsx / tsx / ts files:
  ```javascript
  // code-inspector-ignore
  ```

## Other Issues

If you encounter any unresolvable issues, please [join our user group](/more/feedback) or submit an [issue](https://github.com/lakphy/simple-code-inspector/issues) on GitHub. Most problems can be resolved through group consultation.
