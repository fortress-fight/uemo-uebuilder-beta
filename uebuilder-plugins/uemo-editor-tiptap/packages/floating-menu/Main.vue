<!--
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-06 01:41:23
-->
<template>
    <UeElPopPanel :class="$style['floating-menu']" ref="popPanel" v-model:open="showPopPanel" v-bind="popPanelParams">
        <div tabindex="0" @focusin="focusHandler" @focusout="blurHandler" :class="$style['pop-panel-content']">
            <slot></slot>
        </div>
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";
import type { FloatingMenuPluginProps } from "../extension-floating-menu/src/index";
import type { UeTiptapFloatingMenuBaseProps } from "./index";

import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { FloatingMenuPlugin } from "../extension-floating-menu/src";

const popPanelRef = useTemplateRef("popPanel");

defineOptions({ name: "UeTiptapFloatingMenu" });
const props = withDefaults(defineProps<UeTiptapFloatingMenuBaseProps>(), {
    tippyOptions: () => ({}),
    shouldShow: null,
});
const emit = defineEmits<{
    (e: "onShow" | "onShown" | "onHide" | "onHidden"): void;
}>();

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

const isFocus = ref<boolean>(false);

function focusHandler() {
    isFocus.value = true;
}

function blurHandler() {
    isFocus.value = false;
}
function registerPlugin(editor: Editor) {
    if (!editor) return;
    const pluginController: FloatingMenuPluginProps["controller"] = (type, tippy) => {
        switch (type) {
            case "show":
                if (!tippy?.getReferenceClientRect) return;

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
                            getBoundingClientRect: tippy.getReferenceClientRect,
                        },
                    },
                };
                requestAnimationFrame(() => {
                    popPanelRef.value?.updateDialogPos();
                });
                break;
            case "hide":
                requestAnimationFrame(() => {
                    if (!isFocus.value) {
                        showPopPanel.value = false;
                    }
                });
                break;
        }
    };

    const plugin = FloatingMenuPlugin({
        editor,
        pluginKey: usePluginKey.value,
        shouldShow: props.shouldShow,
        controller: pluginController,
    });
    editor.registerPlugin(plugin);
}

watch(
    () => editor,
    (editor) => {
        requestAnimationFrame(() => {
            editor && registerPlugin(editor);
        });
    }
);

onBeforeUnmount(() => {
    editor?.unregisterPlugin(usePluginKey.value);
});

onMounted(() => {
    requestAnimationFrame(() => {
        editor && registerPlugin(editor);
    });
});

defineExpose({
    update() {
        //
    },
    hide() {
        //
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
