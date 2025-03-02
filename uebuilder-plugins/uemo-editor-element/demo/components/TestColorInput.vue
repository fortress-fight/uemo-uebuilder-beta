<!--
 * @Description: 测试颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:35:45
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试颜色输入框"
    >
        <UeElColorInput v-bind="testValue" v-model:value="testValue.value" v-model:opacity="testValue.opacity">
            <!--  -->
        </UeElColorInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElColorInputProps & {
    testOptionTitle?: string;
    value?: any;
    opacity?: number;
})[] = [
    { value: "#000000" },
    { value: "linear-gradient(135deg, #FEB692 0%, #EA5455 100%)", type: "linearGradient", opacity: 0.5 },
    {
        value: "radial-gradient(100% 100% ellipse at 50% 50%, #FEB692 0%, #EA5455 100%)",
        type: "radialGradient",
        opacity: 1,
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
