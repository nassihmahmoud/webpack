Initialisation du projet avec Node et NPM

Si vous n’avez pas déjà installé Node et NPM, je vous invite à faire depuis le site officiel. Sur Ensuite, créez un dossier dans lequel vous allez travailler. Nommez-le donc comme vous le souhaitez.

Afin de préparer votre projet à utiliser les dépendances NPM, ouvrez votre terminal, rendez-vous à la racine de votre projet et tapez la commande suivante :

npm init -y

Ensuite, vous allez devoir créez 2 dossiers (public contenant 2 fichiers : index.html, bundle.js et src contenant 1 fichier index.js) et 1 fichier webpack.config.js à la racine. Pour vous faciliter la tâche, voici les commandes à exécuter (sous Linux/macOS, ces opérations sont aussi réalisables sous Windows avec des commandes équivalentes ou "à la souris") :

touch webpack.config.js && mkdir public src && cd public && touch index.html bundle.js && cd .. && cd src && touch index.js && cd ..

Le dossier src/ nous permettra de stocker la logique de notre application tandis que le dossier public nous permettra de stocker tous nos fichiers minifiés. Mais ça, on le verra plus tard.

Il ne manque plus qu’un dossier assets qui comprendra lui même 4 dossiers dont les noms parlent d’eux-mêmes : fonts, icons, images et stylesheets. Tapez donc cette commande pour les créer rapidement :

mkdir assets && cd assets && mkdir fonts icons images stylesheets && cd ..

Même chose que pour le point précédent, ces opérations sont aussi réalisables sous Windows avec des commandes équivalentes ou "à la souris".
Installation de Webpack

Voici la partie que vous attendiez avec impatience : l’installation de Webpack. Pour cela, tapez simplement :

npm install --save-dev webpack@latest webpack-dev-server@latest

Les flags --save-dev (ou raccourci avec -D) indiquent que Webpack correspond à une dépendance de développement, que l'on a besoin de ces fichiers durant cette phase. Vous pourrez le vérifier dans votre fichier package.json où il sera affiché sous la section dev dependencies. Un dossier node_modules va apparaître dans votre dossier : il s’agit des dépendances dont Webpack va avoir besoin pour fonctionner.

Si vous utilisez git pour versionner vos fichiers, il est recommandé de ne pas inclure le dossier node_modules, c'est-à-dire de l'ajouter aux instructions .gitignore
Configuration de Webpack

Maintenant que Webpack est installé, nous allons devoir le configurer ! Pour cela, ouvrez webpack.config.js et ajoutez les lignes suivantes :

const webpack = require("webpack");
const path = require("path");

Nous créons ici une constante appelée webpack, qui requiert le module webpack. C’est la base pour que tout fonctionne. Puis nous créons la variable path qui va nous permettre d’indiquer les bons chemins vers nos fichiers.

Ensuite, il va falloir indiquer un point d’entrée (notre fichier index.js), c’est-à-dire le fichier qui sera lu et un point de sortie, à savoir le fichier qui sera compilé (bundle.js). Ensuite, nous allons exporter cette configuration :

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  }
}

module.exports = config;

Maintenant, n’oubliez pas de lier votre fichier bundle.js à votre fichier index.html en tapant la ligne de code qui suit, juste avant la fermeture de votre balise <body> :

<script src="bundle.js"></script>

Avant de faire notre premier test, vous allez installer Webpack de manière globale sur votre ordinateur avec l'option -g :

npm install -g webpack@latest

Rendez-vous désormais dans votre fichier index.js et tapez le code JS de votre choix. J’ai opté pour un simple :

document.write("Je débute avec Webpack !");

Maintenant, tapez simplement webpack dans votre terminal et laissez la magie opérer :) Profitez-en pour ouvrir votre index.html avec le navigateur de votre choix pour voir le contenu de votre page !

Un peu d’automatisation

Tout ceci est bien beau, mais vous n’allez pas taper webpack dans votre terminal à chaque fois que vous voulez voir vos derniers changements, ça serait trop lourd ! Un flag existe pour cela : --watch ou -w. Allez-y, tapez webpack --watch et regardez ce qu’indique Webpack dans votre terminal :

