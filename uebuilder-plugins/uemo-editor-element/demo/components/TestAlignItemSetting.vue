<!--
 * @Description: 测试纵向排版控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:02:30
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试纵向排版控制器"
    >
        <UeElAlignItem v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElAlignItem>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElAlignItemSettingProps & { testOptionTitle?: string; value?: any })[] = [
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
