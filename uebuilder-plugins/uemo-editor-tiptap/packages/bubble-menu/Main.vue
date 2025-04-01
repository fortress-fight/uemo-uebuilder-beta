<!--
 * @Description: 气泡工具栏控件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 03:44:59
-->
<template>
    <div ref="rootDom" :class="$style['bubble-menu']">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptapBubbleMenuBaseProps } from "./index";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { BubbleMenuPlugin } from "../extension-bubble-menu/src/bubble-menu-plugin";
import { getDeviceExtensionStorage } from "../../utils/tiptap-helper";

defineOptions({ name: "UeTiptapBubbleMenu" });
const prop = withDefaults(defineProps<UeTiptapBubbleMenuBaseProps>(), {
    shouldShow: null,
    pluginKey: "bubbleMenu",
    tippyOptions: () => ({
        zIndex: 99999,
        theme: "ue-tiptap",
        duration: 100,
        maxWidth: "none",
        offset: [-37, 10],
        placement: "top-start",
        arrow: false,
    }),
});

const rootDom = useTemplateRef("rootDom");

const { editor } = useInjectTiptapEditor();
const eventBus = mitt<{ updateBubbleMenu: undefined }>();

watch(
    () => prop.tippyOptions,
    () => {
        requestAnimationFrame(() => {
            eventBus.emit("updateBubbleMenu");
        });
    }
);

function getBubbleMenuPlugin() {
    if (!editor || !rootDom.value) return;
    return BubbleMenuPlugin({
        editor: editor,
        element: rootDom.value,
        pluginKey: prop.pluginKey,
        shouldShow: prop.shouldShow,
        tippyOptions: prop.tippyOptions,
        onInit(bubbleMenu) {
            eventBus.on("updateBubbleMenu", () => {
                if (!bubbleMenu.tippy?.state.isVisible) return;
                bubbleMenu.tippy.setProps(prop.tippyOptions);
            });
        },
        onDestroy() {
            eventBus.off("updateBubbleMenu");
        },
        updateTippyOptions: (_tippy, options) => {
            const resultOptions = Object.assign(options, prop.tippyOptions);

            if (getDeviceExtensionStorage(editor)?.device !== "pc") {
                resultOptions.offset = [0, 10];
            }

            return resultOptions;
        },
    });
}

onMounted(() => {
    requestAnimationFrame(() => {
        const bubblePlugin = getBubbleMenuPlugin();
        if (!bubblePlugin) return;
        editor?.registerPlugin(bubblePlugin);
    });
});

onBeforeUnmount(() => {
    editor?.unregisterPlugin(prop.pluginKey);
    eventBus.all.clear();
});
</script>
<style lang="scss" module>
.bubble-menu {
    //
}
</style>
