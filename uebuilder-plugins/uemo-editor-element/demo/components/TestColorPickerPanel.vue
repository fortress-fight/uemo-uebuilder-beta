<!--
 * @Description: 测试颜色选择器面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 16:37:26
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试颜色选择器面板"
    >
        <UeElColorPickerPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElColorPickerPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElColorPickerPanelProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "radial-gradient(100% 100% ellipse at 52% 76%, rgba(0, 17, 255, 0.56) 59%, rgba(0, 0, 0, 0) 71%)" },
    { value: "#000000" },
    { value: "#000000", type: "mixin" },
    { value: "linear-gradient(90deg, #000 0%, rgba(0,0,0,0) 100%)" },
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
