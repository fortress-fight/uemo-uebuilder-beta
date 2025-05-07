<!--
 * @Description: <%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2025-03-31 23:49:24
-->
<template>
    <div :class="$style['<%- className %>']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptap<%- elementName %>BaseProps } from "./index";

defineOptions({ name: "UeTiptap<%- elementName %>" });
const prop = withDefaults(defineProps<UeTiptap<%- elementName %>BaseProps>(), {});
</script>
<style lang="scss" module>
.<%- className %> {
    //
}
</style>
