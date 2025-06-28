<template>
    <UeElEditorPanel
        :is-operation-enabled="true"
        action-mode="confirmWithCancel"
        :class="$style['grid-layout-area-setting']"
        :title="t('GRID_LAYOUT_SETTING_SELECT_LAYOUT')"
        @confirm="emit('confirm', selectList)"
        @cancel="emit('cancel')"
    >
        <UeElSettingGroup :title="t('GRID_LAYOUT_SETTING_ORIGIN_LAYOUT')" is-first>
            <template #body>
                <UeElGirdLayoutUtil
                    :select-list="selectList"
                    :data="value"
                    type="delete"
                    icon="icon-shanchu"
                    @subitemTrigger="selectChange"
                />
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup :title="t('UNIT_TIP')" is-last>
            <template #body>
                <UeElTipGroup type="warn" :tips="tips" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
const prop = defineProps<{ value: string; selectCount: number }>();
const { t } = useI18n();
const emit = defineEmits<{ (e: "confirm", data: number[]): void; (e: "cancel"): void }>();

const selectList = ref<number[]>([]);

const tips = [t("GRID_LAYOUT_SETTING_SELECT_LAYOUT_TIP")];

const instance = getCurrentInstance();
function selectChange(value: { ev: MouseEvent; index: number }) {
    if (selectList.value.includes(value.index)) {
        selectList.value = selectList.value.filter((item) => item !== value.index);
        return;
    }

    if (selectList.value.length < prop.selectCount) {
        selectList.value.push(value.index);
        return;
    }

    instance?.proxy?.$ueElToast.error(t("GRID_LAYOUT_SETTING_SELECT_LAYOUT_ERROR_2", { count: prop.selectCount }));
    return;
}
</script>
<style lang="scss" module>
//
</style>