Cela signifie que Webpack surveille les modifications que vous allez apporter à vos fichiers. Vous pourrez donc simplement rafraîchir votre page HTML à chaque fois que vous voudrez voir le rendu. D’ici quelques paragraphes, nous verrons comment mettre en place le Hot Module Reload ou HMR pour les intimes : vos pages seront automatiquement rafraîchies à chaque fois que vous sauvegarderez votre travail depuis votre éditeur de code.

Reprenez donc votre fichier index.js et éditez le texte que vous aviez écrit. Sauvegardez, rechargez la page : magie, ça fonctionne ! Mais nous pouvons encore améliorer ceci. Plutôt que de taper webpack --watch, nous allons rendre ça un peu plus sexy : rendez-vous dans votre fichier package.json et modifiez l’objet script comme suit :

"scripts": {
    "watch": "webpack --watch"
  }

Maintenant, lorsque vous voudrez lancer la commande watch depuis votre terminal, tapez npm run watch.
Écrire de l’ES6 ? Le convertir en ES5 ? C’est possible !

Vous avez sûrement déjà entendu parler de l’ES6 (ECMAScript 6), une version récente du langage Javascript (suivie par d'autres au fil des ans). Vous devez donc savoir qu’il n’est pas possible pour tous les navigateurs (les plus anciens) d'interpréter l’ES6.

Webpack va nous permettre, en collaboration avec Babel, de compiler l’ES6 en ES5, ce qui rendra votre syntaxe récente (par exemple let et autres fonctions fléchées) parfaitement utilisable.

Babel

Pour cela, nous allons installer les dépendances Babel Loader et Babel Core :

npm install --save-dev babel-loader babel-core

Ajoutez ensuite le code suivant à votre fichier de configuration Webpack, après l’objet output :

module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }

Quelques explications :

    La première ligne va identifier tous les fichiers se terminant par .js
    La seconde va exclure de ces fichiers tous ceux qui se situent dans node_modules
    La troisième va charger le loader Babel Core babel-loader

Votre fichier doit donc désormais ressembler à ça :

const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./public/bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }]
      }
  }
  
  module.exports = config;

Maintenant, nous allons devoir indiquer à Babel qu’il doit utiliser le preset (pré-réglage) ES2015. Pour ce faire, entrez la commande suivante :

npm install --save-dev babel-preset-env

Créez un fichier .babelrc à la racine de votre projet et ajoutez-y le code suivant :

{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}

Il va rendre votre ES6 compatible avec les 2 dernières de tous les navigateurs et les versions de Safari supérieures ou égales à la 7. Babel utilisant Browserlist, je vous invite à vous rendre sur la page GitHub du projet si vous souhaitez en apprendre plus sur cette partie de la configuration.

Allez dans votre fichier index.js et tapez de l’ES6. Pour ma part, je suis resté simple avec :

let a = "J'apprends Webpack !";

Ensuite, lancez Webpack avec npm run watch. Ouvrez votre fichier bundle.js et rendez-vous tout en bas. Si tout à bien fonctionné, vous devriez avoir var a = "J'apprends Webpack"; à la place de let, signe que Webpack a bien compilé l’ES6 en ES5 !

Compiler du SCSS en CSS ? C’est possible aussi !

Pour cela, vous allez avoir besoin d’installer de nouvelles dépendances :

npm i --save-dev sass-loader node-sass css-loader style-loader autoprefixer postcss-loader

De la même manière que vous l’aviez fait pour Babel Loader, tapez le code suivant dans webpack.config.js après le loader babel-loader :

{
  test: /\.scss$/,
  loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
}

Votre fichier webpack.config.js doit désormais ressembler à ça :

const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
          }]
      }
  }
  
  module.exports = config;

Il va maintenant falloir créer un fichier .scss dans votre dossier assets/stylesheets pour tester tout ça :) Si vous n’êtes pas du tout familier avec SASS, je vous conseille de vous y intéresser. Il s’agit de CSS évolué, vous permettant notamment d’utiliser des variables. Nommez-le styles.scss. Voici le code que j’ai tapé, toujours pour rester simple :

$midnight-blue : #2c3e50;

body {
  background-color: $midnight-blue;
}

En gros, j’attribue le nom de Midnight-blue à la couleur dont le code hexadecimal est #2c3e50. Puis je l’utilise pour changer la couleur de mon body en indiquant le nom de la variable (retenir les codes couleur est plus difficile :)).

Dans index.js, nous allons maintenant require ce fichier. Pour cela, écrivez la ligne suivante au-dessus de tout le code :

