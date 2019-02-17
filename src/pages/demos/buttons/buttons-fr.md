---
title: Composant React Bouton
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# Boutons (Buttons)

<p class="description">Les boutons permettent aux utilisateurs de prendre des mesures et de faire des choix en un seul clic.</p>

[Buttons](https://material.io/design/components/buttons.html) communiquent les actions que les utilisateurs peuvent effectuer. Ils sont généralement placés dans votre interface utilisateur, dans des endroits tels que:

- Dialogues
- Fenêtres modales
- Formulaires
- Cartes
- Barres d'outils

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.

Le dernier exemple de cette démo montre comment utiliser un bouton de téléchargement.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Boutons de texte

[Les boutons de texte](https://material.io/design/components/buttons.html#text-button) sont généralement utilisés pour les actions moins prononcées, y compris celles situées:

- Dans les dialogues
- Dans les cartes

Dans les cartes, les boutons de texte aident à maintenir l’accent sur le contenu des cartes.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Boutons en surbrillance

[boutons en surbrillance](https://material.io/design/components/buttons.html#outlined-button) sont des boutons à accent moyen. Ils contiennent des actions importantes mais qui ne sont pas l'action principale d'une application.

### Alternatives

Les boutons surbrillance sont également une alternative moins importante que les boutons contenus, ou une alternative plus importante aux boutons de texte.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## Boutons d'action flottant

A [bouton d'action flottante](https://material.io/design/components/buttons-floating-action-button.html) (FAB) effectue la première, ou la plus courante, l' action sur un écran. Il apparaît devant tout le contenu de l'écran, généralement sous la forme d'une forme circulaire avec une icône en son centre. Il existe deux types de FAB: régulier et étendu.

Utilisez un FAB uniquement si c'est le moyen le plus approprié pour présenter l'action principale d'un écran.

Un seul bouton d’action flottante est recommandé par écran pour représenter l’action la plus courante.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

Le bouton d'action flottante s'anime sur l'écran en tant que matériau en expansion, par défaut.

Un bouton d'action flottant qui s'étend sur plusieurs écrans latéraux (tels que des écrans à onglets) devrait disparaître brièvement, puis sur si son action change.

La transition Zoom peut être utilisée pour y parvenir. Notez que, comme les animations sortantes et entrantes sont déclenchées simultanément, nous utilisons `enterDelay` pour permettre à l'animation du bouton d'action flottant sortant de se terminer avant l'entrée de la nouvelle.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Tailles

Envie de boutons plus grands ou plus petits? Utilisez la propriété `size`.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Boutons avec des icônes et une étiquette

Parfois, vous voudrez peut-être avoir des icônes pour certains boutons afin d'améliorer l'UX de l'application, car nous reconnaissons plus facilement les logos que le texte brut. Par exemple, si vous avez un bouton de suppression, vous pouvez lui attribuer une icône représentant une poubelle.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Boutons d'icônes

Les boutons d'icône se trouvent généralement dans les barres d'applications et les barres d'outils.

Les icônes sont également appropriés pour les boutons à bascule qui permettent à un seul choix à choisir ou décochée, comme l' ajout ou la suppression d' une étoile à un élément.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Boutons personnalisés

Si vous avez lu [la page de la documentation sur les personnalisation](/customization/overrides/) mais que vous n'êtes pas prêt pour vous lancer, voici des exemples pour changer la couleur principale d'un bouton en utilisant des classes, et en utilisant un thème; et d'un bouton de style Bootstrap.

⚠️ Bien que les spécifications Material Design encouragent la thématisation, ces exemples sortent des sentiers battus.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Boutons complexes

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. Vous pouvez tirer parti de ce composant de niveau inférieur pour créer des interactions personnalisées.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Bibliothèque de routage tierce

Un cas d'utilisation courant consiste à utiliser le bouton pour déclencher une navigation vers une nouvelle page. Le composant `ButtonBase` fournit une propriété pour traiter ce cas d'utilisation: `composant`. Étant donné que beaucoup de nos composants interactifs comptent sur `ButtonBase`, vous devriez être en mesure de tirer profit de partout:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

ou si vous souhaitez éviter les collisions de propriétés :

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Remarque: la création de `MyLink` est nécessaire pour éviter un démontage inattendu. Vous en saurez plus à ce sujet dans notre [guide des propriétés des composants](/guides/composition/#component-property).*