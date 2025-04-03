<!--
 * @Description: 气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 04:18:36
-->
<template>
    <div :class="$style['bubble-editor']">
        <TiptapEditorContent v-if="tiptapEditor" :editor="tiptapEditor" />
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptapBubbleEditorBaseProps } from "./index";

import { Editor } from "@tiptap/vue-3";
import TiptapEditorContent from "./sub-components/TiptapEditorContent.vue";

import { linkRegex } from "./utils/helper";
import { createBubbleEditorExtension } from "../../utils/tiptap-bubble-extension";

import $pageStyle from "../../src/app.module.scss";

defineOptions({ name: "UeTiptapBubbleEditor" });
const props = withDefaults(defineProps<UeTiptapBubbleEditorBaseProps>(), { device: "pc" });
const emit = defineEmits<{
    (e: "ready" | "update" | "create" | "destroy" | "blur" | "focus" | "selectionUpdate", editor: Editor): void;
}>();

const tiptapEditor = ref<Editor>();

watch(
    () => props.device,
    (value: string) => {
        if (tiptapEditor.value?.storage.deviceExtension) {
            tiptapEditor.value.storage.deviceExtension.device = value;
        }
    }
);

onMounted(() => {
    tiptapEditor.value = new Editor({
        injectCSS: false,
        content: props.content.replace(linkRegex, ""),
        extensions: createBubbleEditorExtension(),
        editorProps: {
            attributes: {
                class: $pageStyle["ue-richtext-editor"],
            },
        },
    });

    emit("ready", tiptapEditor.value);

    tiptapEditor.value.on("selectionUpdate", () => {
        emit("selectionUpdate", tiptapEditor.value!);
    });
    tiptapEditor.value.on("blur", () => {
        emit("blur", tiptapEditor.value!);
    });
    tiptapEditor.value.on("focus", () => {
        emit("focus", tiptapEditor.value!);
    });
    tiptapEditor.value.on("update", () => {
        emit("update", tiptapEditor.value!);
    });
    tiptapEditor.value.on("create", () => {
        emit("create", tiptapEditor.value!);
    });
    tiptapEditor.value.on("destroy", () => {
        emit("destroy", tiptapEditor.value!);
    });
});

onBeforeUnmount(() => {
    if (tiptapEditor.value?.isDestroyed) return;
    tiptapEditor.value?.destroy();
});
</script>
<style lang="scss" module>
.bubble-editor {
    //
}
</style>
