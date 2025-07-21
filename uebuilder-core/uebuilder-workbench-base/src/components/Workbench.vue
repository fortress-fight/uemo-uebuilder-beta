<template>
    <div :class="$style['uebuilder-workbench']" class="flex flex-col h-full overflow-hidden">
        <WorkbenchEntryLayout />
    </div>
</template>
<script lang="ts" setup>
import WorkbenchEntryLayout from "./WorkbenchEntryLayout.vue";
</script>
<style lang="scss" module>
.uebuilder-workbench {
    // init
}
</style>
