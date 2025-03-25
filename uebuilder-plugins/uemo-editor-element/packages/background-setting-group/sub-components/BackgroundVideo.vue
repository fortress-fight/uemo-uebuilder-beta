<template>
    <BackgroundItemInner v-model:value="valueRef" :title="t('UNIT_VIDEO')" :use-opacity="false">
        <template #preview>
            <div :class="$style['preview']" class="flex items-center justify-center">
                <UeElIcon :class="$style['ic']" name="icon-app-video" :size="12" />
            </div>
        </template>
        <template #popPanel>
            <UeElBackgroundVideoSettingPanel v-model:value="valueRef" />
        </template>
    </BackgroundItemInner>
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

import BackgroundItemInner from "./BackgroundItemInner.vue";

const { t } = useI18n();
defineOptions({ name: "BackgroundImage" });

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["video"]>("value", { required: true });
</script>
<style lang="scss" module>
.preview {
    @include ab-cover;
}
</style>
