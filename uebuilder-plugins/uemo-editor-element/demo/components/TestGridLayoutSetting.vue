<!--
 * @Description: 测试网格属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 22:54:26
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试网格属性控制器"
    >
        <UeElGridLayoutSetting v-bind="testValue" v-model:value="testValue.value" v-model:zIndex="testValue.zIndexData">
            <!--  -->
        </UeElGridLayoutSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElGridLayoutSettingProps & {
    testOptionTitle?: string;
    value?: any;
    zIndexData?: string;
})[] = [
    {
        value: "1-1,1-1-1:1/1/3/2,1/2/2/4,2/2/3/4",
        withReplace: true,
        enableZIndexMode: true,
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
