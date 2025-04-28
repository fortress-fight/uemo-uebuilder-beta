<template>
    <UeElPopPanel :class="$style['emoji-panel']" v-model:open="showPopPanel" v-bind="popPanelParams">
        <UeElEmojiLibraryPanel ref="emojiLibraryPanelRef" :query="query" @update:select="handleSelect" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/core";

defineOptions({ inheritAttrs: false });

const emojiLibraryPanelRef = useTemplateRef("emojiLibraryPanelRef");

/**
 * 组件属性定义
 */
const props = defineProps<{
    query: string;
    editor: Editor;
    clientRect: () => DOMRect;
    command: (props: { id: string }) => void;
}>();

/**
 * 弹出面板显示状态
 */
const showPopPanel = ref<boolean>(false);

/**
 * 弹出面板配置参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps>(() => ({
    autoClose: false,
    draggable: false,
    zIndex: 100001,
    panel: {
        position: {
            autoUpdate: true,
            options: {
                strategy: "fixed",
                placement: "bottom-start",
                middleware: [
                    ["flip", { crossAxis: true, padding: 17 }],
                    ["offset", { mainAxis: 10 }],
                ],
            },
            refEl: {
                getBoundingClientRect: props.clientRect,
            },
        },
    },
}));

function handleSelect(select: string | undefined) {
    if (!select) return;
    props.command({ id: select });
}

/**
 * 组件对外暴露的方法
 */
defineExpose({
    openPopPanel: () => {
        showPopPanel.value = true;
    },
    closePopPanel: () => {
        showPopPanel.value = false;
    },
    onKeyDown: (param: { event: KeyboardEvent }) => {
        return emojiLibraryPanelRef.value?.onKeyDown(param.event);
    },
});
</script>
<style lang="scss" module>
.emoji-panel {
    // init
}
</style>
