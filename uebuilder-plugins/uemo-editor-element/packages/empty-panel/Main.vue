<!--
 * @Description: 空内容面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 12:34:59
-->
<template>
    <div :class="$style['empty-panel']" class="flex flex-col items-center justify-center">
        <slot>
            <p>{{ description }}</p>
        </slot>
    </div>
</template>
<script lang="ts" setup>
import type { UeElEmptyPanelBaseProps } from "./index";

defineOptions({ name: "UeElEmptyPanel" });
withDefaults(defineProps<UeElEmptyPanelBaseProps>(), {});
</script>
<style lang="scss" module>
.empty-panel {
    font-size: 14px;

    min-height: 200px;

    color: #666;
}
</style>
