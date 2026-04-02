<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-icon">G</div>
      <span class="logo-text">Gavalab</span>
    </div>

    <!-- Nav sections -->

    <NavSection label="TEACHER">
      <NavItem icon="courses" label="Course Creation" :active="true" />
      <NavItem icon="courses" label="Course List" />  
    </NavSection>

    <NavSection label="ADMIN">
      <NavItem icon="users" label="User Management" />
      <NavItem icon="group" label="Group Management" />
    </NavSection>

    <div class="nav-footer">
      <NavItem icon="help"   label="Help" />
      <NavItem icon="logout" label="Log Out" />
    </div>
  </aside>
</template>

<script setup>
import NavSection from './NavSection.vue'
import NavItem    from './NavItem.vue'
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  flex-shrink: 0;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  padding-left: 6px;
}
.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ec4899, #f97316);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
.logo-text {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.3px;
}
.nav-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>