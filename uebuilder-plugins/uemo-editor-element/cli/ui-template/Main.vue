<!--
 * @Description: <%- description %>
 * @Author: F-Stone
 * @LastEditTime: 2023-12-31 20:37:03
-->
<template>
    <div :class="$style['<%- className %>']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
defineOptions({ name: "UeEl<%- elementName %>" });
</script>
<style lang="scss" module>
.<%- className %> {
    //
}
</style>
