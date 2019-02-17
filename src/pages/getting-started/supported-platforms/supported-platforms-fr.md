# Plateformes supportées

<p class="description">En savoir plus sur les plateformes, des plus anciennes aux plus modernes, prises en charge par Material-UI.</p>

## Navigateur

Material-UI prend en charge les dernières versions stables de tous les principaux navigateurs et plates-formes. Nous supportons également Internet Explorer 11. You don't need to provide any JavaScript polyfill as we manage unsupported browser features internally and in isolation.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |

Étant donné que Googlebot utilise un service de rendu Web (WRS) pour indexer le contenu de la page, il est essentiel que Material-UI le prenne en charge. [WRS est basé sur Chrome 41](https://developers.google.com/search/docs/guides/rendering). Vous pouvez vous attendre à ce que les composants de Material-UI soient rendus sans problèmes majeurs.

## Serveur

Because Material-UI supports server-side rendering, we need to support the latest, stable releases of [Node.js](https://github.com/nodejs/node). We try to support the [last active LTS version](https://github.com/nodejs/Release#lts-schedule1). Right now, we support **node v6.x** and newer versions.

### CSS prefixing

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor specific prefixes. These prefixes are automatically added on the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

The CSS served on this documentation is processed with [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). You can use [the documentation implementation](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) as inspiration. Be aware that it has an implication with the performance of the page. It's a must do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.