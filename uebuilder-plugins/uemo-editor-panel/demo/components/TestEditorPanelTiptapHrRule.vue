<!--
 * @Description: 测试分割线控制面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 02:06:59
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试分割线控制面板"
    >
        <UeEditorPanelTiptapHrRule v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapHrRule>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapHrRuleProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.HrRule["attrs"];
})[] = [{ value: { height: "30px" } }];
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
