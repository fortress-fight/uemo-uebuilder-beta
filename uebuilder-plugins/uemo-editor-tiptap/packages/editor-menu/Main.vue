<!--
 * @Description: 编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 11:22:02
-->
<template>
    <UeTiptapBubbleMenu pluginKey="editorMainMenu" :isNodeMenu="isNodeMenu">
        <UeTiptapMenuBar :class="$style['editor-menu']">
            <template v-for="(item, index) in useMenuItems" :key="item">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="MENU_BUTTON_MAP[item]" :key="index"></component>
            </template>
        </UeTiptapMenuBar>
    </UeTiptapBubbleMenu>
</template>
<script lang="ts" setup>
import type { UeTiptapEditorMenuBaseProps } from "./index";

import { isNodeSelection } from "@tiptap/core";

import { MENU_BUTTON_MAP, nodeMenuMap } from "./utils/helper";
import { clearMenuItems } from "../menu-bar/helper";
import { getDeviceStorage } from "../extension-device/helper";
import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";
defineOptions({ name: "UeTiptapEditorMenu" });

const { editor } = useInjectTiptapEditor();
const props = withDefaults(defineProps<UeTiptapEditorMenuBaseProps>(), {
    menuItems: () => [
        "formatting",
        "|",
        "bold",
        "italic",
        "textDecoration",
        "blockquote",
        "link",
        "fontSize",
        "fontFamily",
        "textColor",
        "textAlign",
        "lineHeight",
        "letterSpacing",
        "|",
        "editorAI",
    ],
});

const isNodeMenu = computed(() => {
    if (!editor) return false;

    const { selection } = editor.state;

    return isNodeSelection(selection);
});

const useMenuItems = computed<(UE_TIPTAP_UNIT.OperItem | "|")[]>(() => {
    if (!editor) return [];

    const deviceStorage = getDeviceStorage(editor);
    const { selection } = editor.state;

    if (deviceStorage?.device !== "pc") {
        return ["fontSize", "fontScale", "textAlign"];
    }

    if (isNodeSelection(selection)) {
        return nodeMenuMap[selection.node.type.name] || [];
    }

    const filterMenuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] =
        props.menuItems.filter((item) => {
            if (item != "|" && props.excludeMenuItems?.includes(item)) {
                return false;
            }
            if (deviceStorage?.device === "pc") {
                return item !== "fontScale";
            }
            return true;
        }) || [];

    return clearMenuItems(filterMenuItems);
});
</script>
<style lang="scss" module>
.editor-menu {
    //
}
</style>
