---
title: Componente React de Campo de Texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---
# Text Fields (Campos de Texto)

<p class="description">Campos de texto permitem que os usuários digitem e editem texto.</p>

[Campos de Texto](https://material.io/design/components/text-fields.html) permitem que os usuários insiram texto em uma interface de usuário. Eles geralmente aparecem em formulários e diálogos.

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda.

{{"demo": "pages/demos/text-fields/TextFields.js"}}

> **Nota:** Esta versão do campo de texto não está mais documentada na documentação do Material Design.

## Delineado

`TextField` suporta estilo delineado.

{{"demo": "pages/demos/text-fields/OutlinedTextFields.js"}}

## Preenchido

`TextField` suporta estilo preenchido.

{{"demo": "pages/demos/text-fields/FilledTextFields.js"}}

## Componentes

`TextField` é composto por componentes menores ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), e [`FormHelperText`](/api/form-helper-text/) ) que você pode aproveitar diretamente para personalizar significativamente as entradas do seu formulário.

Você também pode ter notado que algumas propriedades de entrada nativas do HTML estão faltando no componente `TextField`. Isto é intencional. O componente cuida das propriedades mais usadas, depois cabe ao usuário usar o componente exibido na demonstração. Ainda, você pode usar `inputProps` (`InputProps` e `InputLabelProps`) se você quiser evitar algum boilerplate.

{{"demo": "pages/demos/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/demos/text-fields/Inputs.js"}}

## Inputs Costumizados

Se você leu a [página de abertura da documentação](/customization/overrides/) mas não está confiante, aqui vai um exemplo de como trocar a cor principal do Input.

⚠️ Embora a especificação do design do material incentive o tema, esses exemplos estão fora do caminho comum.

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

A customização não para no CSS, você pode usar composição para criar componentes personalizados e dar ao seu aplicativo uma sensação única. Abaixo há um exemplo usando o componente [`InputBase`](/api/input-base/), inspirado pelo Google Maps.

{{"demo": "pages/demos/text-fields/CustomizedInputBase.js"}}

## Decoração de inputs

`Input` permite o uso de `InputAdornment`. Estes podem ser usados para adicionar um prefixo, sufixo ou uma ação para uma entrada. Por exemplo, você pode usar um botão com ícone para ocultar ou revelar a senha.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

### Com icon

Os ícones podem ser especificados como anexados ou anexados.

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

### Input com bordas preenchidas

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

### Inputs com contornos delineados

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## Layout

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter other styles to meet the specification.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## Limitations

O label de entrada "shrink" nem sempre está correto. O input label deve encolher assim que o input estiver exibindo algo. Em algumas circunstâncias, não podemos determinar o estado de "srink" (input numérico, input datetime, input Stripe). Você pode notar uma sobreposição.

![minimizar](/static/images/text-fields/shrink.png)

Para contornar o problema, você pode forçar a "shrink" do label.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

ou

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

## Inputs Formatados

Você pode usar bibliotecas de terceiros para formatar uma entrada. Você precisa fornecer uma implementação personalizada do elemento `<input>` com a propriedade `inputComponent`. O componente de entrada fornecido deve manipular a propriedade `inputRef`. A propriedade deve ser chamada com um valor que implementa a interface [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).

A seguinte demonstração usa as bibliotecas [react-text-mask](https://github.com/text-mask/text-mask) e [react-number-format](https://github.com/s-yadav/react-number-format).

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## Accessibility

Para que o campo de texto seja acessível, **a entrada deve estar vinculada ao label e ao texto auxiliar**. Os nós DOM subjacentes devem ter essa estrutura.

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

- Se você estiver usando o componente `TextField`, basta fornecer um `id` único.
- Se você está compondo o componente:

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

## Projetos Complementares

For more advanced use cases you might be able to take advantage of:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) A set of wrapper components to facilitate using Material UI with Final Form.
- [uniformes-material](https://github.com/vazco/uniforms/tree/master/packages/uniforms-material) Componentes Material-UI para Uniforms, um conjunto de bibliotecas React para construção de formulários.