require("../assets/stylesheets/styles.scss");

Avant de vérifier que tout fonctionne, j’attire votre attention sur PostCSS et autoprefixer : ce sont 2 outils qui vont vous permettre de préfixer automatiquement votre code CSS pour tous les navigateurs. Il ne vous sera donc plus nécessaire de penser écrire des propriétés CSS spécifiques pour -webkit- (WebKit, Safari, Opera), -moz- (Firefox), -o- (anciennes versions d'Opera) et -ms- (Microsoft). Tout sera fait automatiquement !

Pour en profiter, créez un fichier postcss.config.js à la racine de votre projet et ajoutez-y le code suivant :

module.exports = {
    plugins: [
        require("autoprefixer")
    ]
}

Maintenant, relancez Webpack puis rechargez votre page. Elle devrait arborer un très beau Midnight Blue !

C'est très bien mais cela ne fonctionnera que dans votre environnement de développement. Tant que le tout n’est pas extrait dans un fichier CSS, vos utilisateurs ne pourront pas profiter de vos belles interfaces. Nous allons donc faire en sorte que tout code écrit dans un fichier SCSS soit compilé en CSS dans un fichier adéquat.

Pour cela, nous allons ajouter de nouvelles dépendances, vous commencez à en avoir l’habitude :

npm install --save-dev extract-text-webpack-plugin

Ajoutez la ligne suivante sous la ligne const path de votre fichier de configuration Webpack pour require le plugin Extract Text :

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

Ensuite, remplacez :

{
  test: /\.scss$/,
  loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
}

Par ceci, pour spécifier quels loaders utiliser et appeler le plugin :

{
  test: /\.scss$/,
  use: ExtractTextWebpackPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader', 'postcss-loader'],
  })
}

Enfin, initialisez le plugin avec le code suivant, après votre objet module :

plugins: [
  new ExtractTextWebpackPlugin("styles.css")
]

Votre fichier de configuration Webpack doit donc désormais ressembler à ceci :

const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader', 'postcss-loader'],
            })
          }]
      },
      plugins: [
        new ExtractTextWebpackPlugin("styles.css")
      ]
  }
  module.exports = config;

C’est l’heure du test ! Lancez npm run watch : si vous n’avez aucune erreur de compilation dans votre terminal et qu’un fichier styles.css a bien été généré dans votre dossier public avec du pur CSS, c’est que tout est bon ! N’oubliez pas de linker votre fichier CSS à votre HTML.
Installer un serveur de développement avec Hot Module Reload

Chose promise, chose due ! Nous allons maintenant un serveur de développement avec Hot Module Reload, qui rechargera automatiquement vos pages en fonction des modifications que vous apporterez à vos fichiers et qui en plus fera office de serveur local.

On commence donc par l’habituelle installation de dépendances :

npm install webpack-dev-server --save-dev

Après l’array de votre objet plugins dans votre fichier de configuration Webpack, ajoutez le code suivant :

devServer: {
  contentBase: path.resolve(__dirname, "./public"),
  historyApiFallback: true,
  inline: true,
  open: true,
  hot: true
},
devtool: "eval-source-map"

Quelques explications :

    contentBase : indique le dossier depuis lequel le contenu sera servi
    historyApiFallback : activation d’un fallback vers index.html pour les Single Page Applications
    inline : active la diffusion de messages dans la console DevTools
    open : ouvre votre navigateur par défaut lorsque le serveur est lancé
    hot : active le Hot Module Reload, soit le rechargement automatique de vos modules à chaque modification/sauvegarde de vos fichiers

Votre fichier de configuration Webpack doit ressembler à ce qui suit après cette nouvelle mise à jour :

const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

let config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader', 'postcss-loader'],
            })
          }]
      },
      plugins: [
        new ExtractTextWebpackPlugin("styles.css")
      ],
      devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
      },
      devtool: "eval-source-map"
  }

module.exports = config;

Maintenant, il va falloir lancer votre serveur ! Pour ce faire, remplacez l’objet scripts de votre package.json par :

"scripts": {
    "start": "webpack-dev-server -d --hot --config webpack.config.js --watch"
  }

Comme vous pouvez le voir, il vous suffit de taper npm run start pour lancer votre serveur et non plus npm run watch comme nous le faisions jusqu’alors. Si tout se passe bien, votre navigateur va alors s’ouvrir avec un onglet contenant votre site.
