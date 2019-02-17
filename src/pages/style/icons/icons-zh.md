---
components: Icon, SvgIcon
---
# Icons

<p class="description">在Material-UI中使用图标的建议和指导。</p>

一个[系统图标](https://material.io/design/iconography/system-icons.html)或UI图标，可以用来代表一个命令、文件、或者目录。 系统图标还常在app bar、工具栏、按钮、和列表中用来表示一些常见操作，如删除、打印、和保存。 Google在该规范下提供了一套[Material icons](https://material.io/tools/icons/?style=baseline)。

Material-UI提供了两个组件来渲染系统图标：`SvgIcon` 用SVG路径来渲染，`Icon` 用字体来渲染。

## SVG 图标

`SvgIcon` 将SVG `path` 作为子组件，将它转换为展示路径的React组件，并且可以定制图标样式和相应鼠标事件。 SVG 元素应该为一个 24x24px 的视图。

生成的图标可以当作另一个Material-UI组件的子组件来使用。 图标默认继承当前的文本颜色。 或者，你可以使用以下主题色之一来设置颜色属性：`primary`, `secondary`, `action`, `error` & `disabled`。

{{"demo": "pages/style/icons/SvgIcons.js"}}

### SVG Material 图标

拥有实现自定义图标所需的构建块很有意思，但如何实现预设图标呢？ 我们提供一个单独的 npm 包，[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)，其中包括 1000 + 已转换为`Svg 图标` 组件的官方 [Material图标](https://material.io/tools/icons/?style=baseline)

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="官方材料图标" style="width: 566px" />
</a>

#### 使用

你可以通过 [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) 找到某个特定的图标。 导入图标时, 请记住图标的名称是 `PascalCase` 风格，例如：

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) 暴露为 `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) 暴露为 `@material-ui/icons/DeleteForever`

对于 *"被主题修饰过"* 的图标，在图标名称后面添加主题名。 例如：

- 描边的 [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) 图标由 `@material-ui/icons/DeleteOutlined` 暴露
- 圆角的 [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) 图标由 `@material-ui/icons/DeleteRounded` 暴露
- 双色的 [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) 图标由 `@material-ui/icons/DeleteTwoTone` 暴露
- 尖锐的 [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) 图标由 `@material-ui/icons/DeleteSharp` 暴露

这条规则有三个例外情况：

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) 暴露为 `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) 暴露为 `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) 暴露为 `@material-ui/icons/ThreeSixty`

{{"demo": "pages/style/icons/SvgMaterialIcons.js"}}

#### 导入

- 假如你的环境不支持 tree-shaking，**推荐** 方式是用下面的方法导入图标：

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- 如果你的环境支持 tree-shaking 你也可以这样导入图标：

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

注意：用这种名称导出的方式导入会造成 *每一个图标* 的代码都会被包含在你的项目里，所以不推荐你这样做除非你配置 [tree-shaking](https://webpack.js.org/guides/tree-shaking/). 这也可能会影响热模块重载的性能。

### 更多的 SVG 图标

正在寻找更多SVG图标？ 或许已经有许多项目，不过 [https://materialdesignicons.com](https://materialdesignicons.com/) 提供了超过 2,000 多由官方和社区提供的图标。 [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) 以与 [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) 对官方图近乎相同的方式将这些图标打包为 Material-UI SvgIcons。

## 字体图标

`Icon` 组件通过任一支持连字的图标字体显示为一个图标。 作为先决条件, 您必须在项目中包括一个, 例如通过 Google Web Fonts 引入 [Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web) ：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

`Icon` 将为 Material icon font 设置正确的类名。对于其他的字体，你必须通过 Icon 组件的 `className` 属性设置类名。

要使用图标只需将图标名（字体连字）包裹到 `Icon` 组件内即可，例如：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

图标默认继承当前的文本颜色。 或者，你可以使用以下主题色之一来设置颜色属性：`primary`, `secondary`, `action`, `error` & `disabled`。

### Font Material 图标

{{"demo": "pages/style/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) 与 `Icon` 一起使用的示例如下：

{{"demo": "pages/style/icons/FontAwesome.js", "hideEditButton": true}}

## 字体 vs SVG 用哪个？

两种方法都能很好的工作。然而，他们之间有着微妙的差异，特别是在性能和渲染质量上。 尽可能选择 SVG。 因为 SVG 允许代码分割、支持更多图标而且渲染的更快、更好。

更多细节请查看 [ 为什么 GitHub 从字体图标迁移到 SVG 图标](https://blog.github.com/2016-02-22-delivering-octicons-with-svg/)

## 无障碍功能

图标可以传达各种各样有意义的信息，所以将他们传递给尽可能多的人非常重要。 您需要考虑两个用例： - **装饰图标** 仅用于视觉或品牌强化。 如果将它们从页面中删除，用户仍然可以理解并能够使用您的页面。 - **语义图标** 是您用来传达意义的，而不仅仅是纯粹的装饰。 这包括其旁边没有文本的图标，用作交互式控件 - 按钮，表单元素，切换等。

### 装饰SVG图标

如果您的图标纯粹是装饰性的，那么您已经完成了！ 我们添加 `aria-hidden=true` 属性，以便您的图标可以正常访问（不可见）。

### 语义SVG图标

如果您的图标具有语义含义，那么您需要做的就是输入 `titleAccess =“含义”` 属性。 我们添加 `role="img"` 属性和 `<title>` 元素，以便您的图标可以正常访问。

对于可聚焦的交互式元素，例如与图标按钮一起使用时，可以使用 `aria-label` 属性：

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="Delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### 装饰字体图标

如果您的图标纯粹是装饰性的，那么您已经完成了！ 我们添加 `aria-hidden=true` 属性，以便您的图标可以正常访问（不可见）。

### 语义字体图标

如果您的图标具有语义含义，则需要提供仅对辅助技术可见的文本替代方法。

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">创建用户</Typography>
```

### 参考

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/