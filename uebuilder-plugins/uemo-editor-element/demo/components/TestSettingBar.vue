<!--
 * @Description: 测试设置工具条
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:11:40
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试设置工具条"
    >
        <UeElSettingBar v-bind="testValue">
            <!--  -->
        </UeElSettingBar>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElSettingBarProps & { testOptionTitle?: string })[] = [
    { infoText: "测试信息文本", title: "测试标题", label: "测试提示信息" },
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
