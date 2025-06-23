<!--
 * @Description: 浮动编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-06-23 00:47:29
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

import { clearMenuItems } from "../menu-bar/helper";
import { FLOAT_MENU_BUTTON_MAP } from "./utils/helper";
import { hasParentNode } from "../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { getClosestGridItem } from "../extension-grid/utils/helper";

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

    return undefined;
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
