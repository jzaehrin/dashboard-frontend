# Dashboard Frontend

## Dépendance
Il vous faut en premier lieu **npm** pour pouvoir récupérer l'ensemble des paquets nécessaires.

## Utilisation

### Dist

Une version compilée est présent dans le dossier `dist` téléchargeable directement sur le tag de version. Mais vous pouvez aussi cloner le git.
```bash
    $ git clone https://github.com/jzaehrin/dashboard_frontend
```

### Compilation

Vous pouvez recompilé le projet avec npm :
```bash
    $ cd **chemin du dossier cloné précédemment**
    $ npm install
    $ npm run prod
```

#### Développement

Dans un cadre de développement, vous pouvez lancé l'auto-compilation lors d'une mise à jour d'un fichier.

```bash
    $ npm start
```

### Lancé

Il suffit d'exécuter le fichier **index.html** dans votre navigateur.

## Information

Nous utilisons diverses librairies pour simplifier le développement de l'application.

### Axios

Très petite librairie qui permet de faire la communication avec l'API. Elle permet de mettre facilement les **headers** nécessaires à l'authentification mais aussi de facilement traiter le retour.

### Material-UI

Librairie qui permet l'intégration rapide d'éléments déjà stylisés. La mise en page est possible aussi via des éléments structurants.

### MomentJS

Très puissante Librairie permettant de traiter très facilement les dates que ce soit leur affichage, leur comparaison, etc..

### Webpack

Bundler pour Javascript permettant de fusionner l'ensemble du code pour avoir qu'un seul fichier à inclure à l'index. 

### Babel

Transpiler de L'ES6 à L'ES5 pour permettre de garder une grande compatibilité envers les différents navigateurs.
