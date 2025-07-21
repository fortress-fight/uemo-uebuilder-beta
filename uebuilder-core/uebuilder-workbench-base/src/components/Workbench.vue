<template>
    <div :class="$style['uebuilder-workbench']" class="flex flex-col h-full overflow-hidden">
        <!-- 即将编辑 -->
        <WorkbenchEntryLayout v-if="workbenchState.stage === 'entry'" />

        <!-- 工作台 -->
        <slot name="workbenchBrowsingLayout" v-else-if="workbenchState.stage === 'browsing'"></slot>

        <!-- 编辑 -->
        <slot name="workbenchEditingLayout" v-else-if="workbenchState.stage === 'editing'"></slot>

        <!-- 预览 -->
        <slot name="workbenchPreviewLayout" v-else-if="workbenchState.stage === 'preview'"></slot>

        <!-- 极速构建 -->
        <slot name="workbenchComposerLayout" v-else-if="workbenchState.stage === 'composer'"></slot>
    </div>
</template>
<script lang="ts" setup>
import { useUeBuilderWorkbenchStore } from "../store/store-workbench";
import WorkbenchEntryLayout from "./WorkbenchEntryLayout.vue";

defineOptions({ name: "UebuilderWorkbench" });

const workbenchStore = useUeBuilderWorkbenchStore();

const workbenchState = computed(() => workbenchStore.workbenchState);
</script>
<style lang="scss" module>
.uebuilder-workbench {
    // init
}
</style>
