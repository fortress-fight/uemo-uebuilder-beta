<!--
 * @Description: 测试Tiptap表格编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 13:19:00
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Tiptap表格编辑面板"
    >
        <UeEditorPanelTiptapTable v-bind="testValue">
            <!--  -->
        </UeEditorPanelTiptapTable>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapTableProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.Table["attrs"];
})[] = [
    {
        value: { minWidth: "100px", tableBorder: true, tableBorderColor: "#000" },
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
