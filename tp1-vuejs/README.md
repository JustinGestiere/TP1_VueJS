# TP1 VueJS — Éditeur de cours en ligne

Application web full-stack permettant à un formateur de créer et gérer des cours structurés en modules et leçons.

---

## Stack technique

### Frontend
| Technologie | Rôle |
|---|---|
| **Vue 3** (Composition API) | Framework UI principal |
| **Vue Router 5** | Navigation SPA |
| **Vite 7** | Bundler / serveur de développement |
| **TailwindCSS 3** | Styles utilitaires |
| **@guolao/vue-monaco-editor** | Éditeur de code intégré |
| **@tinymce/tinymce-vue** | Éditeur rich-text alternatif |

### Backend
| Technologie | Rôle |
|---|---|
| **Node.js** | Runtime serveur |
| **Express 5** | API REST |
| **Sequelize 6** | ORM |
| **PostgreSQL** | Base de données relationnelle |
| **dotenv** | Gestion des variables d'environnement |
| **CORS** | Autorisation des requêtes cross-origin |

---

## Architecture du projet

```
tp1-vuejs/
├── frontend/               # Application Vue 3
│   └── src/
│       ├── views/          # Pages de l'application
│       │   └── CourseEditView.vue
│       ├── components/     # Composants réutilisables
│       │   ├── EditorLayout.vue      # Mise en page principale
│       │   ├── TopHeader.vue         # Barre de navigation haute
│       │   ├── SidebarNav.vue        # Barre latérale icônes
│       │   ├── CurriculumSideBar.vue # Panneau curriculum
│       │   ├── LessonEditor.vue      # Zone d'édition de leçon
│       │   ├── RichTextEditor.vue    # Éditeur de texte enrichi
│       │   ├── SettingsPanel.vue     # Panneau de paramètres
│       │   ├── NavItem.vue           # Item de navigation
│       │   ├── NavSection.vue        # Section de navigation
│       │   └── ToolBtn.vue           # Bouton de la barre d'outils
│       ├── composables/
│       │   └── useLessonStore.js     # State management global (réactif)
│       └── router/
│           └── index.js              # Configuration des routes
│
├── backend/                # API Node.js / Express
│   ├── index.js            # Point d'entrée du serveur
│   ├── models/             # Modèles Sequelize
│   ├── migrations/         # Migrations de base de données
│   └── config/             # Configuration BDD (développement / production)
│
└── schémas/                # Documentation UML, MCD/MLD/MPD, cartographie
```

---

## Fonctionnalités disponibles

### 🗂️ Gestion du curriculum
- **Ajout de modules** : un bouton `+ Module` ouvre un champ de saisie inline pour nommer et créer un nouveau module
- **Accordéon de modules** : chaque module peut être déplié / replié via un clic sur son en-tête
- **Ajout de leçons** : bouton `Add lesson` dans chaque module (prompt natif pour saisir le titre)
- **Types de leçons supportés** : `doc` (document), `video`, `quiz` — chacun avec une icône dédiée
- **Sélection active** : la leçon sélectionnée est mise en surbrillance avec un indicateur violet sur le bord gauche

### ✏️ Éditeur de leçon (RichTextEditor)
L'éditeur est basé sur `contenteditable` avec une barre d'outils complète :

| Fonctionnalité | Détail |
|---|---|
| **Gras / Italique / Souligné / Barré** | Formatage de texte de base |
| **Styles de blocs** | Normal, Heading 1, Heading 2, Heading 3 |
| **Alignement** | Gauche, Centre, Droite |
| **Listes** | Liste à puces et liste numérotée |
| **Lien hypertexte** | Insertion via prompt URL |
| **Bloc de code** | Formatage `<pre>` avec style monospace |
| **AI Assist** | Bouton d'assistance IA (UI en place, non connecté) |

Le contenu de l'éditeur est synchronisé avec le store global via `v-model` et se met à jour automatiquement lors du changement de leçon.

### ⚙️ Panneau de paramètres (SettingsPanel)
- **Visibilité** : choix entre `Published`, `Draft`, `Scheduled` (sélection par radio boutons visuels)
- **Prérequis** : sélection d'une leçon existante comme prérequis dans un menu déroulant
- **Tags** : ajout de tags par la touche `Entrée` ou `,`, suppression individuelle par clic sur `✕`
- **Discussions** : toggle on/off pour activer les commentaires étudiants sur la leçon
- **Sauvegarde** : boutons `Save as Draft` et `Update Lesson` avec message de confirmation temporaire

### 🔝 Header (TopHeader)
- Affichage du titre du cours et de son statut (`Draft` / `Published`)
- Bouton **Preview** (UI en place)
- Bouton **Publish Course** : passe le statut à `published` et affiche un message de confirmation animé

### 🗄️ Base de données (backend)
Le schéma de base de données comprend les tables suivantes :

| Table | Description |
|---|---|
| `roles` | Rôles utilisateurs (ex : formateur, apprenant) |
| `users` | Utilisateurs avec email unique et mot de passe |
| `groups` | Groupes d'apprenants |
| `users_groups` | Association many-to-many utilisateurs ↔ groupes |
| `courses` | Cours rattachés à un groupe |
| `groups_courses` | Association many-to-many groupes ↔ cours |
| `contents` | Contenu d'un cours (code de correction, résultat attendu) |
| `learner_contents` | Réponses et progression de chaque apprenant |

---

## State management

L'état global est géré par le composable `useLessonStore.js` (pattern Composition API avec `ref` partagés) — sans Pinia ni Vuex. Le store expose :

- `curriculum` — arbre des modules et leçons
- `activeLesson` / `lessonTitle` / `lessonContent` — leçon en cours d'édition
- `visibility` / `tags` / `discussions` / `prerequisites` — paramètres de la leçon
- `courseStatus` / `saveMessage` — état de publication
- Fonctions : `toggleModule`, `selectLesson`, `addModule`, `addLesson`, `addTag`, `removeTag`, `saveDraft`, `updateLesson`, `publishCourse`

---

## Installation et lancement

### Prérequis
- Node.js `^20.19.0` ou `>=22.12.0`
- PostgreSQL en cours d'exécution

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`

### Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine du dossier `backend` :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tp1_vuejs
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
NODE_ENV=development
```

Lancer les migrations puis le serveur :

```bash
npx sequelize-cli db:migrate
node index.js
```

L'API est accessible sur `http://localhost:3000`

### Docker (optionnel)

Des `Dockerfile` sont disponibles dans les dossiers `frontend/` et `backend/` pour une exécution conteneurisée.

---

## Routes disponibles

| Route | Composant | Description |
|---|---|---|
| `/` | — | Redirige vers `/create-course` |
| `/create-course` | `CourseEditView` | Interface principale d'édition de cours |

---

## Documentation complémentaire

Le dossier `schémas/` contient les diagrammes du projet :
- **UML** — diagrammes de classes et de séquences
- **MCD / MLD / MPD** — modélisation de la base de données
- **Cartographie** — vue d'ensemble de l'architecture
