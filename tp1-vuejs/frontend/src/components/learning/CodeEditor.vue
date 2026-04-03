<template>
  <div class="code-editor">
    <div class="file-tabs">
      <div class="tab active">
        <span class="tab-name">main.py</span>
      </div>
    </div>

    <div class="editor-toolbar">
      <button class="run-btn" @click="runCode" :disabled="isRunning">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        {{ isRunning ? 'Exécution...' : 'Run Code' }}
      </button>
    </div>

    <div class="editor-area">
      <MonacoEditor
        v-model:value="code"
        language="python"
        theme="vs-dark"
        :options="editorOptions"
        height="300px"
      />
    </div>

    <div class="terminal">
      <div class="terminal-header">
        <span class="terminal-title">Terminal</span>
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
import { ref, onMounted, onUnmounted } from 'vue'
import MonacoEditor from '@guolao/vue-monaco-editor'

const code = ref(`# Créez deux variables et calculez leur somme

# TODO: Créez la variable a avec la valeur 1
a = 

# TODO: Créez la variable b avec la valeur 2  
b = 

# TODO: Calculez la somme de a et b
c = 

# TODO: Affichez le résultat
`)

const terminalOutput = ref('')
const hasError = ref(false)
const showCursor = ref(false)
const isRunning = ref(false)
const terminalBody = ref(null)

let observer = null

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
}

function runCode() {
  if (isRunning.value) return

  terminalOutput.value = ''
  hasError.value = false
  showCursor.value = true
  isRunning.value = true

  setTimeout(() => {
    try {
      const lines = code.value.split('\n')

      // FIX 1: regex corrigée pour détecter les assignements incomplets (a = \n)
      const incompleteIndex = lines.findIndex(line =>
        line.trim().match(/^[a-zA-Z_]\w*\s*=\s*$/)
      )

      if (incompleteIndex !== -1) {
        const badLine = lines[incompleteIndex].trim()
        terminalOutput.value = `  File "main.py", line ${incompleteIndex + 1}\n    ${badLine}\n    ^\nSyntaxError: invalid syntax`
        hasError.value = true
      } else if (code.value.includes('print(')) {
        const variables = {}

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) continue

          // Assignement simple : varName = expression
          const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/)
          if (assignMatch) {
            const varName = assignMatch[1]
            // Retirer les commentaires inline
            const rawValue = assignMatch[2].replace(/\s*#.*$/, '').trim()
            variables[varName] = evaluateExpression(rawValue, variables)
          }
        }

        // FIX 4: support print multi-arguments print(a, b, c)
        const printRegex = /print\(([^)]*)\)/g
        const outputs = []
        let match

        while ((match = printRegex.exec(code.value)) !== null) {
          const args = splitArgs(match[1])
          const parts = args.map(arg => {
            const val = evaluateExpression(arg.trim(), variables)
            return val !== null && val !== undefined ? String(val) : 'None'
          })
          outputs.push(parts.join(' '))
        }

        terminalOutput.value = outputs.length
          ? outputs.join('\n')
          : 'Code exécuté sans affichage. Ajoutez print() pour voir les résultats.'
      } else {
        terminalOutput.value = 'Code exécuté! Ajoutez print() pour voir les résultats.'
      }
    } catch (error) {
      terminalOutput.value = `RuntimeError: ${error.message}`
      hasError.value = true
    }

    showCursor.value = false
    isRunning.value = false
  }, 1000)
}

// Sépare les arguments d'un appel de fonction en respectant les strings
function splitArgs(argsStr) {
  const args = []
  let current = ''
  let depth = 0
  let inString = false
  let stringChar = ''

  for (const ch of argsStr) {
    if (inString) {
      current += ch
      if (ch === stringChar) inString = false
    } else if (ch === '"' || ch === "'") {
      inString = true
      stringChar = ch
      current += ch
    } else if (ch === '(' || ch === '[') {
      depth++
      current += ch
    } else if (ch === ')' || ch === ']') {
      depth--
      current += ch
    } else if (ch === ',' && depth === 0) {
      args.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  if (current.trim()) args.push(current)
  return args
}

function evaluateExpression(expr, variables) {
  expr = expr.trim()

  // String literals
  if ((expr.startsWith('"') && expr.endsWith('"')) ||
      (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1)
  }

  // FIX 2: retourner un Number et non une string pour les entiers/flottants
  if (/^-?\d+(\.\d+)?$/.test(expr)) {
    return Number(expr)
  }

  // Remplacer les variables par leurs valeurs
  let evaluated = expr
  // FIX 3: éviter les bugs de regex stateful avec .test() + flag g
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`(?<![a-zA-Z_\\d])${key}(?![a-zA-Z\\d_])`, 'g')
    const replacement = typeof value === 'string' ? `"${value}"` : String(value)
    evaluated = evaluated.replace(regex, replacement)
  }

  // Évaluation de l'expression finale
  try {
    // eslint-disable-next-line no-eval
    const result = eval(evaluated)
    return result
  } catch {
    return evaluated
  }
}

onMounted(() => {
  // FIX 5: cleanup de l'observer dans onUnmounted
  observer = new MutationObserver(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })

  if (terminalBody.value) {
    observer.observe(terminalBody.value, { childList: true, subtree: true })
  }
})

onUnmounted(() => {
  observer?.disconnect()
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

.tab:hover { background: #3e3e42; }
.tab.active { background: #1e1e1e; color: #ffffff; }

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

.run-btn:hover:not(:disabled) { background: #2ea043; }
.run-btn:disabled { opacity: 0.6; cursor: not-allowed; }

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

.terminal-prompt { color: #238636; margin-right: 8px; }

.terminal-output {
  margin: 8px 0;
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 12px;
}

.terminal-output.error { color: #ff5f56; }

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