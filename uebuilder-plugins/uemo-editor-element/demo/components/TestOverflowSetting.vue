<!--
 * @Description: 测试裁切设置
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 03:01:13
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试裁切设置"
    >
        <UeElOverflowSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElOverflowSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElOverflowSettingProps & { testOptionTitle?: string; value: boolean })[] = [
    { value: true },
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
