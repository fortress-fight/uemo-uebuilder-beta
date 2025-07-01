<!--
 * @Description: 测试SvgView 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-12 00:39:33
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试SvgView 编辑面板"
    >
        <UeEditorPanelTiptapSvgView v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapSvgView>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapSvgViewProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.SvgView["attrs"];
})[] = [
    {
        value: {
            url: "http://127.0.0.1:9005/uploads/1749658744495.svg",
            ratio: "1:1",
            align: "center",
            md: {},
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
