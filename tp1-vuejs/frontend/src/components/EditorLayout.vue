<template>
  <div class="layout">
    <SidebarNav />

    <div class="main">
      <TopHeader />

      <div class="content-area">
        <CurriculumSidebar />
        <LessonEditor />
        <SettingsPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarNav       from './SidebarNav.vue'
import TopHeader        from './TopHeader.vue'
import CurriculumSidebar from './CurriculumSidebar.vue'
import LessonEditor     from './LessonEditor.vue'
import SettingsPanel    from './SettingsPanel.vue'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #f3f4f6;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #111827;
  overflow: hidden;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>