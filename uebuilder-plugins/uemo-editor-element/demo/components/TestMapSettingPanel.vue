<!--
 * @Description: 测试地图设置面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 00:54:29
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试地图设置面板"
    >
        <UeElMapSettingPanel
            v-bind="testValue"
            @cancel="testValue.value = undefined"
            @confirm="testValue.value = $event"
        >
            <!--  -->
        </UeElMapSettingPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElMapSettingPanelProps & { testOptionTitle?: string; value?: any })[] = [
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
