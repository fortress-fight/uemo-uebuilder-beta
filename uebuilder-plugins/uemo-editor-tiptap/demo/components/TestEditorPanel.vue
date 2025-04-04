<!--
 * @Description: 测试编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 15:31:01
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试编辑面板"
    >
        无法测试
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapEditorPanelProps & { testOptionTitle?: string; value?: any })[] = [
    { value: {} },
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
