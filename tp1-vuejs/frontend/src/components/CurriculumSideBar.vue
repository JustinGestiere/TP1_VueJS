<template>
  <aside class="curriculum">
    <!-- Header -->
    <div class="curr-header">
      <span class="curr-title">Curriculum</span>
      <button class="btn-add-module" @click="showAddModule = true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Module
      </button>
    </div>

    <!-- Add module inline form -->
    <div v-if="showAddModule" class="add-module-form">
      <input
        ref="moduleInput"
        v-model="newModuleTitle"
        placeholder="Module name…"
        class="module-input"
        @keydown.enter="confirmAddModule"
        @keydown.escape="showAddModule = false"
      />
      <button class="btn-confirm" @click="confirmAddModule">Add</button>
      <button class="btn-cancel" @click="showAddModule = false">✕</button>
    </div>

    <!-- Modules list -->
    <div class="modules-list">
      <div v-for="module in curriculum" :key="module.id" class="module">
        <!-- Module header -->
        <div class="module-header" @click="toggleModule(module.id)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron">
            <path :d="module.expanded ? 'M6 9l6 6 6-6' : 'M9 18l6-6-6-6'" />
          </svg>
          <span class="module-title">{{ module.title }}</span>
        </div>

        <!-- Lessons -->
        <div v-if="module.expanded" class="lessons">
          <div
            v-for="lesson in module.lessons"
            :key="lesson.id"
            class="lesson-item"
            :class="{ active: activeLesson === lesson.id }"
            @click="selectLesson(lesson)"
          >
            <!-- Icon -->
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lesson-icon">
              <path :d="lessonIconPath(lesson.type)" />
            </svg>
            <span class="lesson-title">{{ lesson.title }}</span>
          </div>

          <!-- Add lesson button -->
          <button class="btn-add-lesson" @click="promptAddLesson(module.id)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add lesson
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useLessonStore } from '../composables/useLessonStore.js'

const { curriculum, activeLesson, toggleModule, selectLesson, addModule, addLesson } = useLessonStore()

const showAddModule  = ref(false)
const newModuleTitle = ref('')
const moduleInput    = ref(null)

async function confirmAddModule() {
  if (!newModuleTitle.value.trim()) return
  addModule(newModuleTitle.value.trim())
  newModuleTitle.value = ''
  showAddModule.value  = false
}

// Watch showAddModule to auto-focus input
import { watch } from 'vue'
watch(showAddModule, async (val) => {
  if (val) {
    await nextTick()
    moduleInput.value?.focus()
  }
})

function promptAddLesson(moduleId) {
  const title = window.prompt('Lesson title:')
  if (title?.trim()) addLesson(moduleId, title.trim())
}

const LESSON_ICONS = {
  doc:   'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
  video: 'M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z',
  quiz:  'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4',
}
function lessonIconPath(type) {
  return LESSON_ICONS[type] || LESSON_ICONS.doc
}
</script>

<style scoped>
.curriculum {
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}
.curr-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 12px;
  border-bottom: 1px solid #f3f4f6;
  flex-shrink: 0;
}
.curr-title { font-weight: 700; font-size: 15px; }

.btn-add-module {
  background: none; border: none; color: #7c3aed;
  cursor: pointer; font-weight: 600; font-size: 13px;
  display: flex; align-items: center; gap: 4px;
}
.btn-add-module:hover { text-decoration: underline; }

.add-module-form {
  display: flex; gap: 6px; padding: 10px 14px;
  border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.module-input {
  flex: 1; border: 1px solid #d1d5db; border-radius: 6px;
  padding: 5px 8px; font-size: 13px; outline: none;
}
.module-input:focus { border-color: #7c3aed; }
.btn-confirm {
  background: #7c3aed; color: #fff; border: none;
  border-radius: 6px; padding: 5px 10px; cursor: pointer; font-size: 12px;
}
.btn-cancel {
  background: none; border: 1px solid #e5e7eb;
  border-radius: 6px; padding: 5px 8px; cursor: pointer; font-size: 12px;
}

.modules-list { overflow-y: auto; flex: 1; padding: 8px 0; }

.module-header {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; cursor: pointer; user-select: none;
}
.module-header:hover { background: #f9fafb; }
.module-title { font-weight: 600; font-size: 13px; color: #374151; }
.chevron { color: #9ca3af; }

.lessons { padding-bottom: 6px; }

.lesson-item {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 14px 7px 32px; cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.1s;
}
.lesson-item:hover { background: #f9fafb; }
.lesson-item.active {
  background: #f5f3ff;
  border-left-color: #7c3aed;
}
.lesson-icon { color: #9ca3af; flex-shrink: 0; }
.lesson-item.active .lesson-icon { color: #7c3aed; }

.lesson-title {
  font-size: 13px; color: #4b5563;
  transition: color 0.1s;
}
.lesson-item.active .lesson-title { color: #7c3aed; font-weight: 600; }

.btn-add-lesson {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px 6px 32px;
  background: none; border: none;
  cursor: pointer; color: #9ca3af; font-size: 12px; width: 100%;
}
.btn-add-lesson:hover { color: #7c3aed; }
</style>