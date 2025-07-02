<!--
 * @Description: 测试Table尺寸选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 02:19:32
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Table尺寸选择器"
    >
        <UeElTableSizePicker :minSize="[0, 0]" :selection="testValue.value" @submit="handleSubmit">
            <!--  -->
        </UeElTableSizePicker>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElTableSizePickerProps & {
    testOptionTitle?: string;
    value: [number, number];
})[] = [{ value: [3, 3] }];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});

function handleSubmit(value: { rows: number; cols: number; withHeaderRow: boolean }) {
    testValue.value.value = [value.rows, value.cols];
}
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
