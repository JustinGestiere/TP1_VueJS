<template>
  <main class="lesson-content">
    <!-- Course Header -->
    <div class="course-header">
      <h1 class="course-title">Introduction à Python</h1>
      <div class="module-info">Module 1: Bases de la Programmation</div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active">Instructions</button>
    </div>

    <!-- Lesson Content -->
    <div class="lesson-body">
      <div class="lesson-header">
        <h2 class="lesson-title">LEÇON 1.1 Variables et Calculs Simples</h2>
        <div class="lesson-description">
          <p>Apprenez à créer des variables et effectuer des calculs mathématiques de base en Python.</p>
        </div>
      </div>

      <!-- Task Section -->
      <div class="task-section">
        <h3 class="task-title">🎯 Votre Tâche</h3>
        <div class="task-content">
          <p>Créez deux variables a et b, puis calculez leur somme et affichez le résultat.</p>
          
          <div class="task-steps">
            <h4>Étapes:</h4>
            <ol>
              <li>Créez une variable a avec la valeur 1</li>
              <li>Créez une variable b avec la valeur 2</li>
              <li>Créez une variable c qui contient la somme de a et b</li>
              <li>Affichez la valeur de c avec print()</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Hint Section -->
      <div class="hint-section">
        <h3 class="hint-title">💡 Indice</h3>
        <div class="hint-content">
          <p>Utilisez l'opérateur + pour additionner les variables:</p>
          <pre class="code-hint">a = 1
b = 2
c = a + b
print(c)</pre>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
.lesson-content {
  flex: 1;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.course-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.course-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.module-info {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.tabs {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.tab {
  padding: 12px 20px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab:hover {
  color: #374151;
}

.tab.active {
  color: #7c3aed;
  border-bottom-color: #7c3aed;
  background: white;
}

.lesson-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.lesson-header {
  margin-bottom: 32px;
}

.lesson-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.lesson-description p {
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.task-section, .hint-section {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.task-section {
  background: #fefefe;
}

.hint-section {
  background: #fefce8;
  border-color: #fbbf24;
}

.task-title, .hint-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.task-title { color: #1e293b; }
.hint-title { color: #a16207; }

.task-steps h4 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 12px 0 8px 0;
}

.task-steps ol {
  margin: 0;
  padding-left: 20px;
}

.task-steps li {
  margin-bottom: 6px;
  color: #475569;
  line-height: 1.5;
}

.code-hint {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  margin: 8px 0;
  overflow-x: auto;
}
</style>
