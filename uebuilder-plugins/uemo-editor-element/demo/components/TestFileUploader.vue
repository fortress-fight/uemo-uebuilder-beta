<!--
 * @Description: 测试文件上传
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 13:49:15
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试文件上传"
    >
        <UeElFileUploader v-bind="testValue" @submit="testValue.value = $event"></UeElFileUploader>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElFileUploaderProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "", accept: "*" },
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
