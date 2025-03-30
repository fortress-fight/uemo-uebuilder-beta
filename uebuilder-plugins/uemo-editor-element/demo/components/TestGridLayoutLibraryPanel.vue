<!--
 * @Description: 测试网格结构库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 12:20:33
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试网格结构库面板"
    >
        <UeElGridLayoutLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElGridLayoutLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElGridLayoutLibraryPanelProps & {
    testOptionTitle?: string;
    select?: string;
})[] = [{ select: "1,1:1/1/2/2" }, { select: "1-1,1-1:1/1/2/2,2/1/3/2,1/2/3/3" }];
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
