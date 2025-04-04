<!--
 * @Description: 测试编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 04:06:00
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试编辑工具栏"
    >
        <UeTiptapEditorMenu v-bind="testValue">
            <!--  -->
        </UeTiptapEditorMenu>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapEditorMenuProps & { testOptionTitle?: string; value?: any })[] = [];
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
