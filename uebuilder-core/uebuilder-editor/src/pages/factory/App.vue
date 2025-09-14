<template>
    <div :class="$style['uebuilder-editor-factory']">
        {{ store.editorFactoryData }}
    </div>
</template>
<script lang="ts" setup>
import { useUeBuilderEditorFactoryStore } from "./store/store-editor-factory";

const store = useUeBuilderEditorFactoryStore();
</script>
<style lang="scss" module>
.uebuilder-editor-factory {
    // init
}
</style>
