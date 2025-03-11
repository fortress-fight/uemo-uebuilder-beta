<!--
 * @Description: 测试Lottie 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-11 12:14:09
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试 Lottie 库面板"
    >
        <UeElLottieLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElLottieLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElLottieLibraryPanelProps & { testOptionTitle?: string; select: string })[] = [
    { select: "" },
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
