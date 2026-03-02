<template>
    <div ref="root" v-bind="$attrs" v-if="editor" :editor="editor">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { UeTiptapFloatingMenuBaseProps } from "./index";

import { FloatingMenuPlugin } from "@tiptap/extension-floating-menu";

import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

defineOptions({ name: "UeTiptapFloatingMenu", inheritAttrs: false });

const { editor } = useInjectTiptapEditor();

const props = withDefaults(defineProps<UeTiptapFloatingMenuBaseProps>(), {
    pluginKey: "floatingMenu",
    updateDelay: undefined,
    resizeDelay: undefined,
    options: () => ({}),
    appendTo: undefined,
    shouldShow: undefined,
});

const root = ref<HTMLElement | null>(null);

onMounted(() => {
    const { pluginKey, updateDelay, resizeDelay, options, appendTo, shouldShow } = props;

    const el = root.value;

    if (!el || !editor) {
        return;
    }

    el.style.visibility = "hidden";
    el.style.position = "absolute";

    el.remove();

    editor.registerPlugin(
        FloatingMenuPlugin({
            pluginKey,
            editor,
            element: el,
            updateDelay,
            resizeDelay,
            options,
            appendTo,
            shouldShow,
        })
    );
});

onBeforeUnmount(() => {
    const { pluginKey } = props;

    editor?.unregisterPlugin(pluginKey);
});
</script>
