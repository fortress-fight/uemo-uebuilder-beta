<!--
 * @Description: 测试<%- description %>
 * @Author: F-Stone
 * @LastEditTime: <%= date %>
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试<%- description %>"
    >
        <UeEl<%- elementName %> v-bind="testValue">
            <!--  -->
        </UeEl<%- elementName %>>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList:(UE_EL_COMPONENT.UeEl<%- elementName %>Props & {value?: any})[] = [];
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
