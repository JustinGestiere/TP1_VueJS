import { ref } from 'vue'

const curriculum = ref([
  {
    id: 1,
    title: '1. Introduction à Python',
    expanded: true,
    lessons: [
      { id: 11, type: 'doc',   title: '1.1 Qu\'est-ce que Python ?', active: true },
      { id: 12, type: 'video', title: '1.2 Installation et Configuration' },
      { id: 13, type: 'quiz',  title: '1.3 Quiz d\'introduction' },
    ],
  },
  {
    id: 2,
    title: '2. Les Bases de Python',
    expanded: false,
    lessons: [
      { id: 21, type: 'doc',   title: '2.1 Variables et Types de Données' },
      { id: 22, type: 'doc',   title: '2.2 Opérateurs Arithmétiques' },
      { id: 23, type: 'video', title: '2.3 Les Chaînes de Caractères' },
      { id: 24, type: 'quiz',  title: '2.4 Quiz sur les bases' },
    ],
  },
  {
    id: 3,
    title: '3. Structures de Contrôle',
    expanded: false,
    lessons: [
      { id: 31, type: 'doc',   title: '3.1 Conditions if/else' },
      { id: 32, type: 'doc',   title: '3.2 Boucles for et while' },
      { id: 33, type: 'quiz',  title: '3.3 Quiz sur les structures' },
    ],
  },
  {
    id: 4,
    title: '4. Fonctions et Modules',
    expanded: false,
    lessons: [],
  },
])

const activeLesson = ref(11)
const lessonTitle   = ref('1.1 Qu\'est-ce que Python ?')
const lessonContent = ref(`
<h2>Qu'est-ce que Python ?</h2>
<p>Python est un <u>langage de programmation</u> <u>interprété</u>, <u>multi-paradigmes</u> et <u>haut niveau</u>. 
Créé par Guido van Rossum en 1991, Python est connu pour sa <u>syntaxe claire</u> et <u>lisible</u>.</p>
<pre><code># Votre premier programme Python
print("Bonjour, le monde!")
nom = "Alice"
âge = 25
print(f"Je m'appelle {nom} et j'ai {âge} ans")</code></pre>
<p>Python est utilisé dans de nombreux domaines : développement web, analyse de données, 
intelligence artificielle, automatisation, et bien plus encore.</p>
<ul>
  <li>Syntaxe simple et facile à apprendre</li>
  <li>Grande communauté et nombreuses bibliothèques</li>
  <li>Portable sur toutes les plateformes</li>
  <li>Idéal pour les débutants</li>
</ul>
<p><em>Continuez pour découvrir comment installer Python...</em></p>
`)

const visibility    = ref('published')
const tags          = ref(['Python', 'Programmation'])
const discussions   = ref(true)
const prerequisites = ref('none')
const courseStatus  = ref('draft')  // 'draft' | 'published'
const saveMessage   = ref('')

let saveTimer = null
function showSaveMessage(msg) {
  saveMessage.value = msg
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => { saveMessage.value = '' }, 2500)
}

function toggleModule(id) {
  const mod = curriculum.value.find(m => m.id === id)
  if (mod) mod.expanded = !mod.expanded
}

function selectLesson(lesson) {
  activeLesson.value = lesson.id
  lessonTitle.value  = lesson.title
  if (lesson.type === 'quiz') {
    lessonContent.value = '<h2>Quiz</h2><p>Ajoutez des questions de quiz ici.</p>'
  } else if (lesson.type === 'video') {
    lessonContent.value = '<h2>Leçon Vidéo</h2><p>Intégrez ou téléchargez une vidéo pour cette leçon.</p>'
  } else {
    lessonContent.value = `
<h2>Nouvelle Leçon</h2>
<p>Commencez à rédiger le contenu de votre leçon ici...</p>
`
  }
}

function addModule(title) {
  const id = Date.now()
  curriculum.value.push({
    id,
    title: `${curriculum.value.length + 1}. ${title}`,
    expanded: true,
    lessons: [],
  })
}

function addLesson(moduleId, title, type = 'doc') {
  const mod = curriculum.value.find(m => m.id === moduleId)
  if (mod) {
    mod.lessons.push({ id: Date.now(), type, title })
  }
}

function removeTag(tag) {
  tags.value = tags.value.filter(t => t !== tag)
}

function addTag(tag) {
  const t = tag.trim()
  if (t && !tags.value.includes(t)) tags.value.push(t)
}

function saveDraft() {
  courseStatus.value = 'draft'
  showSaveMessage('✓ Saved as draft')
}

function updateLesson() {
  showSaveMessage('✓ Lesson updated')
}

function publishCourse() {
  courseStatus.value = 'published'
  showSaveMessage('✓ Course published!')
}

export function useLessonStore() {
  return {
    curriculum,
    activeLesson,
    lessonTitle,
    lessonContent,
    visibility,
    tags,
    discussions,
    prerequisites,
    courseStatus,
    saveMessage,
    toggleModule,
    selectLesson,
    addModule,
    addLesson,
    removeTag,
    addTag,
    saveDraft,
    updateLesson,
    publishCourse,
  }
}