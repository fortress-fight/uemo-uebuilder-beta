<!--
 * @Description: 链接编辑面板组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-09 12:21:46
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
import { TextSelection } from "@tiptap/pm/state";
import { isTextSelection } from "@tiptap/core";
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
const lastCursorPosition = ref<number>(-1);

/**
 * 获取当前链接值
 * @returns {UeElLinkSettingPanelValue | undefined} 当前链接的配置值
 */
//  const linkPanelRef = useTemplateRef("linkPanelRef");
//  import { getMarkRange, isTextSelection } from "@tiptap/core";
// function getCurrentLinkValue(): UeElLinkSettingPanelValue | undefined {
//     if (!editor) return;

//     const { doc, selection } = editor.state;
//     const { from, to, $from } = selection;
//     const value: UeElLinkSettingPanelValue = {
//         type: "link" as const,
//         link: "",
//         target: "_blank",
//     };

//     let linkText = "";
//     const selectedText = doc.textBetween(from, to);
//     const isEmptyTextBlock = !selectedText.length && isTextSelection(selection);
//     linkText = doc.textBetween(from, to);

//     if (editor.isActive("link")) {
//         value.link = editor.getAttributes("link").href;
//         if (isEmptyTextBlock) {
//             const linkRange = getMarkRange($from, editor.schema.marks.link);
//             if (linkRange) {
//                 linkText = doc.textBetween(linkRange.from, linkRange.to);
//             }
//         }
//     } else {
//         linkText = "";
//     }

//     return value;
// }

/**
 * 判断是否显示链接编辑面板
 */
const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, state }) => {
    if (!editor || panelClosing.value) return false;

    const { doc, selection } = state;
    const isEmptyTextBlock = !doc.textBetween(selection.from, selection.to).length && isTextSelection(selection);

    return editor.isActive("link") && isEmptyTextBlock;
};

/**
 * 处理链接选区
 * @param {number} from 选区起始位置
 * @param {number} to 选区结束位置
 */
function handleLinkSelection(from: number, to: number) {
    if (!editor) return;

    const { view } = editor;
    const newSelection = TextSelection.create(view.state.doc, from, to);
    view.dispatch(view.state.tr.setSelection(newSelection));
    editor.chain().setPreLink("link").run();
}

/**
 * 开始编辑时的处理
 */
function handleStartEdit() {
    if (!editor) return;

    const { state, schema } = editor;
    const linkMark = schema.marks.link;

    state.doc.nodesBetween(state.selection.from, state.selection.to, (node, pos) => {
        if (node.marks.some((mark) => mark.type === linkMark)) {
            handleLinkSelection(pos, pos + node.nodeSize);
        }
    });
}

/**
 * 结束编辑时的处理
 */
function handleEndEdit() {
    if (!editor) return;

    const hasLink = editor.getAttributes("link").href;
    editor
        .chain()
        .focus()
        [hasLink ? "setPreLink" : "unSetPreLink"](hasLink ? null : null)
        .run();

    if (editor.isActive("link") && lastCursorPosition.value !== -1) {
        const { view, state } = editor;
        const { $from, $to } = state.selection;

        let linkRange: { from: number; to: number } | null = null;
        view.state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (linkRange) return false;

            const linkMark = node.marks.find((mark) => mark.type === editor.schema.marks.link);
            if (linkMark) {
                linkRange = { from: pos, to: pos + node.nodeSize };
            }
        });

        if (linkRange) {
            const newPosition = Math.min(lastCursorPosition.value, $to.pos - 1);
            const newSelection = TextSelection.create(view.state.doc, newPosition, newPosition);
            editor.chain().setTextSelection(newSelection).run();
            lastCursorPosition.value = -1;
        }
    }
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
    if (linkValue.value.type === "link") {
        editor
            ?.chain()
            .setLink({
                href: linkValue.value.link,
                target: linkValue.value.target,
            })
            .run();
    }
    closePanel();
}

/**
 * 关闭编辑面板
 */
function closePanel() {
    if (!editor) return;

    const hasLink = editor.getAttributes("link").href;
    editor
        .chain()
        .focus()
        [hasLink ? "setPreLink" : "unSetPreLink"](hasLink ? null : null)
        .run();

    floatingMenuRef.value?.hide();
}

// 组件卸载前清理
onBeforeUnmount(() => {
    handleEndEdit();
});
</script>
