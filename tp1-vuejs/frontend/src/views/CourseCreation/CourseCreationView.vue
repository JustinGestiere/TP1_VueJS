<template>
  <div class="app-layout">
    <AppNavbar />
    <TopBar />
    <div class="page-content">
      <EditorLayout />
    </div>
  </div>
</template>

<script setup>
import AppNavbar from '../../components/common/AppNavbar.vue'
import TopBar from '../../components/common/TopBar.vue'
import EditorLayout from '../../components/course/EditorLayout.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f3f4f6;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
