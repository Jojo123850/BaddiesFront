# BADDIES  Frontend

Application web en français consacrée à l’évaluation et au suivi des douleurs menstruelles. Le front propose un parcours adapté à l’âge, des premiers gestes, un questionnaire, un récapitulatif et un historique des évaluations.

- **Application** : [baddies-beryl.vercel.app](https://baddies-beryl.vercel.app)
- **Dépôt frontend** : [Jojo123850/BaddiesFront](https://github.com/Jojo123850/BaddiesFront)
- **API utilisée** : [baddies-api.onrender.com](https://baddies-api.onrender.com)

L’application fournit des informations et une aide à l’orientation ; elle ne remplace pas un avis médical.

## Fonctionnalités

- Sélection du pays : France ou Madagascar, puis de la tranche d’âge.
- Accès aux premiers gestes et aux contacts d’urgence.
- Évaluation des douleurs, localisation, récapitulatif et propositions de solutions.
- Historique local ou enregistré sur un compte, consultation des épisodes et graphiques de suivi.
- Export PDF du récapitulatif.
- Synchronisation des données
- Inscription, connexion, gestion du profil et récupération du mot de passe via l’API.
- Consentements distincts pour les données de santé et les statistiques Google Analytics.
- Application installable (PWA), avec mise en cache des ressources de l’interface.

Le parcours d’évaluation, l’historique et le suivi sont réservés à la tranche « 15 ans et plus » et nécessitent un consentement aux données de santé. Les routes et leurs conditions d’accès sont définies dans `src/App.tsx`.

## Technologies

| Usage | Outils |
| --- | --- |
| Interface | React 19, TypeScript |
| Développement et compilation | Vite 8 |
| Navigation | React Router 7 |
| Styles | Sass / SCSS |
| Graphiques | Recharts |
| Export PDF | jsPDF |
| Icônes | Lucide, Font Awesome |
| PWA | vite-plugin-pwa, Workbox |
| Optimisation des images | Sharp, format WebP |
| Qualité du code | ESLint, TypeScript |

Les versions installées sont verrouillées dans `package-lock.json`.

## Prérequis

- Git et npm.
- Node.js **22.13 ou supérieur** dans une branche compatible avec les dépendances. Vite exige Node `20.19+` ou `22.12+` ; le test Analytics utilise une API disponible à partir de Node 22.13.
- Un navigateur récent. Les fonctionnalités de compte nécessitent une connexion à l’API.

## Installation et lancement

```bash
git clone https://github.com/Jojo123850/BaddiesFront.git
cd BaddiesFront
npm ci
```

Créer un fichier `.env.local` à partir de `.env.example` :

```dotenv
VITE_GA_MEASUREMENT_ID=G-Q1F6WRV1N4
VITE_GA_DEBUG_MODE=false
```

Puis lancer :

```bash
npm run dev
```

Ouvrir l’adresse indiquée dans le terminal par Vite. Au premier accès, suivre les écrans de pays et d’âge, puis effectuer ses propres choix de consentement.

Avant le démarrage et la compilation, le script de conversion transforme automatiquement les images de `src/assets/images-source/` en WebP dans `src/assets/images/`.

## Configuration

| Variable | Utilisation |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Identifiant du flux GA4. Si absent, le tag Analytics n’est pas chargé. |
| `VITE_GA_DEBUG_MODE` | La chaîne exacte `true` active le débogage GA4. Laisser `false` ou ne pas définir la variable pour un usage normal. |

Les variables `VITE_*` sont intégrées au JavaScript public lors de la compilation : ne pas y placer de secret. Redémarrer Vite après une modification locale ; reconstruire et redéployer après une modification dans Vercel.

L’adresse de l’API est actuellement définie par `BASE_URL` dans `src/services/apiService.ts`. Pour utiliser un backend local, modifier cette constante et configurer le backend pour autoriser l’origine du front (CORS). Aucune variable `VITE_API_URL` n’est actuellement lue par le code.

Le backend est un service distinct : ce dépôt ne démarre ni serveur API ni base de données.

## Commandes

| Commande | Description |
| --- | --- |
| `npm ci` | Installer les dépendances à partir du fichier de verrouillage. |
| `npm run dev` | Convertir les images puis démarrer le serveur de développement. |
| `npm run convert-images` | Convertir les images sources en WebP. |
| `npm run build` | Convertir les images, vérifier TypeScript et générer `dist/`, dont le service worker. |
| `npm run preview` | Servir localement le dernier build de `dist/`. |
| `npm run lint` | Analyser le projet avec ESLint. |
| `node scripts/test-analytics.mjs` | Tester le module Analytics avec un navigateur simulé, sans envoyer de données à Google. |

Il n’existe pas actuellement de commande générale `npm test` dans ce dépôt. Le test Analytics ne couvre pas l’ensemble des fonctionnalités.

## Organisation du code

```text
public/                 Ressources publiques et icônes
scripts/                Conversion des images et test Analytics
src/
  assets/               Images sources, images converties et autres ressources
  components/           Composants d’interface réutilisables
  data/                 Données embarquées
  evaluation/           Types, contexte et état de l’évaluation
  pages/                Écrans de l’application
  services/             API, session, historique, consentements et Analytics
  styles/               Styles SCSS
  App.tsx               Routes, contrôles d’accès et suivi de navigation
  main.tsx              Point d’entrée React
vite.config.ts          Configuration Vite et PWA
vercel.json             Réécriture des routes vers index.html
GA4.md                  Configuration et vérification de Google Analytics
```

## Données et consentements

Le navigateur mémorise notamment le pays, la tranche d’âge, les consentements, l’historique local et les jetons de session dans `localStorage`. L’historique du compte utilise les appels authentifiés de `src/services/historyService.ts`.

Le consentement aux données de santé et le consentement Analytics sont gérés séparément. Les choix peuvent être modifiés dans les paramètres de l’application. Utiliser des données fictives lors des tests et ne pas publier de jetons de connexion ni de données de santé dans les captures, journaux ou tickets.

### Google Analytics et DebugView

Le tag GA4 est chargé après acceptation du consentement Analytics. Le suivi manuel des pages est limité à `/Home` et `/ImmediateHelp` ; les vues automatiques sont désactivées. Les pages du questionnaire et du récapitulatif ne font pas partie de cette liste.

Pour tester DebugView :

1. Définir `VITE_GA_DEBUG_MODE=true` dans l’environnement à tester.
2. Reconstruire et redéployer cet environnement.
3. Ouvrir son adresse avec une session dont la personne a accepté Analytics.
4. Visiter `/Home` ou `/ImmediateHelp` et consulter DebugView dans la propriété correspondant au flux configuré.
5. Après le test, remettre la variable à `false` et redéployer si elle a été activée en production.

Le rapport Temps réel peut afficher des utilisateurs alors que DebugView reste vide lorsque le mode débogage n’est pas activé. Les contrôles de confidentialité et le consentement peuvent aussi limiter l’affichage. Voir [GA4.md](./GA4.md) pour les paramètres réseau à vérifier et les références Google.

## PWA et fonctionnement hors ligne

Le service worker est généré pendant le build. Il met en cache les ressources de l’interface et utilise `index.html` comme repli pour la navigation. L’installation et la disponibilité hors ligne dépendent du navigateur et d’un premier chargement réussi.

La mise en cache de l’interface ne rend pas l’API disponible hors ligne : connexion au compte, synchronisation et autres opérations serveur nécessitent le réseau. Pour vérifier la PWA localement, utiliser un build avec `npm run build`, puis `npm run preview`.

## Déploiement sur Vercel

1. Importer le dépôt frontend dans Vercel et sélectionner le preset **Vite**.
2. Utiliser `npm ci` pour l’installation, `npm run build` pour la compilation et `dist` comme dossier de sortie.
3. Configurer les variables d’environnement dans **Settings → Environment Variables**.
4. Déployer la branche souhaitée. Si le projet est relié à GitHub, les publications sur la branche de production peuvent déclencher un déploiement automatique selon les réglages du projet.
5. Vérifier que le déploiement est **Ready**, puis contrôler le parcours initial, une route ouverte directement, les consentements et l’accès à l’API.

Choisir **Production** pour les variables du site de production et **Preview** pour celles des déploiements de test. Toute modification d’une variable nécessite un nouveau déploiement pour être intégrée au build.

Le fichier `vercel.json` redirige les URL vers `index.html` pour permettre l’accès direct aux routes React Router.

## Dépannage

| Symptôme | Vérification |
| --- | --- |
| `/Home` redirige vers le choix du pays ou de l’âge | Ces choix doivent être renseignés avant l’accès à l’accueil. |
| Le questionnaire redirige vers les premiers gestes | Vérifier la tranche d’âge sélectionnée ; ce parcours est réservé aux 15 ans et plus. |
| Le questionnaire demande un consentement | Le consentement aux données de santé est nécessaire pour ce parcours. |
| Le compte ou l’historique distant ne charge pas | Vérifier le réseau, la disponibilité de l’API, la session et les erreurs CORS. |
| Aucune collecte Analytics | Vérifier l’identifiant au build, le consentement, la page visitée et les éventuels blocages du navigateur. |
| Temps réel actif, DebugView vide | Vérifier le mode débogage de la version déployée et la propriété Analytics sélectionnée. |
| Ancienne interface après déploiement | Recharger la page, puis contrôler le déploiement servi et la mise à jour du service worker. |

## Ressources tierces

Le fichier `licences-frontend.csv` recense des dépendances et leurs licences. Vérifier également les conditions d’utilisation des images, polices et autres ressources avant toute réutilisation. Ce fichier ne constitue pas une licence globale du projet.


# Auteur
Giovanie ANDRIANIRINA