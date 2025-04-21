<!--
 * @Description: 编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-21 18:03:54
-->
<template>
    <UeTiptapBubbleMenu pluginKey="editorMainMenu">
        <UeTiptapMenuBar :class="$style['editor-menu']">
            <template v-for="(item, index) in menuItems" :key="item">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="MENU_BUTTON_MAP[item]" :key="index"></component>
            </template>
        </UeTiptapMenuBar>
    </UeTiptapBubbleMenu>
</template>
<script lang="ts" setup>
import type { UeTiptapEditorMenuBaseProps } from "./index";

import { MENU_BUTTON_MAP } from "./utils/helper";

defineOptions({ name: "UeTiptapEditorMenu" });

const _props = withDefaults(defineProps<UeTiptapEditorMenuBaseProps>(), {
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
    ],
});
</script>
<style lang="scss" module>
.editor-menu {
    //
}
</style>
