<!--
 * @Description: 测试社交分享资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 15:48:08
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试社交分享资源面板"
    >
        <UeElShareIconLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElShareIconLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElShareIconLibraryPanelProps & { testOptionTitle?: string; select?: any })[] = [
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
