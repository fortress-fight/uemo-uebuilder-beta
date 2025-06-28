<!--
 * @Description: 测试网格单元编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 03:10:10
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试网格单元编辑面板"
    >
        <UeEditorPanelTiptapGridItem v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapGridItem>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapGridItemProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.GridItem["attrs"];
})[] = [{ value: { padding: "0px" } }];
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
