<!--
 * @Description: 测试宽度控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:50:22
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试宽度控制器组"
    >
        <UeElWidthSettingGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElWidthSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElWidthSettingGroupProps & { testOptionTitle?: string; value?: any })[] = [
    { value: undefined },
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
