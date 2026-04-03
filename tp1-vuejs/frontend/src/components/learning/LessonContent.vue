<template>
  <main class="lesson-content">
    <!-- Course Header -->
    <div class="course-header">
      <h1 class="course-title">Python for Data Science</h1>
      <div class="module-info">Module 3: Data Manipulation with Pandas</div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active">Instructions</button>
      <button class="tab">Module List</button>
      <button class="tab">Resources</button>
    </div>

    <!-- Lesson Content -->
    <div class="lesson-body">
      <div class="lesson-header">
        <h2 class="lesson-title">LESSON 4.2 Filtering DataFrames</h2>
        <div class="lesson-description">
          <p>Learn how to filter DataFrames in Pandas using boolean indexing to select specific rows based on conditions.</p>
        </div>
      </div>

      <!-- Task Section -->
      <div class="task-section">
        <h3 class="task-title">🎯 Your Task</h3>
        <div class="task-content">
          <p>Create a new DataFrame that contains only programming languages created after the year 2000.</p>
          
          <div class="task-steps">
            <h4>Steps:</h4>
            <ol>
              <li>Import pandas (already done)</li>
              <li>The DataFrame <code>df</code> is pre-created with language data</li>
              <li>Create <code>modern_languages</code> DataFrame filtering for year > 2000</li>
              <li>Print the <code>modern_languages</code> DataFrame</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Hint Section -->
      <div class="hint-section">
        <h3 class="hint-title">💡 Hint</h3>
        <div class="hint-content">
          <p>Use boolean indexing with Pandas:</p>
          <pre class="code-hint">modern_languages = df[df['year'] > 2000]</pre>
        </div>
      </div>

      <!-- Expected Output -->
      <div class="output-section">
        <h3 class="output-title">📊 Expected Output</h3>
        <div class="expected-output">
          <table class="output-table">
            <thead>
              <tr>
                <th>Language</th>
                <th>Year</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Swift</td>
                <td>2014</td>
                <td>compiled</td>
              </tr>
              <tr>
                <td>Go</td>
                <td>2009</td>
                <td>compiled</td>
              </tr>
              <tr>
                <td>Rust</td>
                <td>2010</td>
                <td>compiled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Navigation -->
      <div class="lesson-navigation">
        <button class="nav-btn prev">← Previous</button>
        <button class="nav-btn next">Next Lesson →</button>
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

.task-section, .hint-section, .output-section {
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

.output-section {
  background: #f0f9ff;
  border-color: #3b82f6;
}

.task-title, .hint-title, .output-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.task-title { color: #1e293b; }
.hint-title { color: #a16207; }
.output-title { color: #1e40af; }

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

.output-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.output-table th {
  background: #f1f5f9;
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e2e8f0;
}

.output-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.nav-btn {
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: #f8fafc;
  border-color: #9ca3af;
}

.nav-btn.next {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
}

.nav-btn.next:hover {
  background: #6d28d9;
  border-color: #6d28d9;
}
</style>
