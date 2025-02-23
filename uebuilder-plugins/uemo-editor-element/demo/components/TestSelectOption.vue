<!--
 * @Description: 测试选项面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 21:55:13
-->
<template>
    <TestArea :class="$style['test-area']" :value="testValue" title="测试选项面板">
        <UeElSelectOption v-bind="testValue">
            <!--  -->
        </UeElSelectOption>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValue = ref<UE_EL_COMPONENT.UeElSelectOptionProps>({
    hideIcon: true,
    list: [
        { value: "1", text: "选项1" },
        { value: "2", text: "选项2" },
        { value: "3", text: "选项3" },
    ],
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
