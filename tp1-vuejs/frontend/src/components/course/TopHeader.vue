<template>
  <header class="header">
    <div class="left">
      <button class="icon-btn" title="Back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="course-title">Advanced Mathematics</span>
      <span class="status-badge" :class="courseStatus">
        {{ courseStatus === 'published' ? 'Publié' : 'Brouillon' }}
      </span>
    </div>

    <div class="right">
      <transition name="fade">
        <span v-if="saveMessage" class="save-msg">{{ saveMessage }}</span>
      </transition>

      <button class="btn-preview">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
        Aperçu
      </button>

      <button class="btn-draft" @click="saveDraft">
        Enregistrer comme Brouillon
      </button>

      <button class="btn-publish" @click="publishCourse">
        Publier le Cours
      </button>
    </div>
  </header>
</template>

<script setup>
import { useLessonStore } from '../../composables/useLessonStore.js'
const { courseStatus, saveMessage, publishCourse } = useLessonStore()
</script>

<style scoped>
.header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}
.left { display: flex; align-items: center; gap: 10px; }
.right { display: flex; align-items: center; gap: 10px; }

.icon-btn {
  background: none; border: none; cursor: pointer;
  color: #6b7280; padding: 4px; border-radius: 6px;
  display: flex; align-items: center;
}
.icon-btn:hover { background: #f3f4f6; }

.course-title { font-weight: 600; font-size: 15px; }

.status-badge {
  font-size: 11px; padding: 2px 10px; border-radius: 20px;
  font-weight: 600; letter-spacing: 0.3px;
}
.status-badge.draft       { background: #f3f4f6; color: #6b7280; }
.status-badge.published   { background: #dcfce7; color: #16a34a; }

.save-msg {
  font-size: 13px; color: #16a34a; font-weight: 500;
  padding: 4px 10px; background: #dcfce7; border-radius: 8px;
}

.btn-preview {
  display: flex; align-items: center; gap: 6px;
  border: 1px solid #e5e7eb; background: #fff;
  padding: 6px 16px; border-radius: 8px;
  cursor: pointer; font-weight: 500; font-size: 14px;
}
.btn-preview:hover { background: #f9fafb; }

.btn-publish {
  background: #7c3aed; color: #fff;
  padding: 6px 18px; border-radius: 8px;
  border: none; cursor: pointer;
  font-weight: 600; font-size: 14px;
  transition: background 0.15s;
}
.btn-publish:hover { background: #6d28d9; }

/* Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>