<!--
 * @Description: 测试文本输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 18:16:00
-->
<template>
    <TestArea :class="$style['test-area']" :value="testValue" title="测试文本输入框">
        <UeElTextInput v-bind="testValue" @confirm="testValue.value = $event">
            <!--  -->
        </UeElTextInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "./TestArea.vue";

const _testProps1: UE_EL_COMPONENT.UeElTextInputProps = {
    value: "",
    required: true,
    label: "测试文本输入框",
};
const _testProps2: UE_EL_COMPONENT.UeElTextInputProps = {
    value: "",
    required: true,
    type: "textarea",
    label: "测试文本输入框",
};

// 测试数据
const testValue = ref<UE_EL_COMPONENT.UeElTextInputProps>(_testProps2);
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
