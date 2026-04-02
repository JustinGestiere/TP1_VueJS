import { ref } from 'vue'

const curriculum = ref([
  {
    id: 1,
    title: '1. Introduction to Calculus',
    expanded: true,
    lessons: [
      { id: 11, type: 'doc',   title: '1.1 What is a Derivative?', active: true },
      { id: 12, type: 'video', title: '1.2 Limits and Continuity' },
      { id: 13, type: 'quiz',  title: '1.3 Module 1 Quiz' },
    ],
  },
  {
    id: 2,
    title: '2. Integration Techniques',
    expanded: false,
    lessons: [],
  },
])

const activeLesson = ref(11)
const lessonTitle   = ref('1.1 What is a Derivative?')
const lessonContent = ref(`
<h2>Understanding the Basics</h2>
<p>The <u>derivative</u> of a <u>function</u> of a real variable <u>measures</u> the
<u>sensitivity</u> to change of the <u>function</u> value (output value) with respect
to a change in its argument (input value). Derivatives are a fundamental tool of calculus.</p>
<pre><code>f'(x) = lim (h→0) [f(x + h) - f(x)] / h</code></pre>
<p>For example, the derivative of the position of a moving object with respect to time
is the object's velocity; this measures how quickly the position of the object changes
when time advances.</p>
<ul>
  <li>Velocity is the derivative of position.</li>
  <li>Acceleration is the derivative of velocity.</li>
  <li>Jerk is the derivative of acceleration.</li>
</ul>
<p><em>Click here to continue writing...</em></p>
`)

const visibility    = ref('published')
const tags          = ref(['Calculus', 'Math'])
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
    lessonContent.value = '<h2>Quiz</h2><p>Add quiz questions here.</p>'
  } else if (lesson.type === 'video') {
    lessonContent.value = '<h2>Video Lesson</h2><p>Embed or upload a video for this lesson.</p>'
  } else {
    lessonContent.value = `
<h2>Understanding the Basics</h2>
<p>Start writing your lesson content here...</p>
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