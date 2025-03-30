<!--
 * @Description: 测试投影控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:53:14
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试投影控制器组"
    >
        <UeElBoxShadowSettingGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElBoxShadowSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBoxShadowSettingGroupProps & { testOptionTitle?: string; value?: any })[] = [
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
