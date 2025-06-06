<!--
 * @Description: 地图面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 01:27:38
-->
<template>
    <UeElEditorPanel
        :class="$style['map-setting']"
        :title="t('UNIT_MAP')"
        :isOperationEnabled="true"
        actionMode="confirmWithCancel"
        @cancel="handleCancel"
        @confirm="handleConfirm"
    >
        <UeElSettingGroup :title="t('UNIT_MAP_COORDINATES')">
            <template #body>
                <UeElTextInput
                    ref="inputRef"
                    :auto-trim="true"
                    theme="enterText"
                    :value="mapCoordinates"
                    :placeholder="t('MAP_COORDINATES_INPUT_TIP')"
                    :required="true"
                    :rules="mapInputRules"
                    @confirm="inputConfirm"
                />
            </template>
        </UeElSettingGroup>
        <!-- 提示信息 -->
        <UeElSettingGroup :title="t('UNIT_TIP')">
            <template #body>
                <UeElTipGroup :tips="tipMessage" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElMapSettingPanelBaseProps } from "./index";

import { isMapPosReg } from "@stone/uemo-editor-utils/lib/utils";

defineOptions({ name: "UeElMapSettingPanel" });
const _prop = withDefaults(defineProps<UeElMapSettingPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "cancel"): void; (e: "confirm", coordinates: string): void }>();

const inputRef = useTemplateRef("inputRef");

const { t } = useI18n();

const mapCoordinates = ref<string>("");

const mapInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isMapPosReg, message: t("MAP_COORDINATES_INPUT_TIP") }];

/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps["tips"]>(() => {
    return [t("MAP_COORDINATES_TIP")];
});

function inputConfirm(value: string) {
    mapCoordinates.value = value;
    handleConfirm();
}

/**
 * 取消操作处理函数
 * @description 触发取消事件，通知父组件取消当前操作
 */
function handleCancel() {
    emit("cancel");
}

/**
 * 确认操作处理函数
 */
function handleConfirm() {
    emit("confirm", mapCoordinates.value);
}

onMounted(() => {
    requestAnimationFrame(() => {
        inputRef.value?.focus();
    });
});
</script>
<style lang="scss" module>
.map-setting-panel {
    //
}
</style>
