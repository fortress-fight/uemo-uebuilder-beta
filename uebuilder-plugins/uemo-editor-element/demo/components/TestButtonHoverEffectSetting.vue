<!--
 * @Description: 测试按钮hover效果属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 02:24:32
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试按钮hover效果属性控制"
    >
        <UeElButtonHoverEffectSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElButtonHoverEffectSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElButtonHoverEffectSettingProps & { testOptionTitle?: string; value?: any })[] =
    [{ value: "" }];
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
