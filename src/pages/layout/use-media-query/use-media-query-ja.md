---
title: Consulta de mídia no React para design responsivo
---
# useMediaQuery

<p class="description">This is a CSS media query hook for React. It listens for matches to a CSS media query. It allows the rendering of components based on whether the query matches or not.</p>

> ⚠️ `useMediaQuery` is unstable as hooks aren't stable yet, therefore it is exported with an unstable prefix. Please note that it depends on *react@next* and *react-dom@next*.

Some of the key features:

- ⚛️ It has an idiomatic React API.
- 🚀 It's performant, it observes the document to detect when its media queries change, instead of polling the values periodically.
- 📦 Less than [700 B gzipped](https://github.com/mui-org/material-ui/blob/master/.size-limit.js).
- 💄 It's an alternative to react-responsive and react-media that aims for simplicity.
- 🤖 It supports Server-side rendering.

## Simple media query

You should provide a media query to the first argument of the hook. The media query string can by any valid CSS media query, e.g. `'print'`.

```jsx
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```

{{"demo": "pages/layout/use-media-query/SimpleMediaQuery.js", "react": "next"}}

## Using Material-UI's breakpoint helpers

You can use Material-UI's [breakpoint helpers](/layout/breakpoints/) as follows:

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

#### Examples

```jsx
import React from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```