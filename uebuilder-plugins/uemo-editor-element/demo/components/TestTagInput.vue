<!--
 * @Description: 测试标签输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 11:24:28
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试标签输入框"
    >
        <UeElTagInput v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElTagInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElTagInputProps & { testOptionTitle?: string; value?: any })[] = [
    { value: [] },
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
