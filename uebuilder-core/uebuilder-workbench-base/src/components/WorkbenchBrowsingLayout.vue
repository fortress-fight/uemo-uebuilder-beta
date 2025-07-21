<template>
    <div :class="$style['workbench-browsing-layout']" class="grid h-full">
        <div :class="$style['layout-head']" class="grid items-center">
            <div class="state--pos-left justify-self-start h-full flex items-center">
                <slot name="headLeft"></slot>
            </div>
            <div class="state--pos-center justify-self-center h-full flex items-center">
                <slot name="headCenter"></slot>
            </div>
            <div class="state--pos-right justify-self-end h-full flex items-center">
                <slot name="headRight"></slot>
            </div>
        </div>
        <div class="layout-body">
            <iframe :class="$style['frame--uebuilder-storehouse']" :src="appStorehouseSrc"></iframe>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUeBuilderWorkbenchStore } from "../store/store-workbench";

const workbenchStore = useUeBuilderWorkbenchStore();

const appStorehouseSrc = computed(() => workbenchStore.workbenchConfig.workbenchPath + "uebuilder-storehouse/");
</script>
<style lang="scss" module>
.workbench-browsing-layout {
    position: relative;
    z-index: 1;

    min-width: 1100px;

    grid-template-rows: 50px 1fr;
    .layout-head {
        position: relative;
        z-index: 10;

        padding: 0 20px;

        border-bottom: 1px solid var(--editor-c-border--lighter);

        grid-template-columns: 300px 1fr 300px;
    }
}
</style>
