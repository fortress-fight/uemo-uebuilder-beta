<template>
    <BackgroundItemInner v-model:value="valueRef" title="Svg" :use-opacity="true">
        <template #preview>
            <div :class="$style['preview']" class="flex items-center justify-center">
                <ue-svg-viewer v-if="svg" :class="$style['preview-inner']" :src="svg" />
            </div>
        </template>
        <template #popPanel>
            <UeElBackgroundSvgSettingPanel v-model:value="valueRef" />
        </template>
    </BackgroundItemInner>
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

import BackgroundItemInner from "./BackgroundItemInner.vue";

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["svg"]>("value", { required: true });

const svg = computed(() => {
    return valueRef.value.url;
});

onBeforeMount(() => {
    import("@stone/uemo-editor-utils/lib/svg")
        .then(({ initSvgIconComponent }) => {
            return initSvgIconComponent();
        })
        .catch((err) => {
            console.error(err);
        });
});
</script>
<style lang="scss" module>
.preview {
    @include ab-cover;
}
</style>
