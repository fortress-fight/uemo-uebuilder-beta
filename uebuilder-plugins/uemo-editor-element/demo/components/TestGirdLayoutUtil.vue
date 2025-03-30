<!--
 * @Description: 测试网格结构工具
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 11:38:49
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试网格结构工具"
    >
        <UeElGirdLayoutUtil :class="$style['test-component']" v-bind="testValue">
            <!--  -->
        </UeElGirdLayoutUtil>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElGirdLayoutUtilProps & { testOptionTitle?: string; value?: any })[] = [
    { data: "1-1-1,1-1:1/1/2/3,2/1/3/2,2/2/3/3,3/1/4/2,3/2/4/3" },
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
.test-component {
    min-width: 200px;
}
</style>
