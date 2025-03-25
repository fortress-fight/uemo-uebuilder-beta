<template>
    <BackgroundItemInner v-model:value="valueRef" title="Spline" :use-opacity="false">
        <template #preview>
            <div :class="$style['preview']" class="flex items-center justify-center">
                <UeElIcon :class="$style['ic']" name="icon-app-spline" :size="12" />
            </div>
        </template>
        <template #popPanel>
            <UeElBackgroundSplineSettingPanel v-model:value="valueRef" />
        </template>
    </BackgroundItemInner>
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

import BackgroundItemInner from "./BackgroundItemInner.vue";

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["spline"]>("value", { required: true });
</script>
<style lang="scss" module>
.preview {
    @include ab-cover;
}
</style>
