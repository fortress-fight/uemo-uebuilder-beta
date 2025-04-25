<!--
 * @Description: AI 编辑器按钮组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-25 13:02:08
-->
<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="editorAI"
        :disable="!enableAIPlugin"
        :class="$style['plugin-italic']"
        @trigger="openEditorAIPanel"
    />
</template>

<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

/**
 * AI 插件配置接口
 */
interface AIPluginConfig {
    /** 是否禁用 AI 插件 */
    disable?: boolean;
    /** 插件列表 */
    plugin: {
        /** 插件类型 */
        type: string;
        /** 插件配置 */
        [key: string]: any;
    }[];
}

const { editor } = useInjectTiptapEditor();
const instance = getCurrentInstance();
const rootDom = useTemplateRef("rootDom");

/**
 * 打开 AI 编辑器面板
 * @description 根据按钮位置打开 AI 编辑器面板，并设置相关回调
 */
function openEditorAIPanel(): void {
    const rect = rootDom.value?.$el;

    if (!editor || !rect) {
        console.warn("编辑器或按钮元素未找到");
        return;
    }

    editor.commands.openAttrEditorPanel(
        "editorAI",
        {},
        {
            rect,
            setData: () => {
                // NOTE AI 无需处理数据
            },
            focus: () => {
                editor.commands.focus();
            },
        }
    );
}

/**
 * 计算属性：是否启用 AI 插件
 * @description 根据配置和当前选区状态判断是否启用 AI 插件
 */
const enableAIPlugin = computed(() => {
    const AI_CONFIG = instance?.proxy?.$ueElAI as AIPluginConfig | undefined;

    if (!editor || !AI_CONFIG) return false;

    // 检查 AI 插件是否被禁用或没有可用插件
    if (AI_CONFIG.disable === true || !AI_CONFIG.plugin.length) {
        return false;
    }

    const { view, state } = editor;
    const { from, to } = state.selection;

    // 检查选区是否包含可编辑的文本节点
    let result = false;
    view.state.doc.nodesBetween(from, to, (node) => {
        if (["paragraph", "text", "hardBreak"].includes(node.type.name)) {
            result = true;
        }
    });
    return result;
});

// 组件卸载前清理
onBeforeUnmount(() => {
    editor?.commands.closeAttrEditorPanel("editorAI");
});
</script>

<style lang="scss" module>
.plugin-italic {
    // 样式定义
}
</style>
