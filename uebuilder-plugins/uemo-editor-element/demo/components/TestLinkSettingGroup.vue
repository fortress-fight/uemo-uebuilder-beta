<!--
 * @Description: 测试链接属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 17:43:37
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试链接属性控制组"
    >
        <UeElLinkSettingGroup v-bind="testValue">
            <!--  -->
        </UeElLinkSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElLinkSettingGroupProps & { testOptionTitle?: string; value?: any })[] = [{}];
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
