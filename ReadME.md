# Workshop
## Faire un site de A à Z : Partie 1 |  Back-End

L'objectif de ce workshop est de vous apprendre à créer votre propre serveur Node.JS.
Nous corrigerons les exercices au fur et à mesure. Afin de s'assurer que vous comprenez bien, la majorité des exercices vous demandera d'effectuer les **bonnes** recherches afin de trouver les solutions appropriés.

# I. Setup
## Installation
Afin de réaliser ce workshop, vous allez avoir besoin de plusieurs outils :
- **node.js**  *Framework javascript*
- **npm** *Outil permettant d'installer des paquets / lancer nos scripts*
- **Postman** *Logiciel permettant d'effectuer nos tests*
- **MongoDB** *Base de donnée où nous allons stocker nos data*

## Initialisation
Vous pouvez, soit cloner notre début de projet ici : ```https://github.com/Sorakie/SiteA-Z-back```

Soit initialiser vous même avec les instructions suivantes :

```sh
npm init
mkdir controllers
mkdir middleware
mkdir models
mkdir routes
touch app.js
```
**npm init** va initialiser notre dossier node.js. Cela va générer un fichier package.json, qui contient les librairies que nous allons utiliser au fur et à mesure.
Nous allons maintenant installer les différentes librairies que nous allons utiliser, pour ce faire, nous utilisons **npm install**
Si vous avez cloner notre repo, faites juste ```npm install``` dans le dossier
Sinon, faites les commandes suivantes :
```sh
npm install bcrypt
npm install express
npm install mongoose
npm install jsonwebtoken
```
**Bcrypt** est une librairie permettant de **hash** les mots de passes  
**Express** est une librairie permettant d'utiliser des fonctionnalités simplifiés de node.js  
**Mongoose** est une librairie permettant d'utiliser la base de donnée MongoDB  
**JsonWebToken** est une librairie permettant de génerer des Tokens  

# II Exercice
## 1. Initialisation
Pour cet exercice, vous allez initialiser notre serveur node, et vous connecter à votre base de donnée.  
Dans le fichier **app.js**,  vous allez rajouter la connexion à mongodb, sur cette url : **mongodb://localhost:27017/workshop**  
``/!\ La connexion mongoDB prend deux paramètres, l'adresse, et les options de connexions``  
Afin de vérifier que vous êtes bien connecté, vous devez afficher un message en cas de succès.  
  
Ensuite, vous allez créer votre première route, dans le fichier **app.js**  
  
La variable ```app``` contient notre serveur express, c'est par cette variable que vous allez pouvoir lier vos **routes**.  
Dans ce workshop, nous allons voir deux types de routes :  
- **Post** : Un envoie de requête qui contient des informations dans son **body**, généralement utilisé pour les **controllers** qui vont modifier des données (par exemple, créer un utilisateur)  
- **Get** : Un envoie de requête qui ne possède pas de **body**, utilisé pour récupérer des informations du serveur.  

