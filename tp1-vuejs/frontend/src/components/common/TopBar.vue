<template>
  <header class="top-bar">
    <div class="progress-section">
      <span class="progress-label">Course Progress</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 45%"></div>
      </div>
      <span class="progress-percentage">45%</span>
    </div>
    
    <div class="user-section">
      <div class="user-info">
        <span class="user-name">Student</span>
      </div>
      <div class="user-avatar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.top-bar {
  height: 60px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-label {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
}

.progress-bar {
  width: 120px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-percentage {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}
</style>
