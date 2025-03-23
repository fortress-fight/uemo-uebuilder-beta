<!--
 * @Description: 测试链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:26:43
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试链接属性控制器"
    >
        <UeElLinkSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElLinkSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElLinkSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: { type: "link", link: "https://www.baidu.com", target: "_blank" } },
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
