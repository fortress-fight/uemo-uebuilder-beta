<!--
 * @Description: 测试<%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:20:34
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试<%- description %>"
    >
        <UeEditorPanel<%- elementName %> v-bind="testValue">
            <!--  -->
        </UeEditorPanel<%- elementName %>>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList:(UE_EDITOR_PANEL_COMPONENT.UeEditorPanel<%- elementName %>Props & {testOptionTitle?: string; value?: any})[] = [{}];
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
