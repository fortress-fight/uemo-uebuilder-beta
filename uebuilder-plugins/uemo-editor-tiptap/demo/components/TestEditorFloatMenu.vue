<!--
 * @Description: 测试浮动编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-05-06 12:12:50
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试浮动编辑工具栏"
    >
        <UeTiptapMenuBar :class="$style['editor-menu']" :title="testValue.title">
            <template v-for="(item, index) in testValue.menuItems" :key="index">
                <UeTiptapMenuDivideLine v-if="item === '|'" />
                <component v-else :is="FLOAT_MENU_BUTTON_MAP[item]" :key="index" />
            </template>
        </UeTiptapMenuBar>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";
import { FLOAT_MENU_BUTTON_MAP } from "~/packages/menu/editor-floating-menu/utils/helper";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: ({ menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[]; title?: string } & {
    testOptionTitle?: string;
    value?: any;
})[] = [
    {
        testOptionTitle: "按钮工具栏",
        title: "按钮",
        menuItems: [
            "editor",
            "|",
            "insertNewLineBefore",
            "insertNewLineAfter",
            "selectParent",
            "|",
            "add",
            "|",
            "deleteNode",
            "|",
            "moreOper",
        ],
    },
    {
        testOptionTitle: "按钮组工具栏",
        title: "按钮组",
        menuItems: ["editor", "|", "insertNewLineBefore", "insertNewLineAfter", "selectParent", "|", "deleteNode"],
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
