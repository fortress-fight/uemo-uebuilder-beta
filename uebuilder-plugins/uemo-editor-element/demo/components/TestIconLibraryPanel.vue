<!--
 * @Description: 测试图库库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 00:56:13
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试图库库面板"
    >
        <UeElIconLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElIconLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElIconLibraryPanelProps & {
    testOptionTitle?: string;
    select?: UE_EL_UTIL.ResourceIconAttrs;
})[] = [
    {
        select: {
            name: "chart-proportion",
            source: "https://static.jsmo.xin/uebuilder/public-resource/svg-icon/icon-park/charts/charts.js",
        },
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
