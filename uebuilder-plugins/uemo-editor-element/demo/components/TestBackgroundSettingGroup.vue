<!--
 * @Description: 测试背景属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 19:10:02
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试背景属性控制组"
    >
        <UeElBackgroundSettingGroup v-bind="testValue">
            <!--  -->
        </UeElBackgroundSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBackgroundSettingGroupProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: [],
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
