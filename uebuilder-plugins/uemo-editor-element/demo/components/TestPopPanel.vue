<!--
 * @Description: 测试弹窗组件
 * @Author: F-Stone
 * @LastEditTime: 2025/2/23 02:30:18
-->
<template>
    <TestArea :class="$style['test-area']" :value="testValue" title="测试弹窗组件">
        <UeElPopPanel v-bind="testValue">
            <!--  -->
        </UeElPopPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValue = ref({
    //
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
