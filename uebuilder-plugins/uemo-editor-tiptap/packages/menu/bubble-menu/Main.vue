<template>
    <div ref="root">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { UeTiptapBubbleMenuBaseProps } from "./index";

import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

defineOptions({ name: "UeTiptapBubbleMenu", inheritAttrs: false });

const props = withDefaults(defineProps<UeTiptapBubbleMenuBaseProps>(), {
    pluginKey: "bubbleMenu",
    updateDelay: undefined,
    resizeDelay: undefined,
    options: () => ({}),
    appendTo: undefined,
    shouldShow: undefined,
    getReferencedVirtualElement: undefined,
});

/** 气泡菜单的根元素引用 */
const root = ref<HTMLElement | null>(null);

/**
 * 组件挂载时初始化气泡菜单插件
 * 1. 设置元素样式为隐藏和绝对定位
 * 2. 从 DOM 中移除元素（插件会在显示时重新挂载）
 * 3. 在下一个 tick 注册插件到编辑器
 */
onMounted(() => {
    const { editor, options, pluginKey, resizeDelay, appendTo, shouldShow, getReferencedVirtualElement, updateDelay } =
        props;

    const el = root.value;

    if (!el) {
        return;
    }

    // 初始化元素样式：隐藏并设置为绝对定位
    el.style.visibility = "hidden";
    el.style.position = "absolute";

    // 从 DOM 中移除，插件会在需要时重新挂载
    el.remove();

    requestAnimationFrame(() => {
        editor.registerPlugin(
            BubbleMenuPlugin({
                editor,
                element: el,
                options,
                pluginKey,
                resizeDelay,
                appendTo,
                shouldShow,
                getReferencedVirtualElement,
                updateDelay,
            })
        );
    });
});

/**
 * 组件卸载前清理插件
 * 从编辑器中注销气泡菜单插件，避免内存泄漏
 */
onBeforeUnmount(() => {
    const { pluginKey, editor } = props;

    editor.unregisterPlugin(pluginKey);
});
</script>
