<!--
 * @Description: 链接编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-04-05 03:23:08
-->

<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        plugin-key="linkPanel"
        :should-show="shouldShow"
        @onShow="onShow"
        @onShown="panelShown"
        @onHide="panelClose"
        @onHidden="panelHidden"
    >
        <UeTiptapLinkPanelMain v-if="!hidden" ref="linkPanel" />
    </UeTiptapFloatingMenu>
</template>
<script lang="ts" setup>
import { TextSelection } from "@tiptap/pm/state";
import { getMarkRange, isTextSelection } from "@tiptap/core";

import UeTiptapLinkPanelMain from "./LinkPanelMain.vue";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { hide } from "@stone/uemo-editor-utils/lib/floating-ui";

const { editor } = useInjectTiptapEditor();

const link = ref<string>("");
const text = ref<string>("");
const isBlankLink = ref<boolean>(false);

/**
 * 修改链接的文字内容
 */
function changeText(newText: string) {
    if (newText && newText.trim().length >= 2) {
        if (!editor) return false;
        if (!editor.isActive("link")) return false;

        const { view } = editor;
        const { selection } = editor.state;
        const { from, to } = selection;

        view.state.doc.nodesBetween(from, to, (node, pos) => {
            const { schema } = editor;
            const linkMark = schema.marks.link;
            if (node.marks.some((mark) => mark.type === linkMark)) {
                const from = pos; // 链接的起始位置
                const to = pos + node.nodeSize; // 链接的结束位置

                // 使用命令将链接的内容替换为新的文本
                view.dispatch(view.state.tr.replaceWith(from, to, schema.text(newText, node.marks)));

                // 创建新的选区，覆盖整个链接的范围
                const newSelection = TextSelection.create(view.state.doc, from, from + newText.length);

                // 更新选区以选中新的链接文本
                view.dispatch(view.state.tr.setSelection(newSelection));

                // 聚焦到编辑器
                view.focus();

                return false;
            }
        });
    }
}

function changeLink(newLink: string) {
    if (!editor || !newLink) return;
    const newVal = {
        href: newLink,
        target: isBlankLink.value ? "_blank" : "_self",
    };

    editor.chain().setLink(newVal).run();
}

function toggleTarget() {
    if (!editor) return;
    isBlankLink.value = !isBlankLink.value;
    const newVal = {
        href: link.value,
        target: isBlankLink.value ? "_blank" : "_self",
    };

    editor.chain().setLink(newVal).run();
}

const linkPanel = useTemplateRef("linkPanel");
const fixShow = ref<boolean>(false);
const panelClosing = ref<boolean>(false);

function onShow() {
    if (!editor) return false;
    hidden.value = false;
}

function panelShown() {
    if (!editor) return false;
    const linkArea = editor.getAttributes("link").preLink;
    if (linkArea) {
        requestAnimationFrame(() => {
            linkPanel.value?.linkInputFocus();
        });
    }
}

function panelClose() {
    if (!editor) return false;
    fixShow.value = false;
    panelClosing.value = true;
    editor.setOptions({
        showMenu: false,
    });
}

const hidden = ref<boolean>(false);
function panelHidden() {
    if (!editor) return false;
    hidden.value = true;
    setTimeout(() => {
        panelClosing.value = false;
    });
}
const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = (param) => {
    const { editor, state, oldState, view } = param;

    if (!editor) return false;

    const { doc, selection } = state;

    // if (!oldState) {
    //     return false;
    // }
    const { from, to, $from } = selection;

    if (panelClosing.value) return false;

    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection);

    function setValue() {
        text.value = doc.textBetween(from, to);

        if (editor.isActive("link")) {
            link.value = editor?.getAttributes("link").href;
            isBlankLink.value = editor?.getAttributes("link").target === "_blank";

            if (isEmptyTextBlock) {
                const linkRange = getMarkRange($from, editor.schema.marks.link);
                if (linkRange) {
                    text.value = doc.textBetween(linkRange.from, linkRange.to);
                }
            }
        } else {
            link.value = "";
        }
    }

    if (editor.isActive("link") && isEmptyTextBlock) {
        setValue();
        return true;
    }

    if (editor.getAttributes("link").preLink) {
        setValue();
        return true;
    }

    if (fixShow.value) {
        setValue();
        return true;
    }

    return false;
};

let oldPos = -1;

function addTipArea() {
    if (!editor) return;

    fixShow.value = true;
    editor.setOptions({ showMenu: true });

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

function removeTipArea(ev: FocusEvent) {
    if (!editor) return;
    const relatedTarget = ev.relatedTarget;

    if (
        relatedTarget instanceof HTMLElement &&
        (relatedTarget.nodeName.toLocaleLowerCase() === "input" ||
            relatedTarget.nodeName.toLocaleLowerCase() === "button") &&
        linkPanel.value?.panel?.$el.contains(relatedTarget)
    ) {
        return;
    }

    fixShow.value = true;

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

            view.dispatch(view.state.tr.setSelection(newSection));
        }
    }
}

function removeLink() {
    fixShow.value = false;
    editor?.chain().focus().unsetLink().run();
}

function closePanel() {
    if (!editor) return;
    fixShow.value = false;
    if (editor.getAttributes("link").href) {
        editor.chain().focus().setPreLink(null).run();
    } else {
        editor.chain().focus().unSetPreLink().run();
    }
}
</script>
