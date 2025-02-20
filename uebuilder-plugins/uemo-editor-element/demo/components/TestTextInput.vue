<!--
 * @Description: 测试文本输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:25:59
-->
<template>
    <TestArea :class="$style['test-area']" :value="testValue" title="测试文本输入框">
        <UeElTextInput v-bind="testValue">
            <!--  -->
        </UeElTextInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "./TestArea.vue";

// 测试数据
const testValue = ref<UE_EL_COMPONENT.UeElTextInputProps>({
    value: "",
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
