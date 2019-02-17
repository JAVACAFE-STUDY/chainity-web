---
title: React中的媒体查询用于响应式设计
---
# useMediaQuery

<p class="description">这是React的CSS媒体查询钩子。 它侦听与CSS媒体查询的匹配。 它允许根据查询是否匹配来呈现组件。</p>

> ⚠️ `useMediaQuery` 钩是还不稳定，因此它被出口与不稳定的前缀是不稳定的。 请注意，它取决于 *react@next* 和 *react-dom@next*。

一些关键特点：

- ⚛️它有一个惯用的React API。
- 🚀它具有高性能，它会观察文档以检测其媒体查询何时发生更改，而不是定期轮询值。
- 📦小于 [700 B gzipped](https://github.com/mui-org/material-ui/blob/master/.size-limit.js)。
- 💄它是反应敏感和反应媒体的替代方案，旨在简化。
- 🤖它支持服务器端渲染。

## 简单的媒体查询

您应该为挂钩的第一个参数提供媒体查询。 媒体查询字符串可以由任何有效的CSS媒体查询，如 `'print'`。

```jsx
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```

{{"demo": "pages/layout/use-media-query/SimpleMediaQuery.js", "react": "next"}}

## 使用Material-UI的断点助手

您可以使用Material-UI的 [断点助手](/layout/breakpoints/) ，如下所示：

```jsx
import { useTheme } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "pages/layout/use-media-query/ThemeHelper.js", "react": "next"}}

## 服务器端呈现

服务器上需要实现 [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) ，我们建议使用 [css-mediaquery](https://github.com/ericf/css-mediaquery)。 我们还鼓励使用从主题中获取属性的 `unstable_useMediaQueryTheme` 版本的钩子。 这样，您可以为所有React树提供一次 `ssrMatchMedia` 选项。

{{“demo”：“pages / layout / use-media-query / ServerSide.js”，“react”：“next”}}

## 从 `迁移withWidth（）`

`withWidth()` 高阶组件注入页面的屏幕宽度。 您可以重现与以下相同的行为：

```jsx
function MyComponent() {
  const theme = useTheme();
  const width =
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || 'xs';

  return <span>{width}</span>;
}
```

{{"demo": "pages/layout/use-media-query/UseWidth.js", "react": "next"}}

## API

### `unstable_useMediaQuery(query, [options]) => matches`

#### 参数

1. `query` （*String*）：表示要处理的媒体查询的字符串。
2. `选项` (*Object* [optional]): 
    - `options.defaultMatches` （*布尔值* [optional]）： 作为 `window.matchMedia()` 在服务器上不可用， 我们在第一次安装时返回默认匹配。 默认值为 `false`。
    - `options.noSSR` (*Boolean* [optional]): 默认值为`false`。 为了执行服务器端呈现协调，它需要呈现两次。 第一次没有任何东西，第二次与孩子们在一起。 这种双遍渲染周期有一个缺点。 它慢了。 您可以将此标志设置为 `真` ，如果你是 **没有做服务器端渲染**。
    - `options.ssrMatchMedia` （*功能* [optional]）您可能希望使用启发式来近似 客户端浏览器的屏幕。 例如，您可以使用用户代理或客户端提示https://caniuse.com/#search=client%20hint。 您可以使用主题上的 [`自定义属性`](/customization/themes/#properties) 提供全局ponyfill。 检查 [服务器端呈现示例](#server-side-rendering)。

#### 返回结果

`匹配`：匹配是 `真` 如果文档当前匹配的媒体的查询和 `假` 时它没有。

#### 例子

```jsx
import React from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```