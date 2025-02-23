<!--
 * @Description: 测试<%- description %>
 * @Author: F-Stone
 * @LastEditTime: <%= date %>
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :value="testValue"
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
const testValue = ref<UE_EL_COMPONENT.UeEl<%- elementName %>Props>({
    //
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
