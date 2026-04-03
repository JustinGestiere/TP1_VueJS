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
      <span class="logo-text">GavaLab</span>
    </div>

    <!-- Navigation -->
    <nav class="nav-menu">
      <div class="nav-section">
        <h3 class="nav-section-title">Intervenant</h3>
        <router-link to="/course-creation" class="nav-item" :class="{ active: $route.path === '/course-creation' }">
          Création de Cours
        </router-link>
        <!-- <router-link class="nav-item" :class="{ active: $route.path === '/course-list' }">
          Liste des Cours
        </router-link> -->
      </div>
      
      <div class="nav-section">
        <h3 class="nav-section-title">Apprenant</h3>
        <router-link to="/learning-workspace" class="nav-item" :class="{ active: $route.path === '/learning-workspace' }">
          Espace d'Apprentissage
        </router-link>
      </div>
      
      <!-- <div class="nav-section">
        <h3 class="nav-section-title">Admin</h3>
        <router-link to="/user-management" class="nav-item" :class="{ active: $route.path === '/user-management' }">
          Gestion des Utilisateurs
        </router-link>
        <router-link to="/group-management" class="nav-item" :class="{ active: $route.path === '/group-management' }">
          Gestion des Groupes
        </router-link>
      </div> -->
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <router-link to="/" class="nav-item logout">Déconnexion</router-link>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-left: 4px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.logo-text {
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: #1e293b;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-section-title {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 12px;
  margin-bottom: 4px;
}

.nav-item {
  padding: 10px 12px;
  border-radius: 8px;
  color: #475569;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

.nav-item.active {
  background: #ede9fe;
  color: #7c3aed;
  font-weight: 600;
}

.nav-item.logout {
  color: #ef4444;
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
  margin-top: 8px;
}

.nav-item.logout:hover {
  background: #fef2f2;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}
</style>
