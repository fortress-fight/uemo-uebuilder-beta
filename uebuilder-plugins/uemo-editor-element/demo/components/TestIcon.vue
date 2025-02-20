<!--
 * @Description: 测试字体图标
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:25:32
-->
<template>
    <TestArea :class="$style['test-area']" :value="testValue" title="测试字体图标">
        <UeElIcon v-bind="testValue">
            <!--  -->
        </UeElIcon>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValue = ref<UE_EL_COMPONENT.UeElIconProps>({
    name: "icon-editor-copy",
    size: 24,
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
