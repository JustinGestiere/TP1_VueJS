<template>
  <main class="editor-panel">
    <input
      v-model="lessonTitle"
      class="lesson-title-input"
      placeholder="Titre de la leçon…"
    />

    <div class="simple-editor">
      <p>Éditeur de contenu simplifié</p>
      <textarea 
        v-model="lessonContent" 
        class="content-textarea"
        placeholder="Contenu de la leçon..."
      ></textarea>
    </div>
  </main>
</template>

<script setup>
import { useLessonStore } from '../../composables/useLessonStore.js'

const { lessonTitle, lessonContent } = useLessonStore()
</script>

<style scoped>
.editor-panel {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
}

.lesson-title-input {
  width: 100%;
  margin-bottom: 18px;
  font-size: 26px;
  font-weight: 700;
  border: none;
  outline: none;
  background: transparent;
  color: #111827;
  font-family: 'Georgia', serif;
  line-height: 1.3;
  padding: 0;
}

.lesson-title-input::placeholder { 
  color: #d1d5db; 
}

.simple-editor {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;
}

.simple-editor p {
  margin: 0 0 12px 0;
  font-weight: 600;
  color: #374151;
}

.content-textarea {
  width: 100%;
  min-height: 300px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 12px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}
</style>