---
title: Consulta de mídia no React para design responsivo
---
# useMediaQuery

<p class="description">Это хук медиа-запроса CSS для React. Он ожидает(слушает) совпадения с медиа-запросом CSS. Он позволяет отображать компоненты в зависимости от того, соответствует запрос или нет.</p>

> Использование `useMediaQuery` нестабильно, поскольку хуки еще не стабильны, поэтому он экспортируется с нестабильным префиксом. Please note that it depends on *react@next* and *react-dom@next*.

Some of the key features:

- ⚛️ Имеет идиоматический React API.
- 🚀 Он производителен. Он наблюдает за документом, чтобы определить, когда его медиа-запросы изменяются, вместо периодического опроса значения.
- 📦 Сжатый меньше чем [700 B](https://github.com/mui-org/material-ui/blob/master/.size-limit.js).
- 💄 Это альтернатива упрощения react-responsive и react-media.
- 🤖 Поддерживает рендеринг на стороне сервера.

## Простой медиа-запрос

Вы должны предоставить медиа-запросу первый аргумент хука. Строка медиа-запроса может быть любым допустимым значением медиа-запросом CSS, например, `'print'`.

```jsx
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```

{{"demo": "pages/layout/use-media-query/SimpleMediaQuery.js", "react": "next"}}

## Использование помощников точек перелома Material-UI

Вы можете использовать [помощников точек перелома Material-UI](/layout/breakpoints/) следующим образом:

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

## Server-side rendering

An implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) is required on the server, we recommend using [css-mediaquery](https://github.com/ericf/css-mediaquery). We also encourage the usage of the `unstable_useMediaQueryTheme` version of the hook that fetches properties from the theme. This way, you can provide a `ssrMatchMedia` option once for all your React tree.

{{"demo": "pages/layout/use-media-query/ServerSide.js", "react": "next"}}

## Migrating from `withWidth()`

The `withWidth()` higher-order component injects the screen width of the page. You can reproduce the same behavior as follow:

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

#### Arguments

1. `query` (*String*): A string representing the media query to handle.
2. `options` (*Object* [optional]): 
    - `options.defaultMatches` (*Boolean* [optional]): As `window.matchMedia()` is unavailable on the server, we return a default matches during the first mount. The default value is `false`.
    - `options.noSSR` (*Boolean* [optional]): Defaults to `false`. In order to perform the server-side rendering reconciliation, it needs to render twice. A first time with nothing and a second time with the children. This double pass rendering cycle comes with a drawback. It's slower. You can set this flag to `true` if you are **not doing server-side rendering**.
    - `options.ssrMatchMedia` (*Function* [optional]) You might want to use an heuristic to approximate the screen of the client browser. For instance, you could be using the user-agent or the client-hint https://caniuse.com/#search=client%20hint. You can provide a global ponyfill using [`custom properties`](/customization/themes/#properties) on the theme. Check the [server-side rendering example](#server-side-rendering).

#### Returns

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### Примеры

```jsx
import React from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```