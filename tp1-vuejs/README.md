TP1 VueJS — Plateforme d'Édition de Cours en Ligne
Introduction au projet

Ce projet a été réalisé dans le cadre d’un TP pour travailler Vue.js 3 et comprendre comment organiser une application full-stack.

L’objectif était de créer une plateforme simple de gestion de cours où un formateur peut créer des modules et des leçons. L’idée principale était surtout de tester la logique côté frontend et de voir comment structurer un projet un peu plus complet que d’habitude.

Je me suis principalement concentré sur l’interface et la manipulation des données côté client, même si une base backend a aussi été mise en place.

État actuel du projet

Le projet fonctionne comme un prototype avancé. On peut déjà simuler la création et l’organisation de contenu, mais tout n’est pas encore relié proprement à la base de données.



Interface utilisateur
Éditeur de curriculum :
Il est possible d’ajouter des modules et des leçons via un panneau latéral. La structure est dynamique, même si elle est encore gérée en grande partie côté frontend.

Éditeur de texte :
J’ai intégré un éditeur simple pour permettre de formater le contenu (gras, listes, etc.). Ça fonctionne, mais ça reste basique.

Paramétrage des leçons :
Chaque leçon peut avoir un statut (brouillon, publié…) et quelques paramètres. Ce n’est pas encore totalement connecté au backend.

eedback visuel :
J’ai ajouté quelques animations et messages pour rendre l’utilisation plus claire, même si ce n’est pas parfait.
Choix techniques

Frontend : Vue 3 (Composition API)

Style : TailwindCSS

Backend : Node.js avec Express

Base de données : PostgreSQL avec Sequelize



Le backend est en place, mais il n’est pas encore exploité à 100%.



Retour d’expérience

Ce TP m’a surtout permis de voir que faire une interface, c’est une chose, mais bien structurer un projet complet, c’est autre chose.




Organisation du projet

Au début, je n’avais pas bien séparé le frontend et le backend, ce qui m’a un peu ralenti. J’ai corrigé ça ensuite, mais j’aurais clairement dû le faire dès le départ.




Gestion des données

Une grosse partie des données est encore stockée côté frontend (store).
J’aurais aimé aller plus loin sur les routes API (POST, PUT, DELETE), mais j’ai manqué de temps.
C’est clairement un point à améliorer pour rendre l’application plus réaliste.



Utilisation des composants

J’ai commencé à utiliser Shadcn-Vue, mais pas de manière très poussée.
Avec plus de temps, j’aurais essayé de faire des composants plus propres, surtout pour les parties comme la gestion des utilisateurs.



Architecture du projet
tp1-vuejs/
├── frontend/             # Application Vue.js
│   ├── src/
│   │   ├── components/
│   │   ├── services/     # Pas encore totalement utilisé
│   │   ├── views/
│   │   ├── router/
│   │   └── style.css
│   └── package.json
├── backend/              # API Node.js / Express
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── index.js
└── docker-compose.yml



Améliorations possibles

Si je devais continuer le projet :

Mettre en place une vraie authentification (JWT)
Terminer les routes API pour avoir un vrai CRUD complet
Ajouter une gestion des utilisateurs plus propre
Mettre en place un suivi de progression
Relier le bach=kend et Frontend +  mettre en place un docker propre.


Installation
En local

Frontend :

cd frontend
npm install
npm run dev

Backend :

cd backend
npm install
npm run dev

(Il faut une base PostgreSQL active, erreur que j'ai faite car j'ai oublié de la mettre en place.)

Avec Docker
docker-compose -f docker-compose.prod.yml up -d
Conclusion

Ce projet m’a permis de mieux comprendre comment structurer une application avec Vue.js et un backend Node.js.

Même si tout n’est pas terminé, j’ai une meilleure vision des points importants, notamment la gestion des données et l’organisation du projet. Avec plus de temps, l’objectif serait de transformer ce prototype en application complète.