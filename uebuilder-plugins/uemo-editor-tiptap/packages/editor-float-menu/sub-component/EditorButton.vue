<template>
    <UeTiptapMenuButton type="editor" @trigger="openBtnRowEditorPanel" />
</template>
<script lang="ts" setup>
import { isNodeSelection } from "@tiptap/core";

import { getSelectionRect, selectNode } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { getClosestGridItem } from "../../extension-grid/utils/helper";
import { selectionIsTableNode, getTableNodeRect } from "../../extension-table/utils/helper";

const { editor } = useInjectTiptapEditor();
const props = defineProps<{ nodeName?: string }>();

function openBtnRowEditorPanel() {
    if (!editor) return;

    const { view, state } = editor;
    let nodeName: string | undefined;
    let rect: ReturnType<typeof getSelectionRect> | undefined;

    if (props.nodeName) {
        nodeName = props.nodeName;

        switch (nodeName) {
            case "gridItem":
                const gridItemInfo = getClosestGridItem(editor);
                if (!gridItemInfo) return;

                const { pos } = gridItemInfo;
                selectNode(editor, pos);

                rect = getSelectionRect(view, editor.state.selection);
                break;
            default:
                return;
        }
    } else {
        if (selectionIsTableNode(editor)) {
            const rect = getTableNodeRect(editor);
            if (!rect) return;

            editor.chain().openTableEditorPanel(rect).run();
            return;
        }

        if (!isNodeSelection(state.selection)) return;

        rect = getSelectionRect(view, state.selection);
        nodeName = state.selection.node.type.name;
    }

    if (!rect) return;

    switch (nodeName) {
        case "buttonRow":
            editor.chain().openButtonRowEditorPanel(rect).run();
            break;
        case "buttonItem":
            editor.chain().openButtonItemEditorPanel(rect).run();
            break;
        case "image":
            editor.chain().openImageEditorPanel(rect).run();
            break;
        case "svgIcon":
            editor.chain().openSvgIconEditorPanel(rect).run();
            break;
        case "frame":
            editor.chain().openFrameEditorPanel(rect).run();
            break;
        case "svgView":
            editor.chain().openSvgViewEditorPanel(rect).run();
            break;
        case "spline":
            editor.chain().openSplineEditorPanel(rect).run();
            break;
        case "lottie":
            editor.chain().openLottieEditorPanel(rect).run();
            break;
        case "gridGroup":
            editor.chain().openGridGroupEditorPanel(rect).run();
            break;
        case "gridItem":
            editor.chain().openGridItemEditorPanel(rect).run();
            break;
        case "dividerBlock":
            editor.chain().openDividerBlockEditorPanel(rect).run();
            break;
        case "hrRule":
            editor.chain().openHrRuleEditorPanel(rect).run();
            break;
        case "shareItem":
            editor.chain().openShareItemEditorPanel(rect).run();
            break;
        case "effectText":
            editor.chain().openEffectTextEditorPanel(rect).run();
            break;
        case "counterNumber":
            editor.chain().openCounterNumberEditorPanel(rect).run();
            break;
        default:
            return;
    }
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
