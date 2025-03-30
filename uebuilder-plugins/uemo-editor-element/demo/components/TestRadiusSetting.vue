<!--
 * @Description: 测试圆角控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 04:42:14
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试圆角控制器"
    >
        <UeElRadiusSetting ref="radiusSetting" v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElRadiusSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElRadiusSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "10px" },
    { value: "10px 20px" },
    { value: "10px 20px 30px" },
    { value: "10px 20px 30px 40px" },
];
const testValue = ref(testValueList[testValueSelect.value]);

const radiusSettingRef = useTemplateRef("radiusSetting");

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
    requestAnimationFrame(() => {
        radiusSettingRef.value?.updateMixState();
    });
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
