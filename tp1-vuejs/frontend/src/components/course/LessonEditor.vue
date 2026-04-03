<template>
  <main class="editor-panel">
    <input
      v-model="lessonTitle"
      class="lesson-title-input"
      placeholder="Titre de la leçon…"
    />

    <RichTextEditor v-model="lessonContent" />
  </main>
</template>

<script setup>
import RichTextEditor from './RichTextEditor.vue'
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
.lesson-title-input::placeholder { color: #d1d5db; }
</style>