<!--
 * @Description: <%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:24:35
-->
<template>
    <div :class="$style['<%- className %>']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeEl<%- elementName %>BaseProps } from "./index";

interface Props extends UeEl<%- elementName %>BaseProps {}

defineOptions({ name: "UeEl<%- elementName %>" });
const prop = defineProps<Props>();
</script>
<style lang="scss" module>
.<%- className %> {
    //
}
</style>
