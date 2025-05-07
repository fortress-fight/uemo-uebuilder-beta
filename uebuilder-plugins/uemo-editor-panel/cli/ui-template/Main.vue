<!--
 * @Description: <%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:21:12
-->
<template>
    <div :class="$style['<%- className %>']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeEditorPanel<%- elementName %>BaseProps } from "./index";

defineOptions({ name: "UeEditorPanel<%- elementName %>" });
const prop = withDefaults(defineProps<UeEditorPanel<%- elementName %>BaseProps>(), {});
</script>
<style lang="scss" module>
.<%- className %> {
    //
}
</style>
