<template>
  <div class="course-creation">
    <SidebarLayout>
      <EditorLayout />
    </SidebarLayout>
  </div>
</template>

<script setup>
import SidebarLayout from '../../components/course/SidebarLayout.vue'
import EditorLayout from '../../components/course/EditorLayout.vue'
</script>

<style scoped>
.course-creation {
  height: 100vh;
  overflow: hidden;
}
</style>
