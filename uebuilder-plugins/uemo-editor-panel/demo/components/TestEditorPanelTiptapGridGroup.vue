<!--
 * @Description: 测试网格组编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 01:29:42
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试网格组编辑器"
    >
        <UeEditorPanelTiptapGridGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapGridGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapGridGroupProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.GridGroup["attrs"];
})[] = [
    {
        value: {
            grid: "1-1,1-1-1:1/1/3/2,1/2/2/4,2/2/3/4",
            width: "100%",
            gap: "10px",
            padding: "0px",
            mdGap: "10px",
            mdGrid: "auto-auto-auto,1:1/1/2/2,2/1/3/2,3/1/4/2",
        },
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
