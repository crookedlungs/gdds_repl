<script setup lang="ts">
import { ref, onMounted } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { Terminal } from "xterm";

const editorContainer = ref<HTMLDivElement | null>(null);
const terminalContainer = ref<HTMLDivElement | null>(null);
const editor = ref<EditorView | null>(null);
let terminal: Terminal;

const pyodide: any = ref();

const clearTerminal = () => {
  if (terminal) {
    terminal.clear();
  }
};

onMounted(async () => {
  // @ts-ignore
  pyodide.value = await loadPyodide(); // Load Pyodide

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
      rows: 20,
      cols: 80,
    });
    terminal.open(terminalContainer.value); // Append to parent container.

    /* // Override input function to use xterm.js
    pyodide.value.globals.set("input", async (prompt: string) => {
      terminal.write(`\r\n${prompt}`);
      const input = await new Promise<string>((resolve) => {
        let userInput = "";
        const handleInput = (data: string) => {
          if (data.charCodeAt(0) === 13) {
            // Enter key
            terminal.write("\r\n");
            // terminal.offData(handleInput);
            resolve(userInput);
          } else {
            userInput += data;
            terminal.write(data);
          }
        };
        terminal.onData(handleInput);
      });
      return input;
    }); */

    /* // Redirect stdout to the terminal
    pyodide.value.runPython(`
      import sys
      sys.stdout.write = lambda x: print(x, end='')
      sys.stderr.write = lambda x: print(x, end='')
    `); */
  }
});

const runCode = async () => {
  console.warn("Running code...");
  try {
    const code = `print('Hello, Pyodide!')\nname = input('What is your name? ')\nprint('Hello, ' + name)`;
    let result = await pyodide.value.runPythonAsync(code);

    terminal.write(result, () => console.log("we wrote seomthing to term"));
  } catch (error) {
    // @ts-ignore
    terminal.write(`\r\nError: ${error.toString()}\r\n`);
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <q-card class="card">
      <button @click="runCode"></button>
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
