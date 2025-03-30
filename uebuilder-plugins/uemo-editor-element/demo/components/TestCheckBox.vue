<!--
 * @Description: 测试单选框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 00:37:14
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试单选框"
    >
        <UeElCheckBox v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElCheckBox>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElCheckBoxProps & { value?: any })[] = [
    { value: false, text: "测试单选框", label: "测试单选框" },
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
