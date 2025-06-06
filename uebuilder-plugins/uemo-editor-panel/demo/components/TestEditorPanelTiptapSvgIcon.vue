<!--
 * @Description: 测试Tiptap SvgIcon 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:21:24
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试 Tiptap SvgIcon 操作面板"
    >
        <UeEditorPanelTiptapSvgIcon v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapSvgIcon>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapSvgIconProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.SvgIcon["attrs"];
})[] = [{ value: { name: "", source: "", color: "#333" } }];
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
