<!--
 * @Description: <%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:21:07
-->
<template>
    <div :class="$style['<%- className %>']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeEl<%- elementName %>BaseProps } from "./index";

defineOptions({ name: "UeEl<%- elementName %>" });
const prop = withDefaults(defineProps<UeEl<%- elementName %>BaseProps>(), {});
</script>
<style lang="scss" module>
.<%- className %> {
    //
}
</style>
