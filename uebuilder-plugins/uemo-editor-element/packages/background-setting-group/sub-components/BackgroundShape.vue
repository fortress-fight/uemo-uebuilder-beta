<template>
    <BackgroundItemInner
        v-model:value="valueRef"
        v-model:opacity="opacity"
        :title="t('UNIT_SHAPE')"
        :use-opacity="true"
    >
        <template #preview>
            <div :class="$style['preview']" class="flex items-center justify-center">
                <UeElIcon :class="$style['ic']" name="icon-xingzhuang" :size="12" />
            </div>
        </template>
        <template #popPanel>
            <UeElBackgroundShapeSettingPanel v-model:value="valueRef" />
        </template>
    </BackgroundItemInner>
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

import BackgroundItemInner from "./BackgroundItemInner.vue";

const { t } = useI18n();

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["shape"]>("value", { required: true });

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
}
</style>
