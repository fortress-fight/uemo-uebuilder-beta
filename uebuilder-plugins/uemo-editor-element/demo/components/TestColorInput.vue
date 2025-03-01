<!--
 * @Description: 测试颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 23:31:02
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试颜色输入框"
    >
        <UeElColorInput v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElColorInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElColorInputProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "#000000" },
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
