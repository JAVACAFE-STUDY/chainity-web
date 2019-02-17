# Совместимость с другими библиотеками

<p class="description">Вы здесь, потому что хотите знать, сможет ли Material-UI помочь решить ваши конкретные проблемы. Это то, что мы надеемся ответить за вас здесь.</p>

Это определенно одна из самых сложных страниц в руководстве, но мы считаем, что это важно. Скорее всего, у вас были проблемы, которые вы пытались решить, и вы использовали другую библиотеку для их решения.

Мы хотели бы, чтобы вы помогли обновить этот документ, потому что мир JavaScript движется быстро! Если вы заметили неточность или что-то, что кажется вам не совсем правильным, сообщите нам об этом через [opening an issue](https://github.com/mui-org/material-ui/issues/new?title=[docs]+Inaccuracy+in+comparison+guide).

Мы покрываем следующие библиотеки:

- [Material-UI](#material-ui)
- [Material Design Lite (MDL)](#material-design-lite-mdl)
- [Material Components Web (MDC-web)](#material-components-web-mdc-web)
- [Materialize](#materialize)
- [React Toolbox](#react-toolbox)

## Material-UI

![stars](https://img.shields.io/github/stars/mui-org/material-ui.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/core.svg)

Мы очень постараемся избежать предвзятости, хотя нам, как основной команде, очень нравится Material-UI ❤️. There are some problems we think it solves better than anything else out there; if we didn’t believe that, we wouldn’t be working on it 

Мы хотим быть честными и точными, поэтому, когда другие библиотеки предлагают значительные преимущества, мы также стараемся перечислить их.

## Material Design Lite (MDL)

![stars](https://img.shields.io/github/stars/google/material-design-lite.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-design-lite.svg)

Material Design Lite, while a very well-thought-out Material Design implementation, was primarily maintained by Developer Relations at Google. Сегодня **проект больше не поддерживается /0>. Так что же случилось?</p> 

The Material Components Web team started out building MDC-web as "MDL v2", but, after collaborating on it for a few months, both teams felt it best to bring the project under the Material Design team's purview. This shift meant a re-orientation of goals away from simply "adding a Material Design look and feel" to websites, and towards the goal of a canonical Material Design implementation for the entire web platform.

## Material Components Web (MDC-web)

![stars](https://img.shields.io/github/stars/material-components/material-components-web.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-components-web.svg)

Мы очень рады, что этот проект поддерживается Google и его командой дизайнеров. It sends a clear signal that the [Material Design specification](https://material.io/design/) is here to stay, as they continue to invest in it.

### Фреймворки и библиотеки

Material-UI focuses exclusively on the React library, although, given that Preact supports the very same API, we hope to soon support it too. Supporting one framework allows us to do less but do it better.

This comes in different flavors:

- Having fewer constraints, we can make trade-offs specific to our target framework. We have fewer edge-cases to take into account.
- We can spend more time on nailing the React use case.

MDC-web was designed from the ground up to be fully compatible with 3rd party JS frameworks and libraries. They list 3rd-party framework integration projects in the github [README](https://github.com/material-components/material-components-web/#material-components-for-the-web)

### Стилевое решение

[Material-UI несет тяжелое наследие со стилями](https://github.com/oliviertassinari/a-journey-toward-better-style). Our very first release was using LESS, but seeing the limitation of this solution, we quickly started looking into alternatives. Our first migration was towards using an inline-style solution. This was promising:

- It allowed us to remove the dependency on the LESS toolchain for our users. We removed one important friction in the installation process. (**simpler**)
- We were able to change the theme at runtime, nest different themes, and have dynamic styles. (**more powerful**)
- We reduced the loading time by breaking the big monolithic CSS file in order to enable code splitting. (**faster**)
- The style override story became more intuitive, as we were free of CSS specificity issues. (**simpler**)

Eventually, we reached the limitations of inline-styles and moved toward a CSS-in-JS solution. This transition was made without losing the enhancements the first migration introduced **We strongly think that CSS-in-JS is the future of the web platform**. You can [learn more about our new styling solution](/customization/css-in-js/) in the documentation.

MDC-web relies on SCSS as Bootstrap v4. The SCSS architecture is pretty close to LESS - a technology we replaced for its limitations.

### Видение

Наше видение заключается в том, чтобы обеспечить элегантную реализацию рекомендаций по Material Design **и более**.

> The Material Design guidelines are an incredible starting point, but they do not provide guidance on all aspects or needs of an application. В дополнение к реализации, ориентированной на конкретные рекомендации, мы хотим, чтобы Material-UI стал тем, что обычно полезно для разработки приложений и все это в духе рекомендаций Material Design.
> 
> *[Выдержка из раздела [видение](/discover-more/vision/) документации.]*

We want to see businesses succeeding in taking advantage of Material-UI to ship an awesome UI to their users while having it match their brand, so we have invested a lot in the customization capabilities of Material-UI.

Единственная цель MDC-Web - реализация Material Design для веб-платформы. **Nothing more, nothing less**. They will not consider making changes to the components - especially UX changes - that would facilitate additional flexibility at the cost of breaking with the core Material Design system, as that is a non-goal of the project. *[source](https://github.com/mui-org/material-ui/issues/6799#issuecomment-299925174)*

### Tests

Both projects invest a lot in tests. At the time of writing, both projects have over 99% test coverage:

- Material-UI has 1200+ unit tests running on Chrome 49, Firefox 45, Safari 10 and Edge 14.
- MDC-web has 1200+ unit tests running on all the major browsers.

Still, there is one thing that sets Material-UI apart and it's key: We have [hundreds of visual regression tests](https://www.argos-ci.com/mui-org/material-ui) when MDC-web doesn't have any. With visual regression tests, you don't have to make any trade-off:

- You can spend less time making sure every contribution doesn't introduce unexpected regressions. The **less** time you spend on a single contribution, the **more** contributions you can accept.
- You can merge new contributions without digging much. Effectively, you are not waiting for users to report regressions. It's **efficient** and **improves the library quality**.

## Materialize

![stars](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/materialize-css.svg)

### Поддержка браузеров

Materialize поддерживает более широкий диапазон браузеров, чем Material-UI, например, они поддерживают IE 10, а [мы поддерживаем только IE 11](/getting-started/supported-platforms/). Только поддержка IE 11 позволяет нам в полной мере использовать макет flexbox. IE 10 имеет много проблем с flexbox.

### Стилевое решение

Materialize использует SCSS, стилевую архитектуру Material-UI, от которой отказались 2 года назад. We explain why in the [MDC-web section](#styling-solution) above.

## React Toolbox

![stars](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-toolbox.svg)

### Стилевое решение

В то время как и React Toolbox, и Material-UI делают ставки на CSS-in-JS, мы приняли другой компромисс. Material-UI выбрал **JSS** в то время как React Toolbox начал переписывать свою библиотеку с помощью **styled-components**. Мы выбрали JSS вместо styled-components по следующей причине:

- JSS предоставляет API низкого уровня: 
  - Мы можем моделировать его в соответствии с нашими уникальными потребностями, что позволило нам создать один из самых совершенных механизмов переопределения и создания тем.
  - Он не связан с React, как `styled-components`. It has the potential to reach any 3rd party JS frameworks and libraries. Параллели могут быть сделаны с помощью SCSS. SCSS совместим с любыми JavaScript-фреймворками и библиотеками, что помогает ему развиваться в сообществе.
- JSS [в два раза быстрее](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) чем подключение компонентов через styled-components, при всей включенной оптимизации.

Это не означает, что Material-UI думает о том, как пользователи пишут свои стили. Вы можете использовать styled-components, если хотите.