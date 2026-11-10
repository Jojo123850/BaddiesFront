# Les styles de BADDIES

- `global.scss` : les styles communs. Il est chargé une seule fois dans `main.tsx`.
- `_variables.scss` : les couleurs et les polices. Les couleurs sont utilisées avec `var()`.
- `components/` : les formulaires, la navigation, les fenêtres et le graphique.
- `pages/` : les styles propres aux écrans.

Je garde les variantes des boutons dans leur page pour conserver leur rendu. Je ne déplace dans global que des règles identiques et vérifiées dans les composants.

Les tailles en rem ont été converties en pixels avec la base actuelle de 16px. Les unités liées à l’écran restent présentes lorsqu’elles sont nécessaires au responsive.

Les imbrications gardent les mêmes sélecteurs CSS, le même ordre et les mêmes media queries. Les anciennes importations de variables dans chaque page ont été retirées : elles répétaient la palette dans le CSS.
