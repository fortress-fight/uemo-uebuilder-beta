<!--
 * @Description: 菜单分割线
 * @Author: F-Stone
 * @LastEditTime: 2025-04-06 03:16:28
-->
<template>
    <div :class="$style['menu-divide-line']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptapMenuDivideLineBaseProps } from "./index";

defineOptions({ name: "UeTiptapMenuDivideLine" });
const _props = withDefaults(defineProps<UeTiptapMenuDivideLineBaseProps>(), {});
</script>
<style lang="scss" module>
.menu-divide-line {
    width: 1px;

    background-color: #f2f2f2;
}
</style>
