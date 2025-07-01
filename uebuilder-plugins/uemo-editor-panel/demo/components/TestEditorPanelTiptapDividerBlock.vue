<!--
 * @Description: 测试分隔块的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 01:02:08
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试分隔块的编辑面板"
    >
        <UeEditorPanelTiptapDividerBlock v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapDividerBlock>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapDividerBlockProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.DividerBlock["attrs"];
})[] = [{ value: { size: "20px", mdSize: "20px" } }];
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
