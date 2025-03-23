<!--
 * @Description: 测试滚动效果属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:47:35
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试滚动效果属性控制组"
    >
        <UeElScrollEffectSettingGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElScrollEffectSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElScrollEffectSettingGroupProps & { testOptionTitle?: string; value?: any })[] =
    [{ value: undefined }];
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
