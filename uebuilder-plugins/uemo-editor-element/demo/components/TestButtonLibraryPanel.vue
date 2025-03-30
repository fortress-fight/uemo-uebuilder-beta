<!--
 * @Description: 测试按钮库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 23:42:53
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试按钮库面板"
    >
        <UeElButtonLibraryPanel v-bind="testValue" @update:select="changeSelect">
            <!--  -->
        </UeElButtonLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElButtonLibraryPanelProps & {
    testOptionTitle?: string;
    select?: UE_EL_UTIL.ResourceButtonItem["attrs"];
})[] = [{}];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});

const changeSelect = (buttonParam?: UE_EL_UTIL.ResourceButtonItem["attrs"]) => {
    testValue.value.select = buttonParam;
};
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
