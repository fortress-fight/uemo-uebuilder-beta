<!--
 * @Description: 测试颜色控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 01:42:11
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试颜色控制器"
    >
        <UeElColorSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElColorSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElColorSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "#000000" },
    { value: "#000000", disableOpacity: true },
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
