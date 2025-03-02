<!--
 * @Description: 测试投影控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 23:06:07
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试投影控制器"
    >
        <UeElBoxShadowSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElBoxShadowSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBoxShadowSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "0 4px 4px 0 rgba(0,0,0,25%)" },
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
