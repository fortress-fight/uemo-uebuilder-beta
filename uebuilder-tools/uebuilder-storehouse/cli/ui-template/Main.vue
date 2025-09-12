<!--
 * @Description: <%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:42
-->
<template>
    <div :class="$style['<%- className %>']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { <%- componentName %>BaseProps } from "./index";

defineOptions({ name: "<%- componentName %>" });
const _props = withDefaults(defineProps<<%- componentName %>BaseProps>(), {});
</script>
<style lang="scss" module>
.<%- className %> {
    //
}
</style>
