<!--
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-05-08 19:10:53
-->
<template>
    <UeElPopPanel :class="$style['floating-menu']" v-model:open="showPopPanel" v-bind="popPanelParams" :mask="mask">
        <div
            tabindex="0"
            ref="popPanelRef"
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

defineOptions({ name: "UeTiptapFloatingMenu" });

const instance = getCurrentInstance();
const props = withDefaults(defineProps<UeTiptapFloatingMenuBaseProps>(), {
    theme: "ue-tiptap",
    tippyOptions: () => ({}),
    shouldShow: null,
});
const emit = defineEmits<{
    (e: "startEdit" | "endEdit"): void;
}>();

const { editor } = useInjectTiptapEditor();

const mask = computed(() => {
    if (typeof props.disableCloseTip === "string") {
        return { color: "rgba(0, 0, 0, 0)" };
    }
    return props.mask;
});

const showPopPanel = ref<boolean>(false);
watch(showPopPanel, (isShow) => {
    if (!isShow) {
        emit("endEdit");
    }
});

const popPanelParams = ref<UE_EL_COMPONENT.UeElPopPanelProps>({
    // autoClose: false,
    draggable: false,
    zIndex: 100001,
    checkAllowClose: () => {
        // NOTE 如何编辑器聚焦，就将关闭逻辑交付给编辑内部管理，否则就交给 autoClose 管理
        if (editor?.isFocused) return false;
        if (typeof props.disableCloseTip === "string") {
            void (props.disableCloseTip && instance?.proxy?.$ueElToast.warning(props.disableCloseTip));
            return false;
        }
        return true;
    },
});

const isFocusInPopPanel = ref<boolean>(false);
watch(isFocusInPopPanel, (isFocus) => {
    if (isFocus) {
        emit("startEdit");
    }
});

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
                        middleware: [
                            ["flip", { crossAxis: true, padding: 17 }],
                            ["offset", { mainAxis: 10 }],
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
                // NOTE 如果 弹窗元素 聚焦，则将关闭逻辑交付给 弹窗元素 管理
                if (isFocusInPopPanel.value) {
                    return;
                }
                if (typeof props.disableCloseTip === "string") {
                    void (props.disableCloseTip && instance?.proxy?.$ueElToast.warning(props.disableCloseTip));
                    return false;
                }
                showPopPanel.value = false;
            });
            break;
    }
};

function getFloatingMenuPlugin() {
    if (!editor) return;
    if (!props.pluginKey) {
        throw new Error("pluginKey is required");
    }
    return FloatingMenuPlugin({
        editor,
        pluginKey: props.pluginKey,
        updateDelay: 1,
        shouldShow: props.shouldShow,
        controller: pluginController,
    });
}

function registerPlugin() {
    const floatingPlugin = getFloatingMenuPlugin();
    if (!floatingPlugin) return;
    editor?.registerPlugin(floatingPlugin);
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
    emit("endEdit");
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
