<template>
  <div class="learning-workspace">
    <!-- Top Bar -->
    <TopBar />
    
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Left Sidebar -->
      <Sidebar />
      
      <!-- Middle Panel - Lesson Content -->
      <LessonContent />
      
      <!-- Right Panel - IDE -->
      <CodeEditor />
    </div>
  </div>
</template>

<script setup>
import TopBar from '../../components/common/TopBar.vue'
import Sidebar from '../../components/common/Sidebar.vue'
import LessonContent from '../../components/learning/LessonContent.vue'
import CodeEditor from '../../components/learning/CodeEditor.vue'
</script>

<style scoped>
.learning-workspace {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
