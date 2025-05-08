<!--
 * @Description: 测试tiptap 按钮组编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-08 10:36:14
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试 tiptap 按钮组编辑面板"
    >
        <UeEditorPanelTiptapButtonRow v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapButtonRow>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapButtonRowProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.ButtonRow["attrs"];
})[] = [{ value: { dir: "row", gap: "10px", width: "100px" } }];
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
