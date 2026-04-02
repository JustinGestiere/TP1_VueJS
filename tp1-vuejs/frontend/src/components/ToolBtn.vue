<template>
  <button
    class="tool-btn"
    :title="title"
    @mousedown.prevent="$emit('action', cmd)"
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path :d="iconPath" />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cmd:   { type: String, required: true },
  icon:  { type: String, required: true },
  title: { type: String, default: '' },
})
defineEmits(['action'])

const ICONS = {
  bold:      'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z',
  italic:    'M19 4h-9M14 20H5M15 4L9 20',
  underline: 'M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16',
  strike:    'M17.3 12H6.7M10 8.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2M12 14.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2',
  alignL:    'M3 6h18M3 12h12M3 18h15',
  alignC:    'M3 6h18M6 12h12M4 18h16',
  alignR:    'M3 6h18M9 12h12M6 18h12',
  list:      'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  olist:     'M10 6h11M10 12h11M10 18h11M4 6h1v4M3 12h2v-.5a1 1 0 1 0-2 0v.5M3 18h2M5 18H3v1h2',
}

const iconPath = computed(() => ICONS[props.icon] || '')
</script>

<style scoped>
.tool-btn {
  padding: 5px 7px; border: none; border-radius: 6px;
  cursor: pointer; background: transparent; color: #374151;
  display: flex; align-items: center;
  transition: background 0.1s;
}
.tool-btn:hover { background: #f3f4f6; }
</style>