Pour cette partie, vous devez faire une route en **get**, sur le path **/**, qui va renvoyer en résultat **ok**  
  
``/!\ Si vous n'avez jamais fait de web, c'est tout à fait normal que vous ayez des difficultés sur cet exercice. Une fois la correction effectué, le reste des exercices sera plus simple``  
  
Après avoir fait cette route, vous devez, à la fin de votre fichier **app.js**, créer une variable **server**, où vous allez créer votre serveur http depuis la variable **app**, afin d'écouter, sur le port **8080**.  
  
## 2. Modèles  
Afin de stocker des informations dans notre base de donnée, nous devons créer un "Schema", qui est en réalité un modèle d'objet. (Cela ressemble à une structure en **c**)
  
Dans le fichier **models/user.js**, nous allons créer notre objet utilisateur.  
Dans ce fichier, existe un mongoose.Schema, que vous allez compléter !  
Pour ce faire, vous devez créer des sous objets, du nom de la variable, et préciser le type dedans.  
ex:  
```js
name: {
	type: String
	required: true
}
```
Les schémas mongoose ont plusieurs type de variable. Dans notre workshop, vous n'aurez à utiliser que les **String** et les **Number**.  
Certains paramètre, comme **required** sont optionnel, et permettent d'indiquer, dans ce cas, qu'une variable doit obligatoirement avoir une valeur pour pouvoir être stocké dans la base de donnée.  

Dans cette exercice, vous devez créer les variables suivantes :  
- Firstname
- Lastname
- Email (Obligatoire)
- Password (Obligatoire)
- Age

Une fois votre objet crée, vous devez l'exporter avec la fonctionnalité **module.exports**, nous vous laissons chercher la solution.  

## 3. Controllers
Nous allons enfin rentrer dans le vif du sujet, les controllers !  
**Un controller est une fonction qui va être appellé au travers d'une route**  
Pour votre premier controller, nous avons mit le début de votre fonction, **signup**  
L'objectif de cette fonction est d'enregistrer un utilisateur.  
Sur cette ligne :  
``js
exports.signup = async (req, res, next) => {
``
**exports** permet d'exporter la fonction signup, nous l'utiliserons pour faire la route.  
**signup** est le nom de notre fonction  
**async** permet d'executer des commandes **asynchrone** dans notre fonction, grace à **await** (nous y reviendrons très vite)  
**req** contient les informations reçu sur le serveur  
**res** contient les informations que le serveur va renvoyer  
**next** permet de décider quelle étape faire apres cette fonction (dans nos controllers, nous ne l'utiliserons jamais)  

### Partie 1 :
Vous devez vérifier que l'utilisateur vous envoie les bonnes informations dans son body.  
Le body est stocké dans **req.body**. Parmi les valeurs obligatoires, il y a l'email et le password. Vous devez donc vérifier que la variable **email** et la variable **password** existe bien dans **req.body**.  
Dans le cas où il manquerait des informations, vous devez renvoyer une erreur **400** avec un message d'erreur.  

### Partie 2 :
Afin d'éviter qu'un utilisateur s'enregistre plusieurs fois avec un même email, vous allez vérifier dans la base de donnée si l'email fournit existe déjà. Pour ce faire, vous allez utiliser **await**.  
**await** permet d'effectuer une fonction en asynchrone, ce qui vas nous assurer que nous avons bien fini notre recherche dans la base de donnée avant de passer à la suite.  

Pour utiliser mongoose, vous devez prendre le schema (ici User, inclut ligne 1), et appeller une de ses fonctions.  
Il y'a des fonctions pour toutes les actions possibles (trouver une entrée, trouver toutes les entrées, modifier, supprimer, créer, ...)  
Ici, vous allez utiliser **findOne**, car si il existe **au moins une** entrée avec cet email, alors le **signup** doit renvoyer une erreur **400**.  

## Partie 3:
Si les deux étapes précédentes sont valides, nous allons pouvoir créer notre utilisateur.  
La première chose à faire, c'est d'**encrypter** le mot de passe. Nous ne voulons pas que n'importe qui puisse accéder au mot de passe de nos utilisateurs.  
Nous allons donc utiliser **bcrypt**, et sa méthode **hash** ([lien magique](https://www.google.com))  

En Javascript, les fonctions peuvent être suivient de **then** et **catch**, permettant, respectivement, de recuperer le resultat et d'effectuer des actions, ainsi que de faire une gestion d'erreur.  
Par exemple,   
```js
MaSuperFonction(valeur => {
	if (valeur === 10)
		return 5 / 0
	if (valeur < 0)
		return "négatif"
	else
		return "positif"
})
.then(resultat => {
	console.log(resultat) // Affichera négatif si valeur est inférieur à 0, sinon, positif
})
.catch(err => {
	console.log(err) // Affichera "cannot divide by 0" si valeur est égal à 10 (cela va provoquer une erreur)
})
```
Vous allez donc, **après** avoir encoder votre mot de passe,  
créer un objet User (**new User({})**), et remplir les valeurs du **modèles** avec que vous avez dans le **body**.  

Finalement, une fois votre objet créer, vous allez le sauvegarder, grâce à la méthode **save()**.  
Ce faisant, vous allez renvoyer un code **201** avec votre objet User, si tout a fonctionné, sinon
vous renvoyez **500** avec l'erreur correspondante à l'échec.  

## 4. Les tests
Nous allons enfin pouvoir tester notre controllers !  
Dans le fichier **route/user.js**, vous allez ajouter une nouvelle route correspondant à notre fonction **signup**.  
Nous avons déjà importer votre fichier **user** dans la variable **userController**. Pour accéder à la fonction, il suffit de l'appeller via **userController.signup**  

Vous allez donc créer une route (Retournez au début si vous ne savez pas quoi faire entre **Post** et **Get**)  
Pour ce faire, vous allez utiliser la variable **router** (déjà initialisé), et lui donner en argument le chemin de notre route, à savoir : **/signup**  

