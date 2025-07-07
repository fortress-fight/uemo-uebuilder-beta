<!--
 * @Description: 测试文字设置组
 * @Author: F-Stone
 * @LastEditTime: 2025-07-08 01:31:02
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试文字设置组"
    >
        <UeElTextSettingGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElTextSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElTextSettingGroupProps & { testOptionTitle?: string; value: string })[] = [
    { value: "" },
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
