<script setup lang="ts">
import { ref, onMounted } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { language } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";

const editorContainer = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  if (editorContainer.value) {
    let x = new EditorView({
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
  await loadPyodide();
});
</script>
<template>
  <div style="height: 100%; width: 100%">
    <div ref="editorContainer" class="editor"></div>
  </div>
</template>

<style scoped>
.editor {
  height: 90%;
  width: 45%;
  border: 1px solid #ddd;
}
</style>
