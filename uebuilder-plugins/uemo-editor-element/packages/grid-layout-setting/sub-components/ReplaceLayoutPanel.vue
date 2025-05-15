<template>
    <UeElEditorPanel :class="$style['grid-layout-area-setting']" :title="t('GRID_LAYOUT_SETTING_SWAP_POSITION')">
        <UeElSettingGroup :title="t('GRID_LAYOUT_SETTING_ORIGIN_LAYOUT')" is-first>
            <UeElGirdLayoutUtil
                :data="value"
                type="select"
                icon="icon-duigou"
                :disable-grid-item-index="disableGridItemIndex"
                @subitemTrigger="emit('trigger', $event)"
            />
        </UeElSettingGroup>
        <UeElSettingGroup :title="t('UNIT_TIP')" is-last>
            <UeElTipGroup type="warn" :tips="tips" />
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const _prop = defineProps<{ value: string; disableGridItemIndex?: number[] }>();
const emit = defineEmits<{ (e: "trigger", data: { ev: MouseEvent; index: number }): void }>();

const tips = computed(() => [t("GRID_LAYOUT_SETTING_SWAP_POSITION_TIP")]);
</script>
<style lang="scss" module>
//
</style>
