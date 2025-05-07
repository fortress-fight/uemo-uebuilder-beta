<!--
 * @Description: 测试编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-22 22:54:54
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试编辑工具栏"
    >
        <UeTiptapMenuBar :class="$style['editor-menu']">
            <template v-for="(item, index) in testValue.menuItems" :key="item">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="MENU_BUTTON_MAP[item]" :key="index"></component>
            </template>
        </UeTiptapMenuBar>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";
import { MENU_BUTTON_MAP } from "~/packages/editor-menu/utils/helper";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapEditorMenuProps & { testOptionTitle?: string; value?: any })[] = [
    {
        menuItems: [
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
    },
];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
