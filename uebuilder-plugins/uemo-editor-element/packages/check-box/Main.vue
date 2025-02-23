<!--
 * @Description: 单选框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:56:20
-->
<template>
    <div :class="$style['check-box']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeElCheckBoxBaseProps } from "./index";

interface Props extends UeElCheckBoxBaseProps {}

defineOptions({ name: "UeElCheckBox" });
const _prop = defineProps<Props>();
</script>
<style lang="scss" module>
.check-box {
    //
}
</style>
