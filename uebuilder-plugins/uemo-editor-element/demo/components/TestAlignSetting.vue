<!--
 * @Description: 测试Align设置
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 04:18:49
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Align设置"
    >
        <UeElAlignSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElAlignSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElAlignSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { type: "xy", value: "left top" },
    { type: "x", value: "left" },
    { type: "y", value: "top" },
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
