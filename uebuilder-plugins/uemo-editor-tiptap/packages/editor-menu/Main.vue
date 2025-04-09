<!--
 * @Description: 编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-09 12:05:06
-->
<template>
    <UeTiptapBubbleMenu pluginKey="editorMainMenu">
        <UeTiptapMenuBar :class="$style['editor-menu']">
            <template v-for="(item, index) in menuItems" :key="item">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="buttonMap[item]" :key="index"></component>
            </template>
        </UeTiptapMenuBar>
    </UeTiptapBubbleMenu>
</template>
<script lang="ts" setup>
import type { UeTiptapEditorMenuBaseProps } from "./index";

import BoldButton from "./sub-component/BoldButton.vue";
import ItalicButton from "./sub-component/ItalicButton.vue";
import FormattingButton from "./sub-component/FormattingButton.vue";
import TextDecorationButton from "./sub-component/TextDecorationButton.vue";
import BlockquoteButton from "./sub-component/BlockquoteButton.vue";
import LinkButton from "./sub-component/LinkButton.vue";
defineOptions({ name: "UeTiptapEditorMenu" });

const _props = withDefaults(defineProps<UeTiptapEditorMenuBaseProps>(), {
    menuItems: () => ["formatting", "|", "bold", "italic", "textDecoration", "blockquote", "link"],
});

const buttonMap: Partial<Record<UE_TIPTAP_UNIT.OperItem, Component>> = {
    bold: BoldButton,
    italic: ItalicButton,
    formatting: FormattingButton,
    textDecoration: TextDecorationButton,
    blockquote: BlockquoteButton,
    link: LinkButton,
};
</script>
<style lang="scss" module>
.editor-menu {
    //
}
</style>
