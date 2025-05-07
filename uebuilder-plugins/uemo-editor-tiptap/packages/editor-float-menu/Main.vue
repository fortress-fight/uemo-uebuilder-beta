<!--
 * @Description: 浮动编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 11:02:13
-->
<template>
    <UeTiptapFloatingMenu type="floatingMenu" :plugin-key="pluginKey" :should-show="shouldShow" ref="floatingMenuRef">
        <UeTiptapMenuBar :class="$style['editor-menu']" :title="title">
            <template v-for="(item, index) in useMenuItems" :key="index">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="FLOAT_MENU_BUTTON_MAP[item]" :key="index" />
            </template>
        </UeTiptapMenuBar>
    </UeTiptapFloatingMenu>
</template>
<script lang="ts" setup>
import type { UeTiptapEditorFloatMenuBaseProps } from "./index";

import { clearMenuItems } from "../menu-bar/helper";
import { FLOAT_MENU_BUTTON_MAP } from "./utils/helper";
import { hasParentNode } from "../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../utils/mixin-tiptap-editor";

defineOptions({ name: "UeTiptapEditorFloatMenu" });

const { editor } = useInjectTiptapEditor();

const props = withDefaults(defineProps<UeTiptapEditorFloatMenuBaseProps>(), {
    disableMenuItems: () => [],
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
