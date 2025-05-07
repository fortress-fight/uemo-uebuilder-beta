<!--
 * @Description: 链接编辑面板组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-12 17:10:29
 * @Module: TipTap Link Extension
 * @Component: LinkPanel
 * @Features:
 *   - 链接编辑浮动面板
 *   - 支持链接添加、编辑、删除
 *   - 支持链接文本选择
-->

<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        plugin-key="linkPanel"
        :should-show="shouldShow"
        :disable-close-tip="disableCloseTip"
        ref="floatingMenuRef"
        @startEdit="handleStartEdit"
        @endEdit="handleEndEdit"
    >
        <UeElLinkSettingPanel
            ref="linkPanelRef"
            v-model:value="linkValue"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        />
    </UeTiptapFloatingMenu>
</template>

<script lang="ts" setup>
import type { UeElLinkSettingPanelValue } from "@stone/uemo-editor-element/packages/link-setting-panel";
import type { UeElLinkSettingPanelInstance } from "@stone/uemo-editor-element/packages/link-setting-panel";
import type { Editor } from "@tiptap/core";

import { isTextSelection } from "@tiptap/core";

import { getLinkAttr } from "../utils/helper";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

/**
 * 组件状态和引用
 */
const { editor } = useInjectTiptapEditor();
const floatingMenuRef = useTemplateRef("floatingMenuRef");
const linkValue = ref<UeElLinkSettingPanelValue>({
    type: "link",
    link: "",
    target: "_blank",
});
const panelClosing = ref<boolean>(false);

const linkPanelRef = useTemplateRef<UeElLinkSettingPanelInstance>("linkPanelRef");
const disableCloseTip = computed<string | undefined>(() => {
    return linkPanelRef?.value?.valueChange ? "链接设置未保存，请保存链接设置" : undefined;
});

const checkIsEmptyTextBlock = (editor: Editor) => {
    if (!editor) return false;

    const { doc, selection } = editor.state;
    const isEmptyTextBlock = !doc.textBetween(selection.from, selection.to).length && isTextSelection(selection);
    return isEmptyTextBlock;
};

/**
 * 获取当前链接值
 * @returns {UeElLinkSettingPanelValue | undefined} 当前链接的配置值
 */
function updateCurrentLinkValue(): UeElLinkSettingPanelValue | undefined {
    if (!editor || linkPanelRef?.value?.valueChange) return;

    if (editor.isActive("link")) {
        linkValue.value = getLinkAttr(editor);
    }
}

/**
 * 判断是否显示链接编辑面板
 */
const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor }) => {
    if (!editor || panelClosing.value) return false;

    const isEmptyTextBlock = checkIsEmptyTextBlock(editor);
    const isLink = editor.isActive("link");

    if (isLink && isEmptyTextBlock) {
        updateCurrentLinkValue();
        return true;
    }

    return false;
};

/**
 * 开始编辑时的处理
 */
function handleStartEdit() {
    if (!editor) return;

    editor.chain().setMarkSelection("link").setEditingMark("link").run();
}

/**
 * 结束编辑时的处理
 */
function handleEndEdit() {
    if (!editor) return;

    editor.chain().unsetEditingMark().run();
}

/**
 * 取消链接编辑
 */
function handleCancel() {
    editor?.chain().focus().unsetLink().run();
    floatingMenuRef.value?.hide();
}

/**
 * 确认链接编辑
 */
function handleConfirm() {
    editor?.chain().setLink(linkValue.value).run();
    closePanel();
}

/**
 * 关闭编辑面板
 */
function closePanel() {
    if (!editor) return;

    const hasLink = getLinkAttr(editor).link;
    if (!hasLink) {
        editor.chain().unsetLink().run();
    }

    floatingMenuRef.value?.hide();
}

// 组件卸载前清理
onBeforeUnmount(() => {
    handleEndEdit();
});
</script>
