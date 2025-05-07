<!--
 * @Description: AI 加载面板组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-25 11:39:48
 * @Module: TipTap AI Extension
 * @Component: AILoadingPanel
 * @Features:
 *   - AI 加载浮动面板
 *   - 支持 AI 加载状态管理
 *   - 集成 AILoadingBar 组件
-->

<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        plugin-key="editorAIPanel"
        :should-show="shouldShow"
        :disable-close-tip="disableCloseTip"
        ref="floatingMenuRef"
    >
        <AILoadingBar @cancel="closePanel" />
    </UeTiptapFloatingMenu>
</template>

<script lang="ts" setup>
import type { Editor } from "@tiptap/core";
import { isTextSelection } from "@tiptap/core";
import AILoadingBar from "./AILoadingBar.vue";
import { getAIStorage } from "../helper";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

/**
 * 组件状态和引用
 */
const { editor } = useInjectTiptapEditor();
const floatingMenuRef = useTemplateRef("floatingMenuRef");
const panelClosing = ref<boolean>(false);

/**
 * 计算属性：是否禁用关闭提示
 * 当 AI 正在编辑时，禁用关闭提示
 */
const disableCloseTip = computed<string | undefined>(() => {
    if (!editor) return undefined;
    return getAIStorage(editor)?.AIEditing ? "" : undefined;
});

/**
 * 检查当前选区是否为空文本块
 * @param {Editor} editor - Tiptap 编辑器实例
 * @returns {boolean} 是否为空文本块
 */
const checkIsEmptyTextBlock = (editor: Editor): boolean => {
    if (!editor) return false;
    const { doc, selection } = editor.state;
    return !doc.textBetween(selection.from, selection.to).length && isTextSelection(selection);
};

/**
 * 判断是否显示加载面板
 * 需要满足以下条件：
 * 1. 编辑器实例存在
 * 2. 面板未处于关闭状态
 * 3. 当前选区不是空文本块
 * 4. AI 正在编辑状态
 */
const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor }) => {
    if (!editor || panelClosing.value) return false;
    if (checkIsEmptyTextBlock(editor)) return false;
    return !!getAIStorage(editor)?.AIEditing;
};

/**
 * 关闭面板
 * 1. 取消 AI 编辑状态
 * 2. 隐藏浮动菜单
 */
function closePanel() {
    editor?.chain().focus().cancelAIEditing().run();
    floatingMenuRef.value?.hide();
}

// 监听 AI 编辑状态变化
watch(
    () => editor && getAIStorage(editor)?.AIEditing,
    (isEditing) => {
        if (!isEditing) {
            closePanel();
        }
    }
);

// 生命周期钩子
onBeforeUnmount(() => {
    closePanel();
});
</script>
