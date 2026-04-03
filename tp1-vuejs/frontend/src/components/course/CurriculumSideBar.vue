<template>
  <aside class="curriculum">
    <!-- Header -->
    <div class="curr-header">
      <span class="curr-title">Déroulé du cours</span>
      <Button variant="ghost" size="sm" @click="showAddModule = true" class="text-primary">
        <Plus class="w-3 h-3" />
        Module
      </Button>
    </div>

    <!-- Add module inline form -->
    <div v-if="showAddModule" class="add-module-form">
      <Input
        ref="moduleInput"
        v-model="newModuleTitle"
        placeholder="Nom du module…"
        @keydown.enter="confirmAddModule"
        @keydown.escape="showAddModule = false"
      />
      <Button size="sm" @click="confirmAddModule">Ajouter</Button>
      <Button variant="outline" size="sm" @click="showAddModule = false">✕</Button>
    </div>

    <!-- Modules list -->
    <div class="modules-list">
      <div v-for="module in curriculum" :key="module.id" class="module">
        <!-- Module header -->
        <div class="module-header" @click="toggleModule(module.id)">
          <ChevronDown 
            v-if="module.expanded" 
            class="w-4 h-4 text-muted-foreground transition-transform" 
          />
          <ChevronRight 
            v-else 
            class="w-4 h-4 text-muted-foreground transition-transform" 
          />
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
            <component 
              :is="getLessonIcon(lesson.type)" 
              class="w-4 h-4 text-muted-foreground flex-shrink-0" 
            />
            <span class="lesson-title">{{ lesson.title }}</span>
          </div>

          <!-- Add lesson button -->
          <Button 
            variant="ghost" 
            size="sm" 
            @click="promptAddLesson(module.id)"
            class="w-full justify-start text-muted-foreground hover:text-primary"
          >
            <Plus class="w-3 h-3" />
            Ajouter une leçon
          </Button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useLessonStore } from '../../composables/useLessonStore.js'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'
import { Plus, ChevronRight, ChevronDown, FileText, Video, HelpCircle } from 'lucide-vue-next'

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

watch(showAddModule, async (val) => {
  if (val) {
    await nextTick()
    moduleInput.value?.focus()
  }
})

function promptAddLesson(moduleId) {
  const title = window.prompt('Titre de la leçon:')
  if (title?.trim()) addLesson(moduleId, title.trim())
}

function getLessonIcon(type) {
  const icons = {
    doc: FileText,
    video: Video,
    quiz: HelpCircle,
  }
  return icons[type] || FileText
}
</script>

<style scoped>
.curriculum {
  width: 260px;
  background: white;
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
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.curr-title { 
  font-weight: 700; 
  font-size: 15px;
  color: #111827;
}

.add-module-form {
  display: flex; 
  gap: 6px; 
  padding: 10px 14px;
  border-bottom: 1px solid #e5e7eb; 
  flex-shrink: 0;
}

.modules-list { 
  overflow-y: auto; 
  flex: 1; 
  padding: 8px 0; 
}

.module-header {
  display: flex; 
  align-items: center; 
  gap: 6px;
  padding: 8px 16px; 
  cursor: pointer; 
  user-select: none;
  border-radius: 6px;
  margin: 0 8px;
}

.module-header:hover { 
  background: #f9fafb; 
}

.module-title { 
  font-weight: 600; 
  font-size: 13px; 
  color: #374151; 
}

.lessons { 
  padding-bottom: 6px; 
}

.lesson-item {
  display: flex; 
  align-items: center; 
  gap: 8px;
  padding: 7px 14px 7px 32px; 
  cursor: pointer;
  border-radius: 6px;
  margin: 0 8px;
  transition: all 0.1s;
}

.lesson-item:hover { 
  background: #f9fafb; 
}

.lesson-item.active {
  background: #f5f3ff;
  border-left: 3px solid #7c3aed;
}

.lesson-title {
  font-size: 13px; 
  color: #6b7280;
  transition: color 0.1s;
}

.lesson-item.active .lesson-title { 
  color: #7c3aed; 
  font-weight: 600; 
}

.lesson-item.active .lucide {
  color: #7c3aed;
}
</style>