<script setup lang="ts">
import { ref, onMounted } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { python, pythonLanguage } from "@codemirror/lang-python";
import { language } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";

const editorContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (editorContainer.value) {
    let x = new EditorView({
      state: EditorState.create({
        doc: "Hello",
        extensions: [basicSetup, pythonLanguage, oneDark],
      }),
      parent: editorContainer.value,
    });
    console.log(x.themeClasses);
  }
});
</script>
<template>
  <p>hi</p>
  <div ref="editorContainer" class="editor"></div>
</template>
<style scoped>
.editor {
  height: 300px;
  width: 300px;
  border: 1px solid #ddd;
}
</style>
