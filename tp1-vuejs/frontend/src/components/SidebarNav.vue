<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <span class="logo-text">LearnX</span>
    </div>

    <!-- Nav Sections -->
    <NavSection label="TCH">
      <NavItem icon="edit" label="Course Creation" to="/course-creation" />
    </NavSection>

    <!-- Footer -->
    <div class="nav-footer">
      <NavItem icon="logout" label="Log out" to="/" />
    </div>
  </aside>
</template>

<script setup>
import NavSection from './NavSection.vue'
import NavItem    from './NavItem.vue'
</script>

<style scoped>
.sidebar {
  width: 210px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  flex-shrink: 0;
  height: 100vh;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  padding-left: 6px;
}

.logo-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35);
}

.logo-text {
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.4px;
  color: #111827;
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