<!--
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-05 03:20:44
-->
<template>
    <div ref="rootDom" :class="$style['floating-menu']">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptapFloatingMenuBaseProps } from "./index";
import type { Props } from "tippy.js";
import type { Editor } from "@tiptap/vue-3";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { FloatingMenuPlugin } from "../extension-floating-menu/src";

defineOptions({ name: "UeTiptapFloatingMenu" });
const props = withDefaults(defineProps<UeTiptapFloatingMenuBaseProps>(), {
    tippyOptions: () => ({}),
    shouldShow: null,
});
const emit = defineEmits<{
    (e: "onShow" | "onShown" | "onHide" | "onHidden"): void;
}>();

const rootDom = useTemplateRef("rootDom");

const className = useCssModule();

const usePluginKey = computed(() => props.pluginKey || props.type);

const { editor } = useInjectTiptapEditor();

function getFloatingMenuTippyOptions(): Partial<Props> {
    // const targetDom = $(`
    //     <div class='${className["floating-menu--overlay"]}' tabindex='-1'>
    //         <div class='${className["floating-menu--overlay_inner"]}'></div>
    //     </div>
    // `);

    return {
        maxWidth: "none",
        arrow: false,
        zIndex: 100001,
        duration: 0,
        offset: [0, 10],
        placement: "bottom",
        appendTo: document.body,
        theme: "ue-tiptap",
        onShown: () => {
            emit("onShown");
            // targetDom.one("click", () => {
            //     $(rootDom.value!).data("_tippy").hide();
            // });
        },
        onShow: () => {
            emit("onShow");
            // targetDom.appendTo("body")[0];
        },
        onHide: () => {
            emit("onHide");
            // editor?.chain().focus();
        },
        onHidden: () => {
            requestAnimationFrame(() => {
                emit("onHidden");
                // targetDom.remove();
            });
        },
    };
}

function getEaseFloatingMenuTippyOptions(): Partial<Props> {
    return {
        zIndex: 100001,
        maxWidth: "none",
        offset: [0, 10],
        placement: "bottom",
        theme: "ue-tiptap",
        arrow: false,
        appendTo: document.body,
        onShown: () => {
            emit("onShown");
        },
        onShow: () => {
            emit("onShow");
        },
        onHide: () => {
            emit("onHide");
        },
        onHidden: () => {
            requestAnimationFrame(() => {
                emit("onHidden");
            });
        },
        popperOptions: {
            modifiers: [{ name: "preventOverflow", options: { altAxis: true, tether: false, padding: 10 } }],
        },
        ...props.tippyOptions,
    };
}

const tippyOptions = computed(() => {
    return props.type === "easeFloatingMenu" ? getEaseFloatingMenuTippyOptions() : getFloatingMenuTippyOptions();
});

function registerPlugin(editor: Editor) {
    if (!editor) return;
    editor.registerPlugin(
        FloatingMenuPlugin({
            editor,
            pluginKey: usePluginKey.value,
            element: rootDom.value!,
            tippyOptions: tippyOptions.value,
            shouldShow: props.shouldShow,
        })
    );
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
        if (!rootDom.value) return;
        $(rootDom.value).data("_tippy")?.update();
    },
    hide() {
        if (!rootDom.value) return;
        $(rootDom.value).data("_tippy")?.hide();
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
