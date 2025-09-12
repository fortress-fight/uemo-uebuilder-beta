<!--
 * @Description: Uemo 库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 18:12:50
-->
<template>
    <UebuilderUemoStorehouse :class="$style['uemo-storehouse']" />
</template>
<script lang="ts" setup>
import type { UemoStorehouseBaseProps } from "./index";

import UebuilderUemoStorehouse from "@stone/uebuilder-storehouse-base/src/components/unit-uemo-storehouse";

defineOptions({ name: "UemoStorehouse" });
const _props = withDefaults(defineProps<UemoStorehouseBaseProps>(), {});
</script>
<style lang="scss" module>
.uemo-storehouse {
    //
}
</style>
