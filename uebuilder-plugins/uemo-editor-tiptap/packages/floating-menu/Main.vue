<!--
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-06 03:42:30
-->
<template>
    <UeElPopPanel :class="$style['floating-menu']" ref="popPanel" v-model:open="showPopPanel" v-bind="popPanelParams">
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
import type { FloatingMenuPluginProps } from "../extension-floating-menu/src/index";
import type { UeTiptapFloatingMenuBaseProps } from "./index";

import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { FloatingMenuPlugin } from "../extension-floating-menu/src";

const popPanelRef = useTemplateRef("popPanel");

defineOptions({ name: "UeTiptapFloatingMenu" });
const props = withDefaults(defineProps<UeTiptapFloatingMenuBaseProps>(), {
    theme: "ue-tiptap",
    tippyOptions: () => ({}),
    shouldShow: null,
});

const usePluginKey = computed(() => props.pluginKey || props.type);

const { editor } = useInjectTiptapEditor();

const showPopPanel = ref<boolean>(false);

const popPanelParams = ref<UE_EL_COMPONENT.UeElPopPanelProps>({
    // autoClose: false,
    draggable: false,
    zIndex: 100001,
    checkAllowClose: () => {
        // NOTE 如何编辑器聚焦，就将关闭逻辑交付给编辑内部管理，否则就交给 autoClose 管理
        if (editor?.isFocused) return false;
        return true;
    },
});

const isFocusInPopPanel = ref<boolean>(false);

const pluginController: FloatingMenuPluginProps["controller"] = (type, refEl) => {
    switch (type) {
        case "show":
            if (!refEl?.getBoundingClientRect || !editor) return;

            showPopPanel.value = true;

            popPanelParams.value.panel = {
                position: {
                    autoUpdate: true,
                    options: {
                        strategy: "fixed",
                        middleware:
                            props.type === "easeFloatingMenu"
                                ? [
                                      ["flip", { crossAxis: false }],
                                      ["offset", { mainAxis: 10 }],
                                      ["shift", { crossAxis: true, padding: 17 }],
                                  ]
                                : [
                                      ["flip", { crossAxis: false }],
                                      ["offset", { mainAxis: 10 }],
                                  ],
                    },
                    refEl: {
                        getBoundingClientRect: refEl.getBoundingClientRect,
                    },
                },
            };
            requestAnimationFrame(() => {
                popPanelRef.value?.updateDialogPos();
            });
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

function getFloatingMenuPlugin() {
    if (!editor) return;
    return FloatingMenuPlugin({
        editor,
        pluginKey: usePluginKey.value,
        shouldShow: props.shouldShow,
        controller: pluginController,
    });
}

function registerPlugin() {
    requestAnimationFrame(() => {
        const floatingPlugin = getFloatingMenuPlugin();
        if (!floatingPlugin) return;
        editor?.registerPlugin(floatingPlugin);
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
    editor?.unregisterPlugin(usePluginKey.value);
});

defineExpose({
    hide() {
        showPopPanel.value = false;
    },
});
</script>
<style lang="scss" module>
.floating-menu {
    //
}
.floating-menu--overlay {
    position: fixed;
    z-index: 100000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    pointer-events: none;
}
.floating-menu--overlay_inner {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    pointer-events: all;
}
</style>
