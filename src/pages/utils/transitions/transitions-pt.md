---
title: Componentes de Transição React
components: Collapse, Fade, Grow, Slide, Zoom
---
# Transições

<p class="description">Transições ajudam a fazer a INTERFACE expressiva e fácil de usar.</p>

Material-UI provides a number of transitions that can be used to introduce some basic [motion](https://material.io/design/motion/) to your applications components.

To better support server rendering Material-UI provides a `style` property to the children of some transition components (Fade, Grow, Zoom, Slide). A propriedade `style` deve ser aplicada ao DOM para que a animação funcione conforme esperada.

```jsx
// O objeto `props` contém uma propriedade` style`.
// Você precisa fornecê-lo ao elemento `div` como mostrado aqui.
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## Collapse

Expand vertically from the top of the child element. The `collapsedHeight` property can be used to set the minimum height when not expanded.

{{"demo": "pages/utils/transitions/SimpleCollapse.js"}}

## Fade

Fade in de transparente para opaco.

{{"demo": "pages/utils/transitions/SimpleFade.js"}}

## Grow

Expand outwards from the center of the child element, while also fading in from transparent to opaque.

The second example demonstrates how to change the `transform-origin`, and conditionally applies the `timeout` property to change the entry speed.

{{"demo": "pages/utils/transitions/SimpleGrow.js"}}

## Slide

Slide in from the edge of the screen. The `direction` property controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. This prevents the relatively positioned component from scrolling into view from it's off-screen position. Similarly the `unmountOnExit` property removes the component from the DOM after it has been transition off screen.

{{"demo": "pages/utils/transitions/SimpleSlide.js"}}

## Zoom

Expandir para fora partindo do centro do elemento filho.

Este exemplo também demonstra como atrasar a transição de entrada.

{{"demo": "pages/utils/transitions/SimpleZoom.js"}}