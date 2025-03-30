<!--
 * @Description: 测试资源库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 03:57:47
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试资源库面板"
    >
        <UeElLibraryPanel v-bind="testValue">
            <template #Tab1> <div>Tab1</div> </template>
            <template #Tab2> <div>Tab2</div> </template>
            <template #Tab3> <div>Tab3</div> </template>
        </UeElLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElLibraryPanelProps & { testOptionTitle?: string; value?: any })[] = [
    {
        defaultCard: "Tab2",
        cards: [
            { title: "Tab 1", name: "Tab1" },
            { title: "Tab 2", name: "Tab2" },
            { title: "Tab 3", name: "Tab3" },
        ],
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
