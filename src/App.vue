<script setup lang="ts">
import { ref, onMounted } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

const editorContainer = ref<HTMLDivElement | null>(null);
const editor = ref<EditorView | null>(null);
const output = ref<string>("");

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

  // Load Pyodide
  // @ts-ignore
  pyodide.value = await loadPyodide();
});

const runCode = async () => {
  try {
    if (editor.value) {
      // Get the code from the editor
      const code = editor.value.state.doc.toString(); // Run the code using Pyodide

      const result = await pyodide.value.runPythonAsync(code);
      console.log(result.toString);
      // Set the output
      output.value = result.toString();
    }
  } catch (error) {
    // @ts-ignore
    output.value = error.toString();
  }
};
</script>

<template>
  <div style="height: 100%; width: 100%">
    <div ref="editorContainer" class="editor"></div>
    <button @click="runCode"></button>
  </div>
</template>

<style scoped>
.editor {
  height: 90%;
  width: 45%;
  border: 1px solid #ddd;
}
</style>
