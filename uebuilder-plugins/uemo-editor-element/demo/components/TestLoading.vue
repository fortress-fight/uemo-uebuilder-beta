<!--
 * @Description: 测试加载Loading
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:34:47
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试加载Loading"
    >
        <UeElLoading v-bind="testValue" ref="UeElLoadingRef">
            <!--  -->
        </UeElLoading>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: UE_EL_COMPONENT.UeElLoadingProps[] = [
    { fake: true, progress: "0", duration: 5 },
    { fake: true, progress: "0", duration: 5, message: false },
];
const testValue = ref(testValueList[testValueSelect.value]);

const UeElLoadingRef = useTemplateRef("UeElLoadingRef");

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
    UeElLoadingRef.value?.reset();
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
