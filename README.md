# Dashboard Frontend

## Dépendance
Il vous faut en premier lieu npm pour pouvoir récupréré l'ensemble des paqués nécessaire.

## Utilisation

### Dist

Une version compilé est présent dans le dossier `dist` téléchargeable directement sur le tag de version. Mais vous pouvez aussi cloner le git.
```bash
    $ git clone https://github.com/jzaehrin/homepage.git
```

### Compilation

Vous pouvez recompilé le projet avec npm :
```bash
    $ git clone https://github.com/jzaehrin/homepage.git
    $ npm install
    $ npm run prod
```

#### Developpement

Dans un cadre de développement vous pouvez lancé l'autocompilation lors d'une mise à jour d'un fichier.

```bash
    $ npm start
```

### Lancé

Il suffit d'executé le fichier index.html dans votre navigateur.

## Information

Nous utilisons divers librairies pour simplifier la développement de l'application.

### Axios

Très petite librairie qui permet de faire la communication avec l'API. Elle permet de mettre facilement les headers nécessaire à l'authentification mais aussi de facilement traité le retour.

### Material-UI

Librairie qui permet l'intégration rapide d'élément déjà stylisé. La mise en page est possible aussi via des élements structurants.

### MomentJS

Très puissante Librairie permettant de traiter très facilement les dates que ce soit leur affichage, leur comparaison, etc..

### Webpack

Bundler pour javascript permettant de fussionné l'ensemble du code pour avoir qu'un seul fichier à inclure à l'index. 

### Babel

Transpiler de L'ES6 à L'ES5 pour permettre de garder une grande compatibilité envers les différents navigateurs.
