<template>
    <BackgroundItemInner
        ref="rootRef"
        v-model:value="valueRef"
        v-model:opacity="opacity"
        :title="t('UNIT_IMAGE')"
        :use-opacity="true"
    >
        <template #preview>
            <div :class="$style['preview']" :style="{ backgroundImage: 'url(' + valueRef.image + ')' }"></div>
        </template>
        <template #popPanel>
            <UeElBackgroundImageSettingPanel v-model:value="valueRef" />
        </template>
    </BackgroundItemInner>
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

import BackgroundItemInner from "./BackgroundItemInner.vue";

const { t } = useI18n();

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["image"]>("value", { required: true });

const opacity = computed<number>({
    get() {
        return valueRef.value.opacity || 1;
    },
    set(value) {
        valueRef.value = { ...valueRef.value, opacity: value };
    },
});
</script>
<style lang="scss" module>
.preview {
    @include ab-cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>
