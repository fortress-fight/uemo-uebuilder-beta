<!--
 * @Description: 测试字号控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-16 13:07:29
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试字号控制器"
    >
        <UeElFontSizeSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElFontSizeSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElFontSizeSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "12px" },
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
