<!--
 * @Description: 测试单选框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:52:56
-->
<template>
    <TestArea :class="$style['test-area']" :value="testValue" title="测试单选框">
        <UeElCheckBox v-bind="testValue">
            <!--  -->
        </UeElCheckBox>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElCheckBoxProps & { value?: any })[] = [];
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
