<template>
  <div class="code-editor">
    <!-- File Tabs -->
    <div class="file-tabs">
      <div class="tab active">
        <span class="tab-name">main.py</span>
      </div>
      <div class="tab">
        <span class="tab-name">data.csv</span>
      </div>
    </div>

    <!-- Editor Toolbar -->
    <div class="editor-toolbar">
      <button class="run-btn" @click="runCode">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Run Code
      </button>
    </div>

    <!-- Code Editor Area -->
    <div class="editor-area">
      <MonacoEditor
        v-model:value="code"
        language="python"
        theme="vs-dark"
        :options="editorOptions"
        height="300px"
      />
    </div>

    <!-- Terminal -->
    <div class="terminal">
      <div class="terminal-header">
        <span class="terminal-title">Terminal</span>
        <div class="terminal-buttons">
          <div class="terminal-btn close"></div>
          <div class="terminal-btn minimize"></div>
          <div class="terminal-btn maximize"></div>
        </div>
      </div>
      <div class="terminal-body" ref="terminalBody">
        <div class="terminal-line">
          <span class="terminal-prompt">$</span>
          <span class="terminal-command">python main.py</span>
        </div>
        <div v-if="terminalOutput" class="terminal-output" :class="{ 'error': hasError }">
          {{ terminalOutput }}
        </div>
        <div v-if="showCursor" class="terminal-cursor"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MonacoEditor from '@guolao/vue-monaco-editor'

const code = ref(`import pandas as pd

# Create a dictionary of programming languages and their creation years
data = {
    'language': ['Python', 'JavaScript', 'Java', 'C++', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust', 'TypeScript'],
    'year': [1991, 1995, 1995, 1985, 1995, 2009, 2014, 2011, 2010, 2012],
    'type': ['interpreted', 'interpreted', 'compiled', 'compiled', 'interpreted', 'compiled', 'compiled', 'compiled', 'compiled', 'interpreted']
}

# Create a DataFrame from the dictionary
df = pd.DataFrame(data)

# TODO: Create modern_languages DataFrame (year > 2000)
modern_languages = 

# TODO: Print the result
`)

const terminalOutput = ref('')
const hasError = ref(false)
const showCursor = ref(false)
const terminalBody = ref(null)

const editorOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  automaticLayout: true,
  tabSize: 4,
  insertSpaces: true,
  wordWrap: 'on',
  theme: 'vs-dark'
}

function runCode() {
  // Clear previous output
  terminalOutput.value = ''
  hasError.value = false
  showCursor.value = true
  
  // Simulate running Python code
  setTimeout(() => {
    try {
      // Check if the code has the syntax error (incomplete assignment)
      if (code.value.includes('modern_languages = ')) {
        // Check if there's content after the assignment
        const lines = code.value.split('\n')
        const assignmentLine = lines.find(line => line.includes('modern_languages = '))
        
        if (assignmentLine && assignmentLine.trim().endsWith('modern_languages =')) {
          terminalOutput.value = `  File "main.py", line 12
    modern_languages = 
                   ^
SyntaxError: invalid syntax`
          hasError.value = true
        } else {
          // Show successful output
          terminalOutput.value = `   language  year       type
3      Swift  2014   compiled
4         Go  2009   compiled
5       Rust  2010   compiled`
        }
      } else {
        terminalOutput.value = 'Error: modern_languages assignment not found'
        hasError.value = true
      }
    } catch (error) {
      terminalOutput.value = error.message
      hasError.value = true
    }
    
    showCursor.value = false
  }, 1000)
}

onMounted(() => {
  // Auto-scroll terminal to bottom
  const observer = new MutationObserver(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
  
  if (terminalBody.value) {
    observer.observe(terminalBody.value, { childList: true, subtree: true })
  }
})
</script>

<style scoped>
.code-editor {
  flex: 1;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.file-tabs {
  display: flex;
  background: #252526;
  border-bottom: 1px solid #3e3e42;
}

.tab {
  padding: 8px 16px;
  background: #2d2d30;
  border-right: 1px solid #3e3e42;
  color: #cccccc;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease;
}

.tab:hover {
  background: #3e3e42;
}

.tab.active {
  background: #1e1e1e;
  color: #ffffff;
}

.tab-name {
  font-family: 'Monaco', 'Menlo', monospace;
}

.editor-toolbar {
  background: #252526;
  border-bottom: 1px solid #3e3e42;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.run-btn {
  background: #238636;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease;
}

.run-btn:hover {
  background: #2ea043;
}

.editor-area {
  flex: 1;
  min-height: 300px;
}

.terminal {
  height: 200px;
  background: #1e1e1e;
  border-top: 1px solid #3e3e42;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  background: #2d2d30;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3e3e42;
}

.terminal-title {
  color: #cccccc;
  font-size: 12px;
  font-weight: 500;
}

.terminal-buttons {
  display: flex;
  gap: 6px;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-btn.close { background: #ff5f56; }
.terminal-btn.minimize { background: #ffbd2e; }
.terminal-btn.maximize { background: #27c93f; }

.terminal-body {
  flex: 1;
  padding: 12px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  color: #cccccc;
  overflow-y: auto;
  background: #0c0c0c;
}

.terminal-line {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.terminal-prompt {
  color: #238636;
  margin-right: 8px;
}

.terminal-command {
  color: #cccccc;
}

.terminal-output {
  margin: 8px 0;
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 12px;
}

.terminal-output.error {
  color: #ff5f56;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #cccccc;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
