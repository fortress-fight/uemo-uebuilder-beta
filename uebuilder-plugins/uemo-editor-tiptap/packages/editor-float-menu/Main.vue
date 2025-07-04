<!--
 * @Description: 浮动编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 11:04:50
-->
<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        :plugin-key="pluginKey"
        :should-show="shouldShow"
        :floating-props="floatingProps"
        ref="floatingMenuRef"
    >
        <UeTiptapMenuBar :class="$style['editor-menu']" :title="title">
            <template v-for="(item, index) in useMenuItems" :key="index">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="FLOAT_MENU_BUTTON_MAP[item]" :key="index" :node-name="nodeName" />
            </template>
        </UeTiptapMenuBar>
    </UeTiptapFloatingMenu>
</template>
<script lang="ts" setup>
import type { UeTiptapEditorFloatMenuBaseProps } from "./index";
import type { VirtualElement } from "@floating-ui/dom";

import { CellSelection } from "@tiptap/pm/tables";

import { clearMenuItems } from "../menu-bar/helper";
import { FLOAT_MENU_BUTTON_MAP } from "./utils/helper";
import { hasParentNode } from "../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { getClosestGridItem } from "../extension-grid/utils/helper";
import { getClosestTable } from "../extension-table/utils/helper";

defineOptions({ name: "UeTiptapEditorFloatMenu" });

const { editor } = useInjectTiptapEditor();

const props = withDefaults(defineProps<UeTiptapEditorFloatMenuBaseProps>(), {
    disableMenuItems: () => [],
});

const floatingProps = computed<{ refEl: VirtualElement } | undefined>(() => {
    if (props.pluginKey === "gridItemMenu") {
        if (!editor) return undefined;

        return {
            refEl: {
                getBoundingClientRect: () => {
                    const node = getClosestGridItem(editor);
                    if (!node) {
                        return window.document.body.getBoundingClientRect();
                    }

                    const dom = editor.view.nodeDOM(node.pos) as HTMLElement;
                    const rect = dom.getBoundingClientRect();

                    return rect;
                },
            },
        };
    }
    if (props.pluginKey === "tableMenu") {
        if (!editor) return undefined;

        const { selection } = editor.state;
        if (!(selection instanceof CellSelection)) {
            return {
                refEl: {
                    getBoundingClientRect: () => {
                        const node = getClosestTable(editor);
                        if (!node) {
                            return window.document.body.getBoundingClientRect();
                        }

                        const dom = editor.view.nodeDOM(node.pos) as HTMLElement;
                        const rect = dom.getBoundingClientRect();

                        return rect;
                    },
                },
            };
        }

        return {
            refEl: {
                getBoundingClientRect: () => {
                    const { $anchorCell, $headCell } = selection;

                    const from = $headCell.pos > $anchorCell.pos ? $anchorCell.pos : $headCell.pos;
                    const to = $headCell.pos > $anchorCell.pos ? $headCell.pos : $anchorCell.pos;

                    const fromDom = editor.view.nodeDOM(from) as HTMLElement;
                    const toDom = editor.view.nodeDOM(to) as HTMLElement;

                    if (!fromDom || !toDom) return;

                    const fromRect = fromDom.getBoundingClientRect();
                    const toRect = toDom.getBoundingClientRect();

                    return {
                        x: fromRect.left,
                        y: fromRect.top,
                        left: fromRect.left,
                        top: fromRect.top,
                        width: Math.max(
                            Math.abs(toRect.right - fromRect.left),
                            Math.abs(fromRect.right - toRect.left),
                            fromRect.width,
                            toRect.width
                        ),
                        height: Math.max(
                            Math.abs(toRect.bottom - fromRect.top),
                            Math.abs(fromRect.bottom - toRect.top),
                            fromRect.height,
                            toRect.height
                        ),
                    } as DOMRect;
                },
            },
        };
    }
});

const useMenuItems = computed(() => {
    return clearMenuItems(
        props.menuItems.filter((name) => {
            if ((!editor || !hasParentNode(editor)) && name === "selectParent") {
                return false;
            }

            return !props.disableMenuItems?.includes(name);
        })
    );
});
</script>
<style lang="scss" module>
.editor-float-menu {
    //
}
</style>
