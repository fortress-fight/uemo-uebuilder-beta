<!--
 * @Description: 测试提示组
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:57:30
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试提示组"
    >
        <UeElTipGroup v-bind="testValue">
            <!--  -->
        </UeElTipGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: UE_EL_COMPONENT.UeElTipGroupProps[] = [
    {
        tips: [
            "1. 由于 Spline 特效的复杂性，会消耗较多的电脑性能，建议使用数量不要超过 2 个。",
            "2. 由于 Spline 加载需要一段时间，切换时请耐心等待一下。",
        ],
    },
    {
        type: "warn",
        tips: [
            '<span data-ue-tip-color="red">1. 由于 Spline 特效的复杂性，会消耗较多的电脑性能，建议使用数量不要超过 2 个。</span>',
            '<span data-ue-tip-color="blue">2. 由于 Spline 加载需要一段时间，切换时请耐心等待一下。</span>',
        ],
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
