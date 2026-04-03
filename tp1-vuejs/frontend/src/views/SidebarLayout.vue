<template>
  <div class="app-layout">
    <SidebarNav />
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SidebarNav from '../components/SidebarNav.vue'
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
