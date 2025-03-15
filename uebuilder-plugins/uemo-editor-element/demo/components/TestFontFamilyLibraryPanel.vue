<!--
 * @Description: 测试字体库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 18:18:37
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试字体库面板"
    >
        <UeElFontFamilyLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElFontFamilyLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElFontFamilyLibraryPanelProps & {
    testOptionTitle?: string;
    select: string;
})[] = [{ select: "" }];
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
