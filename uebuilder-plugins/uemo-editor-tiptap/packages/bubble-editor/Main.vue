<!--
 * @Description: 气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-01 01:34:08
-->
<template>
    <div :class="$style['bubble-editor']">
        <!-- NOTE 内容区 -->
        <EditorContent :editor="tiptapEditor" />
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptapBubbleEditorBaseProps } from "./index";

import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

defineOptions({ name: "UeTiptapBubbleEditor" });
const props = withDefaults(defineProps<UeTiptapBubbleEditorBaseProps>(), {});

const tiptapEditor = ref<Editor>();

onMounted(() => {
    tiptapEditor.value = new Editor({
        content: props.content,
        extensions: [StarterKit],
    });
});

onUnmounted(() => {
    tiptapEditor.value?.destroy();
});
</script>
<style lang="scss" module>
.bubble-editor {
    //
}
</style>
