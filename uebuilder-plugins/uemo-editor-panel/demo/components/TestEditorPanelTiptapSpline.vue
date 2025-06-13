<!--
 * @Description: 测试Spline 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-13 10:30:27
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Spline 操作面板"
    >
        <UeEditorPanelTiptapSpline v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapSpline>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapSplineProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.Spline["attrs"];
})[] = [
    {
        value: {
            url: "https://static.jsmo.xin/uebuilder/public-resource/spline/zujian/spline003.splinecode",
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
