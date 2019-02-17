---
title: Componente de React Campo de texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---
# Campos de texto

<p class="description">Los campos de texto permiten a los usuarios ingresar y editar texto.</p>

Los [campos de texto](https://material.io/design/components/text-fields.html) permiten a los usuarios ingresar texto en la interfaz de usuario. Usualmente aparecen en formularios y diálogos.

## TextField

El componente `TextField` es un campo de formulario completo, incluyendo una etiqueta, el campo de texto y texto de ayuda.

{{"demo": "pages/demos/text-fields/TextFields.js"}}

> **Nota:** Esta versión del campo de texto ya no está incluida en la documentación oficial de Material Design.

## Delineado

El componente `TextField` soporta estilos con contorno delineado.

{{"demo": "pages/demos/text-fields/OutlinedTextFields.js"}}

## Relleno

El componente `TextField` soporta estilos con relleno.

{{"demo": "pages/demos/text-fields/FilledTextFields.js"}}

## Componentes

El componente `TextField` incluye y usa subcomponentes ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/) y [`FormHelperText`](/api/form-helper-text/) ) que pueden ser usados directamente para personalizar campos de ingreso de texto de manera sustancial.

Puede que también hayas notado que algunas propiedades nativas de input HTML no están presentes en el componente `TextField`. Esto es a propósito. El componente se encarga de programar la mayoría de las propiedades más usadas, luego depende del usuario programar las propiedades que se muestran en el siguiente demo. Aun así, se puede utilizar `inputProps` (y las propiedades `InputProps` e `InputLabelProps`) para personalizar y evitar el código boilerplate.

{{"demo": "pages/demos/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/demos/text-fields/Inputs.js"}}

## Inputs personalizados

Si has estado leyendo la [página de documentación sobre overrides](/customization/overrides/) pero aun no tienes la confianza suficiente para usarlos acá hay un ejemplo de su uso para el cambio de color de un input.

⚠️ A pesar de que la especificación de material design anima a usar temas, estos ejemplos no son comunes.

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

La personalización se limita a usar CSS, también puedes usar una composición de componentes personalizados para darle a tu aplicación un estilo único. A continuación sigue un ejemplo del uso del componente [`InputBase`](/api/input-base/), inspirado por Google Maps.

{{"demo": "pages/demos/text-fields/CustomizedInputBase.js"}}

## Adornos de campos de texto

`Input` permite el uso de `InputAdornment`. Este elemento se puede usar para agregar un prefijo, un sufijo o una acción a un campo de texto. Por ejemplo, puedes usar un botón de icono para esconder o revelar una contraseña.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

### Con icono

Iconos se pueden poner en frente o detrás del campo de texto.

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

### Adornos de campos de texto rellenos

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

### Adornos de campos de texto delineados

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## Diseño

`TextField`, `FormControl` permiten la especificación del `margin` para cambiar el espacio vertical de los campos de texto. Usar `none` (valor por defecto) no aplicará márgenes al `FormControl`, mientras que `dense` y `normal` cambiarán otros estilos para estar de acuerdo con la especificación.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## Limitaciones

El estado "shrink" de la etiqueta del campo de texto no está siempre correcto. La etiqueta debe achicarse al momento que el campo demuestra algun texto. En algunas circunstancias, no se puede determinar el estado "shrink" (campo de números, campo de fecha y hora, campo de Stripe). Tal vez veas una superposición.

![shrink](/static/images/text-fields/shrink.png)

Para resolver el problema, puedes forzar el estado "shrink" de la etiqueta.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

o

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

## Campos de texto formateados

Puedes usar librerías externas para formatear un campo de texto. Tienes que proporcionar una implementación personalizada del elemento `<input>` con el atributo `inputComponent`. El componente del campo de texto proporcionado debe manejar el atributo `inputRef`. El atributo debe ser creada con un valor usando el interfaz [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).

El siguiente demo utiliza las librerías [react-text-mask](https://github.com/text-mask/text-mask) y [react-number-format](https://github.com/s-yadav/react-number-format).

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## Accesibilidad

Para facilitar la accesibilidad, ** el campo debe estar vinculado a la etiqueta y al texto de ayuda**.

```jsx
<div class="form-control">
  <label for="mi-campo">Email</label>
  <input id="mi-campo" aria-describedby="mi-texto-de-ayuda" />
  <span id="mi-texto-de-ayuda">Nunca compartiremos tu email.</span>
</div>
```

- Si usas el componente `TextField`, solo tienes que proporcionar un `id` único.
- If you are composing the component:

```jsx
<FormControl>
  <InputLabel htmlFor="mi-campo">Email</InputLabel>
  <Input id="mi-campo" aria-describedby="mi-texto-de-ayuda" />
  <FormHelperText id="mi-texto-de-ayuda">Nuncac compartiremos tu email.</FormHelperText>
</FormControl>
```

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) A set of wrapper components to facilitate using Material UI with Final Form.
- [uniforms-material](https://github.com/vazco/uniforms/tree/master/packages/uniforms-material) Material-UI wrapper components for Uniforms, a set of React libraries for building forms.