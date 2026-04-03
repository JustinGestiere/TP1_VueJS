<template>
  <div class="editor-wrap">
    <!-- Toolbar -->
    <div class="toolbar">
      <ToolBtn cmd="bold"          icon="bold"      title="Gras"          @action="exec" />
      <ToolBtn cmd="italic"        icon="italic"    title="Italique"      @action="exec" />
      <ToolBtn cmd="underline"     icon="underline" title="Souligné"      @action="exec" />
      <ToolBtn cmd="strikeThrough" icon="strike"    title="Barré"         @action="exec" />

      <div class="sep" />

      <select class="style-select" @change="execBlock($event.target.value); $event.target.value = 'p'">
        <option value="p">Normal Text</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      <div class="sep" />

      <ToolBtn cmd="justifyLeft"   icon="alignL" title="Gauche"  @action="exec" />
      <ToolBtn cmd="justifyCenter" icon="alignC" title="Centre"  @action="exec" />
      <ToolBtn cmd="justifyRight"  icon="alignR" title="Droite"  @action="exec" />

      <div class="sep" />

      <ToolBtn cmd="insertUnorderedList" icon="list"  title="Liste à puces"  @action="exec" />
      <ToolBtn cmd="insertOrderedList"   icon="olist" title="Liste numérotée" @action="exec" />

      <div class="sep" />

      <button class="tool-btn" title="Lien" @mousedown.prevent="insertLink">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71
                   M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>

      <button class="tool-btn" title="Bloc de code" @mousedown.prevent="execBlock('pre')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      </button>

      <!-- AI Assist -->
      <button class="btn-ai">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        </svg>
        AI Assist
      </button>
    </div>

    <!-- Editable content area -->
    <div
      ref="editorEl"
      class="editor-body"
      contenteditable="true"
      @input="onInput"
      @keyup="onInput"
      @mouseup="onInput"
      v-html="initialContent"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ToolBtn from './ToolBtn.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const editorEl      = ref(null)
const initialContent = ref(props.modelValue)

// Sync external content changes (switching lessons)
watch(() => props.modelValue, (val) => {
  if (editorEl.value && editorEl.value.innerHTML !== val) {
    editorEl.value.innerHTML = val
  }
})

function onInput() {
  emit('update:modelValue', editorEl.value?.innerHTML || '')
}

function exec(cmd) {
  editorEl.value?.focus()
  document.execCommand(cmd, false, null)
  onInput()
}

function execBlock(tag) {
  editorEl.value?.focus()
  document.execCommand('formatBlock', false, tag)
  onInput()
}

function insertLink() {
  editorEl.value?.focus()
  const url = window.prompt('URL :')
  if (url) document.execCommand('createLink', false, url)
  onInput()
}
</script>

<style scoped>
.editor-wrap {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

/* ── Toolbar ── */
.toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
  flex-wrap: wrap;
}
.sep {
  width: 1px; height: 20px;
  background: #e5e7eb;
  margin: 0 4px;
}
.style-select {
  border: 1px solid #e5e7eb; border-radius: 6px;
  padding: 3px 6px; font-size: 13px; background: #fff;
  cursor: pointer; outline: none;
}
.tool-btn {
  padding: 5px 7px; border: none; border-radius: 6px;
  cursor: pointer; background: transparent; color: #374151;
  display: flex; align-items: center;
  transition: background 0.1s;
}
.tool-btn:hover { background: #f3f4f6; }

.btn-ai {
  margin-left: auto;
  display: flex; align-items: center; gap: 6px;
  padding: 5px 12px;
  background: #f3f4f6; border: 1px solid #e5e7eb;
  border-radius: 8px; font-size: 13px; cursor: pointer;
  color: #374151; font-weight: 500;
  transition: background 0.1s;
}
.btn-ai:hover { background: #ede9fe; color: #7c3aed; border-color: #c4b5fd; }

/* ── Editor body ── */
.editor-body {
  min-height: 420px;
  padding: 24px 28px;
  outline: none;
  font-size: 15px;
  line-height: 1.7;
  color: #1f2937;
  font-family: 'Georgia', serif;
}
.editor-body:empty::before {
  content: 'Commencez à rédiger votre leçon…';
  color: #9ca3af;
}
</style>

<!-- Global styles for contenteditable content (cannot be scoped) -->
<style>
.editor-body h1 { font-size: 1.8rem; font-weight: 700; margin: 1rem 0 0.5rem; }
.editor-body h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; }
.editor-body h3 { font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.5rem; }
.editor-body pre {
  background: #f3f4f6; border: 1px solid #e5e7eb;
  border-radius: 8px; padding: 14px 18px;
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 13px; margin: 1rem 0; overflow-x: auto;
}
.editor-body code {
  background: #f3f4f6; padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Menlo', 'Consolas', monospace; font-size: 13px;
}
.editor-body ul, .editor-body ol { padding-left: 1.5rem; margin: 0.5rem 0; }
.editor-body li { margin: 0.25rem 0; }
.editor-body a  { color: #7c3aed; text-decoration: underline; }
.editor-body em { color: #9ca3af; }
</style>