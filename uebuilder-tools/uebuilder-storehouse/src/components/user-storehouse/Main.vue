<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:35:51
-->
<template>
    <UebuilderUserStorehouse :class="$style['user-storehouse']" />
</template>
<script lang="ts" setup>
import type { UnitUserStorehouseBaseProps } from "./index";

import UebuilderUserStorehouse from "@stone/uebuilder-storehouse-base/src/components/unit-user-storehouse";

defineOptions({ name: "UnitUserStorehouse" });
const _props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {});
</script>
<style lang="scss" module>
.user-storehouse {
    //
}
</style>
