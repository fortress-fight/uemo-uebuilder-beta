<template>
    <div ref="root" v-bind="$attrs">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { UeTiptapFloatingMenuBaseProps } from "./index";
import { FloatingMenuPlugin } from "@tiptap/extension-floating-menu";
import { onBeforeUnmount, onMounted, ref } from "vue";

defineOptions({
    name: "UeTiptapFloatingMenu",
    inheritAttrs: false,
});
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
    const { pluginKey, editor, updateDelay, resizeDelay, options, appendTo, shouldShow } = props;

    const el = root.value;

    if (!el) {
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
    const { pluginKey, editor } = props;

    editor.unregisterPlugin(pluginKey);
});
</script>
