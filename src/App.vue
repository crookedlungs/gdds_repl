<script setup lang="ts">
import { ref, onMounted } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { Terminal } from "xterm";
import { getGddsLogo } from "./terminal";

const editorContainer = ref<HTMLDivElement | null>(null);
const terminalContainer = ref<HTMLDivElement | null>(null);
const editor = ref<EditorView | null>(null);
let terminal: Terminal;

const pyodide: any = ref();

onMounted(async () => {
  if (editorContainer.value) {
    editor.value = new EditorView({
      state: EditorState.create({
        doc: "Hello",
        extensions: [
          basicSetup,
          python(),
          oneDark,
          keymap.of(defaultKeymap),
          keymap.of([indentWithTab]),
        ],
      }),
      parent: editorContainer.value,
    });
  }

  if (terminalContainer.value) {
    console.warn("No terminal found. Initializing...");
    // Initialize xterm.js terminal
    terminal = new Terminal({
      cursorBlink: true,
      rows: 40,
      cols: 80,
    });
    terminal.open(terminalContainer.value); // Append to parent container.
    getGddsLogo(terminal);
  }

  // @ts-ignore
  pyodide.value = await loadPyodide({
    fullStdLib: true,
    stdout: (msg: any) => n(msg),
  });

  pyodide.value.runPython('x = input("hello")');
});

function n(a: any) {
  console.warn(a);
  terminal.writeln(a);
}

async function runCode() {
  console.warn("Running code...");
  // @ts-ignore
  pyodide.value = await loadPyodide({
    fullStdLib: true,
    stdout: (msg: any) => n(msg),
  });
  const code = "3 + 6";
  pyodide.value.runPython(code);
}
</script>

<template>
  <div class="container">
    <q-card class="card">
      <button @click="runCode()"></button>
      <div ref="editorContainer" class="editor"></div>
    </q-card>
    <q-card class="card">
      <div style="width: 100%; height: 100%">
        <div id="terminal" ref="terminalContainer" class="terminal"></div>
      </div>
    </q-card>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: auto;
}

.editor {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  z-index: 5;
}

.card {
  height: 90vh;
  width: 45vw;
  margin: auto;
}
</style>
