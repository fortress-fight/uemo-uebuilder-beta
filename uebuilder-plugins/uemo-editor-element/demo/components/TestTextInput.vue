<!--
 * @Description: 测试文本输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 00:41:43
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试文本输入框"
    >
        <UeElTextInput v-bind="testValue" @confirm="testValue.value = $event">
            <!--  -->
        </UeElTextInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: UE_EL_COMPONENT.UeElTextInputProps[] = [
    { value: "测试文本输入框", required: true, label: "测试文本输入框" },
    { value: "测试文本输入框", required: true, type: "textarea", label: "测试文本输入框" },
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
