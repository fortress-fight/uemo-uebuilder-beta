<!--
 * @Description: 气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-23 19:42:11
-->
<template>
    <div :class="$style['bubble-editor']">
        <TiptapEditorContent v-if="tiptapEditor" :editor="tiptapEditor" />
    </div>
    <UeTiptapEditorPanel ref="attrEditorPanel" />
</template>

<script lang="ts" setup>
import type { UeTiptapBubbleEditorBaseProps } from "./index";

import { Editor } from "@tiptap/vue-3";

import { linkRegex } from "./utils/helper";
import { useProvideTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { createBubbleEditorExtension } from "../../utils/tiptap-bubble-extension";

import TiptapEditorContent from "./sub-components/TiptapEditorContent.vue";
import $pageStyle from "../../src/app.module.scss";

defineOptions({
    name: "UeTiptapBubbleEditor",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<UeTiptapBubbleEditorBaseProps>(), {
    device: "pc",
});

const emit = defineEmits<{
    (e: "ready" | "update" | "create" | "destroy" | "blur" | "focus" | "selectionUpdate", editor: Editor): void;
}>();

const tiptapEditor = shallowRef<Editor | undefined>();
const attrEditorPanel = useTemplateRef("attrEditorPanel");

useProvideTiptapEditor(tiptapEditor);

/**
 * 初始化编辑器事件监听
 * @param editor - Tiptap 编辑器实例
 */
const initEditorEvents = (editor: Editor) => {
    const events = ["selectionUpdate", "blur", "focus", "update", "create", "destroy"] as const;

    events.forEach((event) => {
        editor.on(event, () => {
            emit(event, editor);
        });
    });
};

/**
 * 创建编辑器实例
 */
const createEditor = () => {
    if (!attrEditorPanel.value) return;

    const editor = new Editor({
        injectCSS: false,
        content: props.content.replace(linkRegex, ""),
        extensions: createBubbleEditorExtension({
            openAttrEditorPanel: attrEditorPanel.value.openAttrEditorPanel,
            closeAttrEditorPanel: attrEditorPanel.value.closeAttrEditorPanel,
        }),
        editorProps: {
            attributes: {
                class: $pageStyle["ue-richtext-editor"],
            },
        },
    });

    initEditorEvents(editor);
    emit("ready", editor);
    return editor;
};

// 监听设备类型变化
watch(
    () => props.device,
    (value) => {
        tiptapEditor.value?.commands.updateDevice(value);
    }
);

onMounted(() => {
    tiptapEditor.value = createEditor();
});

onBeforeUnmount(() => {
    if (tiptapEditor.value?.isDestroyed) return;
    tiptapEditor.value?.destroy();
});
</script>

<style lang="scss" module>
.bubble-editor {
    // 添加必要的样式
}
</style>
