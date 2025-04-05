<!--
 * @Description: 气泡工具栏控件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-06 03:18:52
-->
<template>
    <UeElPopPanel :class="$style['bubble-menu']" ref="popPanel" v-model:open="showPopPanel" v-bind="popPanelParams">
        <div
            tabindex="0"
            @focusin="isFocusInPopPanel = true"
            @focusout="isFocusInPopPanel = false"
            :class="$style['pop-panel-content']"
        >
            <slot></slot>
        </div>
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeTiptapBubbleMenuBaseProps } from "./index";
import type { BubbleMenuPluginProps } from "../extension-bubble-menu/src/bubble-menu-plugin";

import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { BubbleMenuPlugin } from "../extension-bubble-menu/src/bubble-menu-plugin";
import { getDeviceExtensionStorage } from "../../utils/tiptap-helper";

defineOptions({ name: "UeTiptapBubbleMenu" });

const props = withDefaults(defineProps<UeTiptapBubbleMenuBaseProps>(), {
    shouldShow: null,
    pluginKey: "bubbleMenu",
});
const popPanelRef = useTemplateRef("popPanel");
const { editor } = useInjectTiptapEditor();

const showPopPanel = ref<boolean>(false);
const isFocusInPopPanel = ref<boolean>(false);

const popPanelParams = ref<UE_EL_COMPONENT.UeElPopPanelProps>({
    zIndex: 99999,
    draggable: false,

    // NOTE 如何编辑器聚焦，就将关闭逻辑交付给编辑内部管理，否则就交给 autoClose 管理
    checkAllowClose: () => !editor?.isFocused,
});

watch(popPanelParams, () => popPanelRef.value?.updateDialogPos(), { deep: true });

const pluginController: BubbleMenuPluginProps["controller"] = (type, refEl) => {
    switch (type) {
        case "show":
            if (!refEl?.getBoundingClientRect || !editor) return;

            showPopPanel.value = true;

            const isPc = getDeviceExtensionStorage(editor)?.device === "pc";

            popPanelParams.value.panel = {
                position: {
                    autoUpdate: true,
                    options: {
                        strategy: "fixed",
                        placement: "top-start",
                        middleware: [
                            ["flip", { crossAxis: false }],
                            ["offset", isPc ? { crossAxis: -37, mainAxis: 10 } : { mainAxis: 10 }],
                            ["shift", { crossAxis: true, padding: 17 }],
                        ],
                    },
                    refEl: {
                        getBoundingClientRect: refEl.getBoundingClientRect,
                    },
                },
            };

            break;

        case "hide":
            requestAnimationFrame(() => {
                if (!isFocusInPopPanel.value) {
                    showPopPanel.value = false;
                }
            });
            break;
    }
};

function getBubbleMenuPlugin() {
    if (!editor) return;
    return BubbleMenuPlugin({
        editor: editor,
        pluginKey: props.pluginKey,
        updateDelay: 0,
        shouldShow: props.shouldShow,
        controller: pluginController,
        onDestroy: () => (showPopPanel.value = false),
    });
}

function registerPlugin() {
    requestAnimationFrame(() => {
        const bubblePlugin = getBubbleMenuPlugin();
        if (!bubblePlugin) return;
        editor?.registerPlugin(bubblePlugin);
    });
}

watch(
    () => editor,
    () => registerPlugin()
);

onMounted(() => {
    registerPlugin();
});

onBeforeUnmount(() => {
    editor?.unregisterPlugin(props.pluginKey);
});
</script>
<style lang="scss" module>
.bubble-menu {
    //
}
.pop-panel-content {
    border-radius: 5px;
    background-color: #f2f2f2;
}
</style>
