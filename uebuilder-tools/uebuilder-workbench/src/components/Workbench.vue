<template>
    <UebuilderWorkbench>
        <template #workbenchBrowsingLayout>
            <UebuilderWorkbenchBrowsingLayout />
        </template>
        <template #workbenchEditingLayout>
            <UebuilderWorkbenchEditingLayout />
        </template>
    </UebuilderWorkbench>
</template>
<script lang="ts" setup>
import UebuilderWorkbench from "@stone/uebuilder-workbench-base/src/components/Workbench.vue";
import UebuilderWorkbenchBrowsingLayout from "./WorkbenchBrowsingLayout.vue";
import UebuilderWorkbenchEditingLayout from "./workbench-editing-layout";
</script>
<style lang="scss" module>
.workbench-app {
    // init
}
</style>
