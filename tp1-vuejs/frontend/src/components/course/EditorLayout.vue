<template>
  <div class="main">
    <TopHeader />
    <div class="content-area">
      <CurriculumSidebar />
      <LessonEditor />
      <SettingsPanel />
    </div>
  </div>
</template>

<script setup>
import TopHeader         from './TopHeader.vue'
import CurriculumSidebar from './CurriculumSideBar.vue'
import LessonEditor      from './LessonEditor.vue'
import SettingsPanel     from './SettingsPanel.vue'
</script>

<style scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f3f4f6;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #111827;
}
.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
