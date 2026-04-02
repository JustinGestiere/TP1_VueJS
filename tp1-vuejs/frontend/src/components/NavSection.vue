<template>
  <div class="section">
    <div class="section-label">{{ label }}</div>
    <div class="section-items">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ label: String })
</script>

<style scoped>
.section { margin-bottom: 20px; }
.section-label {
  font-size: 10px;
  color: #9ca3af;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0 8px;
  margin-bottom: 6px;
}
.section-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>