Dans le fichier **app.js**, vous allez dire à notre application d'utiliser ces routes, en rajoutant une ligne avant la création du serveur.  
Pour ce faire, vous allez dire à **app** d'**utiliser**, sur la route **/api**, la variable **userRoutes**.  

## 4.5 Postman
Postman est un outil très puissant, permettant de tester des routes **web**, mais aussi d'automatiser les tests, et même de générer une documentation !  
Vous allez donc lancer Postman.  
Effectuer les étapes suivantes :  

 Créer votre collection ![enter image description here](https://cdn.discordapp.com/attachments/547009082163200020/814614309590138990/Capture_decran_de_2021-02-25_22-46-02.png) Créer un environnement (l'onglet à droite "no environment") 
![enter image description here](https://cdn.discordapp.com/attachments/547009082163200020/814615878221430844/Capture_decran_de_2021-02-25_22-52-26.png)Créer une requête Signup ![enter image description here](https://cdn.discordapp.com/attachments/547009082163200020/814615876233461790/Capture_decran_de_2021-02-25_22-52-11.png)
Lancez votre serveur avec ``npm start`` et cliquez sur **Send**, afin de voir le résultat apparaître ! 

## 5. Connexion
Dans le fichier **controllers/user.js**, rajouter une méthode **login**.  
Le body doit contenir un **email** et un **password**, sinon, renvoyez une erreur **400**  
Récupérer dans la **base de donnée** un utilisateur avec l'email que l'on vous a envoyer. Si vous ne le trouvez pas, renvoyer une erreur **400**  
Comparer, grâce à la fonction **compare** de **bcrypt** le mot de passe de votre base de donnée, ainsi que celui dans le body.  
Si **compare** renvoie une erreur, alors le mot de passe et invalide, et vous renvoyez une erreur **400**  
Sinon, vous allez utiliser jsonwebtoken (**jwt**) pour créer un **token**  

Un **token** est un code temporaire permettant d'identifier un utilisateur lors des requêtes au serveur. Cela permet notamment, lorsque vous êtes sur un site, de ne pas avoir besoin de vous reconnecter à chaque changement de page.  
Vous allez génerer un token d'une durée de **24h**, avec une **salt key** : "TOKEN", et vous allez y stocker **userID**, l'id de votre utilisateur.  
``/!\ MongoDB renvoie des objet avec une variable .id et une variable ._id, la variable .id 
est utilisé par mongoDB exclusivement. Vous devez utiliser la variable ._id pour identifier vos utilisateurs
``  

Finalement, renvoyez un code **200** avec un objet contenant :  
- l'ID de l'utlisateur (**id**)
- le token de l'utilisateur (**token**)

N'oubliez pas de rajouter la nouvelle route dans le fichier **routes/user.js**  

## 5.5 Postman (encore !)
Nous allons, cette fois, utiliser une fonctionnalité très utile de Postman, l'environnement, et les tests.  
Comme pour Signup, rajouter une requête **login** dans Postman.  
Tester votre connexion, vous récupérez un objet avec le **token**. Mais afin de ne pas avoir  à le mettre manuellement encore et encore, nous allons l'enregistrer automatiquement !  
Pour ce faire, vous avez un onglet **test**  
vous allez rajouter un test.  
Afin de gagner du temps, voici le test que vous allez remplir :  
```js
pm.test("Login", function() {
	pm.response.to.have.status(200); // Le test echouera si le statut reçus est différent de 200.
	postman.setEnvironmentVariable("token", pm.response.json().data.token); // On stocke notre token dans une variable token
	postman.setEnvironmentVariable("id", pm.response.json().data.id); // On stocke l'id
});
```

Si vous cliquez sur **send**, Postman va sauvegarder la réponse, afin de récuperer le token et l'id de l'utilisateurs.  

## 6. Authentication
Vous allez créer une methode **me**, en **Get**, qui prendra, dans son url, un **id** d'utilisateur.  
Cette fonction doit renvoyer l'utilisateur, apres l'avoir chercher dans la base de donnée.  
Puisque nous n'utilisont pas de **Post**, vous ne pouvez pas utiliser le body. Votre **routes** va alors ressembler à quelque chose comme ça :  
``/api/me/4556ds4f65sd46f54sd654fsd654``
et vous devrez récuperer l'id dans le **req.params**.  

Testez avec Postman (**tips:** vous pouvez, puisque vous avez enregistrer votre environnement, appeller la route de cette manière dans Postman : ``localhost:8080/api/me/{{id}}``  

## 7. Middleware
Voici la partie la plus importante. Comme vous avez pu le voir dans l'exercice **6**, n'importe qui peut récupérer des informations si elle à votre **id**. Nous allons donc utiliser le **token** que vous aviez générer plus tôt.  

Le **middleware** est une **étape** précédent un **controller**. Cela nous permet d'effectuer diverses action, avant d'executer une fonction.  

Dans le fichier **middleware/auth.js**, vous avez une fonction avec un **try** et un **catch**. Il s'agit d'une gestion d'erreur classique.  
Nous devons vérifier que le **token** que l'utilisateur vas nous envoyer est correct.   
**Dans le Try :** 
Récupérez le **token** qui est dans **req.headers.authorization**. Il s'agit d'un **Bearer Token**, mais nous ne sommes intéressés que par le token en lui même, retirez donc le **Bearer**.  

Grâce à la méthode **verify** de jsonwebtoken (**Jwt**), décodez votre token, avec la **Salt Key** que nous avions définis (TOKEN)  

Enfin, dans ce que vous avez décodez, vous devez avoir un **userID**. Stockez le.  

Afin de gagner du temps, nous allons le stocker dans nos résultats. Vous pouvez utiliser l'objet **res.locals** pour y stocker ce que vous voulez. En l'occurance, stocker votre userID dans **res.locals.user**  

Enfin, appellez **next()**, pour signaler au serveur qu'il peut passer aux controllers.  

**Dans le Catch :**  
Si notre décodage échoue, nous allons rentrer dans cette partie, où vous devez tout simplement renvoyer une erreur **401**.  

## 7.2 AuthMe
Afin de tester notre **Middleware**, créez une nouvelle méthode **authMe**. Celle ci va chercher l'utilisateur stockés dans **res.locals.user**, et renvoyer l'objet trouvé.  

Dans les routes, nous allons rajouter notre sécurité, grâce à la variable **auth**, déjà initialisée. Il suffit de la mettre en paramètre de notre **router.get**.  

## 7.5 Postman (Dernière fois, promis.)
Dans Postman, vous allez pouvoir tester cette méthode, en rajoutant dans l'onglet **Authorization**, un token de type **Bearer**, avec la valeur **{{token}}**  

Si ça marche, félicitations ! Vous avez terminer ce workshop un peu laborieux ! Vous avez tout ce qui faut pour développer vos propres sites internet sans aucune difficultés !  

## 8. Bonus

En bonus, nous vous proposons ces trois exercices :  
- 1. Créer une méthode **Update** Pour changer le Prénom / Nom de l'utilisateur
- 2. Une méthode **Delete** Pour supprimer son compte
- 3. Dockeriser votre serveur !

## Merci d'avoir participer à notre WorkShop !

