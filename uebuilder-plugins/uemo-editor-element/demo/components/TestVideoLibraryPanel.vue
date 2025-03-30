<!--
 * @Description: 测试视频库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 14:36:58
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试视频库面板"
    >
        <UeElVideoLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElVideoLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElVideoLibraryPanelProps & { testOptionTitle?: string; select?: any })[] = [
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
