<template>
  <header class="header">
    <div class="left">
      <Button variant="ghost" size="icon" title="Retour">
        <ArrowLeft class="w-4 h-4" />
      </Button>
      <span class="course-title">Base Python</span>
      <Badge :variant="courseStatus === 'published' ? 'default' : 'secondary'">
        {{ courseStatus === 'published' ? 'Publié' : 'Brouillon' }}
      </Badge>
    </div>

    <div class="right">
      <Transition name="fade">
        <span v-if="saveMessage" class="save-msg">{{ saveMessage }}</span>
      </Transition>

      <Button variant="outline" size="sm">
        <Eye class="w-4 h-4" />
        Aperçu
      </Button>

      <Button variant="secondary" size="sm" @click="saveDraft">
        Enregistrer comme Brouillon
      </Button>

      <Button @click="publishCourse">
        Publier le Cours
      </Button>
    </div>
  </header>
</template>

<script setup>
import { useLessonStore } from '../../composables/useLessonStore.js'
import Button from '../ui/Button.vue'
import Badge from '../ui/Badge.vue'
import { ArrowLeft, Eye } from 'lucide-vue-next'

const { courseStatus, saveMessage, saveDraft, publishCourse } = useLessonStore()
</script>

<style scoped>
.header {
  height: 60px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.left { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.right { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.course-title { 
  font-weight: 600; 
  font-size: 15px;
  color: #111827;
}

.save-msg {
  font-size: 13px; 
  color: #7c3aed; 
  font-weight: 500;
  padding: 4px 10px; 
  background: #f5f3ff; 
  border-radius: 8px;
  border: 1px solid #e9d5ff;
}

/* Transition */
.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.3s; 
}

.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}
</style>