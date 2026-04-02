<template>
  <div>
    <h1>Page Test</h1>
    <p>Si tu vois ça, le routing fonctionne.</p>
    <div style="height: 400px; border: 1px solid #ccc;">
      <MonacoEditor
        v-model:value="code"
        language="javascript"
        theme="vs-dark"
        :options="{ minimap: { enabled: false } }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MonacoEditor from '@guolao/vue-monaco-editor'

const code = ref(`console.log("Hello world")`)
</script>