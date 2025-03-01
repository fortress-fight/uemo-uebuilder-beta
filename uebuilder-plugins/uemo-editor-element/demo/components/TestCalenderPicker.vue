<!--
 * @Description: 测试日历选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:29:12
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试日历选择器"
    >
        <UeElCalenderPicker v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElCalenderPicker>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElCalenderPickerProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: new Date(),
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
