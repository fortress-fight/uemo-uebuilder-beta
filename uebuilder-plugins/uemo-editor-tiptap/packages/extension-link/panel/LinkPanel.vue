<!--
 * @Description: 链接编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-04-09 12:17:17
-->

<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        plugin-key="linkPanel"
        :should-show="shouldShow"
        ref="floatingMenu"
        @startEdit="addTipArea"
        @endEdit="removeTipArea"
    >
        <UeElLinkSettingPanel ref="linkPanel" v-model:value="value" @cancel="removeLink" @confirm="confirmLink" />
    </UeTiptapFloatingMenu>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingPanelValue } from "@stone/uemo-editor-element/packages/link-setting-panel";

import { TextSelection } from "@tiptap/pm/state";
import { isTextSelection } from "@tiptap/core";

import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const floatingMenuRef = useTemplateRef("floatingMenu");

// const link = ref<string>("");
// const text = ref<string>("");

const value = ref<UeElLinkSettingPanelValue>({ type: "link", link: "https://www.baidu.com", target: "_blank" });
const panelClosing = ref<boolean>(false);

// import { getMarkRange, isTextSelection } from "@tiptap/core";
// function getCurrentValue() {
//     if (!editor) return;
//     const { doc, selection } = editor.state;
//     const { from, to, $from } = selection;
//     const value = { type: "link", link: "", target: "_blank" };
//     const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection);

//     value.type = doc.textBetween(from, to);
//     if (editor.isActive("link")) {
//         value.link = editor?.getAttributes("link").href;
//         if (isEmptyTextBlock) {
//             const linkRange = getMarkRange($from, editor.schema.marks.link);
//             if (linkRange) {
//                 value.type = doc.textBetween(linkRange.from, linkRange.to);
//             }
//         }
//     } else {
//         value.link = "";
//     }

//     return value;
// }

/**
 * 判断是否显示链接编辑面板
 */
const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = (param) => {
    const { editor, state } = param;

    if (!editor) return false;

    const { doc, selection } = state;

    // if (!oldState) {
    //     return false;
    // }
    const { from, to } = selection;

    if (panelClosing.value) return false;

    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection);

    // 处于链接选中状态，并且没有选中文字
    if (editor.isActive("link") && isEmptyTextBlock) {
        // updateValue();
        return true;
    }

    return false;
};

let oldPos = -1;

/**
 * 添加链接选中状态
 */
function addTipArea() {
    if (!editor) return;

    const { state, view, schema } = editor;
    const { selection } = state;
    const linkMark = schema.marks.link;

    // 查找选区中的链接
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
        if (node.marks.some((mark) => mark.type === linkMark)) {
            const from = pos; // 链接的起始位置
            const to = pos + node.nodeSize; // 链接的结束位置

            // 创建新的选区，覆盖整个链接的范围
            const newSelection = TextSelection.create(view.state.doc, from, to);

            // 更新选区以选中新的链接文本
            view.dispatch(view.state.tr.setSelection(newSelection));

            editor?.chain().setPreLink("link").run();
        }
    });
}

/**
 * 移除链接选中状态
 */
function removeTipArea() {
    if (!editor) return;

    if (editor.getAttributes("link").href) {
        editor.chain().focus().setPreLink(null).run();
    } else {
        editor.chain().focus().unSetPreLink().run();
    }

    if (editor.isActive("link") && oldPos !== -1) {
        const { view } = editor;
        const { selection } = editor.state;
        const { $from, $to } = selection;

        let linkRange: { from: number; to: number } | null = null;
        view.state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (linkRange) {
                return false;
            }
            const linkMark = node.marks.find((mark) => mark.type === editor.schema.marks.link);
            if (linkMark) {
                linkRange = { from: pos, to: pos + node.nodeSize };
            }
        });

        if (linkRange) {
            const newSection = TextSelection.create(
                view.state.doc,
                Math.min(oldPos, $to.pos - 1),
                Math.min(oldPos, $to.pos - 1)
            );

            oldPos = -1;
            editor.chain().setTextSelection(newSection).run();
        }
    }
}

function removeLink() {
    editor?.chain().focus().unsetLink().run();
    floatingMenuRef.value?.hide();
}

function closePanel() {
    if (!editor) return;
    if (editor.getAttributes("link").href) {
        editor.chain().focus().setPreLink(null).run();
    } else {
        editor.chain().focus().unSetPreLink().run();
    }

    floatingMenuRef.value?.hide();
}

function confirmLink() {
    const type = value.value.type;

    if (type === "link") {
        editor
            ?.chain()
            .setLink({
                href: value.value.link,
                target: value.value.target,
            })
            .run();
    }
    closePanel();
}

onBeforeUnmount(() => {
    removeTipArea();
});
</script>
