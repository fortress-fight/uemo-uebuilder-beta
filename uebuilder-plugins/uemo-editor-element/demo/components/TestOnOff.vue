<!--
 * @Description: 测试开关
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:28:27
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试开关"
    >
        <UeElOnOff v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElOnOff>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElOnOffProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: false,
        label: "测试开关",
        icon: "icon-app-lock",
        activeIcon: "icon-app-unlock",
    },
    {
        value: "开",
        label: "测试开关",
        activeValue: "开",
        inactiveValue: "关",
        icon: "icon-gaodu",
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
