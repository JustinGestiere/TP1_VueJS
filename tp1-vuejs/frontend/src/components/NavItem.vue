<template>
  <div class="nav-item" :class="{ active }">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path :d="iconPath" />
    </svg>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon:   { type: String, required: true },
  label:  { type: String, required: true },
  active: { type: Boolean, default: false },
})

const ICONS = {
  book:      'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
  workspace: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
  courses:   'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  users:     'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  group:     'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  help:      'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',
  logout:    'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
}

const iconPath = computed(() => ICONS[props.icon] || '')
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  font-size: 13px;
  font-weight: 400;
  transition: background 0.15s;
}
.nav-item:hover { background: #f9fafb; }
.nav-item.active {
  background: #f5f3ff;
  color: #7c3aed;
  font-weight: 600;
}
</style>