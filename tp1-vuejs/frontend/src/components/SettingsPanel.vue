<template>
  <aside class="settings">
    <div class="settings-header">Lesson Settings</div>

    <div class="settings-body">

      <!-- Visibility -->
      <section>
        <p class="section-title">Visibility</p>
        <label
          v-for="opt in visibilityOptions"
          :key="opt.val"
          class="vis-option"
          :class="{ selected: visibility === opt.val }"
        >
          <input type="radio" name="vis" :value="opt.val" v-model="visibility" />
          <div>
            <div class="opt-label">{{ opt.label }}</div>
            <div class="opt-sub">{{ opt.sub }}</div>
          </div>
        </label>
      </section>

      <!-- Prerequisites -->
      <section>
        <p class="section-title">Prerequisites</p>
        <select v-model="prerequisites" class="select-input">
          <option value="none">None required</option>
          <option
            v-for="lesson in allLessons"
            :key="lesson.id"
            :value="lesson.id"
          >
            {{ lesson.title }}
          </option>
        </select>
      </section>

      <!-- Tags -->
      <section>
        <p class="section-title">Tags</p>
        <div class="tags-wrap">
          <span v-for="tag in tags" :key="tag" class="tag">
            {{ tag }}
            <button class="tag-remove" @click="removeTag(tag)">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
        <input
          v-model="tagInput"
          class="tag-input"
          placeholder="Add a tag…"
          @keydown.enter.prevent="onAddTag"
          @keydown.exact="checkComma"
        />
      </section>

      <!-- Discussions toggle -->
      <section>
        <div class="toggle-row">
          <p class="section-title" style="margin-bottom: 0">Enable Discussions</p>
          <button
            class="toggle"
            :class="{ on: discussions }"
            @click="discussions = !discussions"
          >
            <div class="toggle-knob" />
          </button>
        </div>
        <p class="toggle-sub">Allow students to comment and ask questions on this lesson.</p>
      </section>

    </div>

    <!-- Footer actions -->
    <div class="settings-footer">
      <button class="btn-draft" @click="saveDraft">Save as Draft</button>
      <button class="btn-update" @click="updateLesson">Update Lesson</button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLessonStore } from '../composables/useLessonStore.js'

const {
  curriculum, visibility, tags, discussions,
  prerequisites, removeTag, addTag, saveDraft, updateLesson,
} = useLessonStore()

const tagInput = ref('')

const visibilityOptions = [
  { val: 'published', label: 'Published',  sub: 'Visible to all enrolled students' },
  { val: 'draft',     label: 'Draft',      sub: 'Only visible to instructors' },
  { val: 'scheduled', label: 'Scheduled',  sub: 'Publish on a specific date' },
]

const allLessons = computed(() =>
  curriculum.value.flatMap(m => m.lessons)
)

function onAddTag() {
  if (tagInput.value.trim()) {
    addTag(tagInput.value.trim())
    tagInput.value = ''
  }
}

function checkComma(e) {
  if (e.key === ',') {
    e.preventDefault()
    onAddTag()
  }
}
</script>

<style scoped>
.settings {
  width: 280px;
  background: #fff;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
}
.settings-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
}
.settings-body {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
}

.section-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }

/* Visibility */
.vis-option {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 12px; border-radius: 10px; cursor: pointer;
  margin-bottom: 6px;
  border: 1.5px solid #f3f4f6; background: #fafafa;
  transition: border-color 0.15s, background 0.15s;
}
.vis-option.selected { border-color: #7c3aed; background: #f5f3ff; }
.vis-option input { accent-color: #7c3aed; margin-top: 2px; }
.opt-label { font-weight: 600; font-size: 13px; }
.vis-option.selected .opt-label { color: #7c3aed; }
.opt-sub { font-size: 11px; color: #9ca3af; margin-top: 2px; }

/* Select */
.select-input {
  width: 100%; border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 8px 10px; font-size: 13px; background: #fff;
  cursor: pointer; outline: none;
}
.select-input:focus { border-color: #7c3aed; }

/* Tags */
.tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.tag {
  display: flex; align-items: center; gap: 4px;
  background: #f3f4f6; border-radius: 20px;
  padding: 3px 10px; font-size: 12px; font-weight: 500;
}
.tag-remove {
  background: none; border: none; cursor: pointer;
  color: #9ca3af; padding: 0; line-height: 1; display: flex;
}
.tag-remove:hover { color: #ef4444; }
.tag-input {
  width: 100%; border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 7px 10px; font-size: 13px; outline: none;
  box-sizing: border-box;
}
.tag-input:focus { border-color: #7c3aed; }

/* Discussions toggle */
.toggle-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.toggle-sub { font-size: 11px; color: #9ca3af; }

.toggle {
  width: 40px; height: 22px; border-radius: 11px;
  border: none; cursor: pointer; background: #d1d5db;
  position: relative; transition: background 0.2s; flex-shrink: 0;
}
.toggle.on { background: #7c3aed; }
.toggle-knob {
  width: 16px; height: 16px; border-radius: 8px; background: #fff;
  position: absolute; top: 3px; left: 3px; transition: left 0.2s;
}
.toggle.on .toggle-knob { left: 21px; }

/* Footer */
.settings-footer {
  padding: 16px 20px;
  border-top: 1px solid #f3f4f6;
  display: flex; flex-direction: column; gap: 8px;
  flex-shrink: 0;
}
.btn-draft {
  width: 100%; border: 1px solid #e5e7eb; background: #fff;
  padding: 9px; border-radius: 10px; cursor: pointer;
  font-weight: 500; font-size: 14px; transition: background 0.1s;
}
.btn-draft:hover { background: #f9fafb; }
.btn-update {
  width: 100%; background: #111827; color: #fff;
  padding: 9px; border-radius: 10px; border: none;
  cursor: pointer; font-weight: 600; font-size: 14px;
  transition: background 0.15s;
}
.btn-update:hover { background: #374151; }
</style>