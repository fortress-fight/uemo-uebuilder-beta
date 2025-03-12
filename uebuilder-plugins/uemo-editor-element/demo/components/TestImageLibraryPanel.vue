<!--
 * @Description: 测试图片资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 19:25:18
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试图片资源面板"
    >
        <UeElImageLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElImageLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElImageLibraryPanelProps & { testOptionTitle?: string; select?: any })[] = [
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
