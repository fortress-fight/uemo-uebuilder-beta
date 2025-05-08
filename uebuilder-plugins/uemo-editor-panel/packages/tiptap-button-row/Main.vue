<!--
 * @Description: tiptap 按钮组编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-08 18:45:48
-->
<template>
    <UeElEditorPanel :class="$style['tiptap-button-row']" :title="t('UNIT_BUTTON_ROW')">
        <!-- 属性组 -->
        <UeElSettingGroup :title="t('UNIT_ATTR')">
            <template #body>
                <UeElControlGroup>
                    <UeElSelect v-model:value="dir" :title="t('UNIT_LAYOUT')" :options="dirOptions" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup :title="t('UNIT_SPACE')">
            <template #body>
                <UeElControlGroup>
                    <UeElGapSetting v-model:value="gap" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup>
            <template #body>
                <UeElControlGroup>
                    <UeElAlignSetting v-model:value="align" type="x" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup :title="t('UNIT_FILL')">
            <template #body>
                <UeElControlGroup>
                    <UeElCheckBox v-model:value="fill" :text="t('FILL_MODE_TIP')" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapButtonRowBaseProps } from "./index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeEditorPanelTiptapButtonRow" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeEditorPanelTiptapButtonRowBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.ButtonRow["attrs"]>("value", { required: true });

// #region 属性

const dirOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { value: "row", text: t("UNIT_X") },
    { value: "col", text: t("UNIT_Y") },
]);

const dir = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.dir || "row",
    set: (value, modelValue) => {
        modelValue.dir = value;
        return modelValue;
    },
});

// #endregion

// #region 间距

const gap = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.gap || "0px",
    set: (value, modelValue) => {
        modelValue.gap = value;
        return modelValue;
    },
});

// #endregion

// #region Align

const align = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.align || "left",
    set: (value, modelValue) => {
        modelValue.align = value;
        return modelValue;
    },
});

// #endregion

// #region 填充

const fill = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.fill || false,
    set: (value, modelValue) => {
        modelValue.fill = value;
        return modelValue;
    },
});

// #endregion
</script>
<style lang="scss" module>
.tiptap-button-row {
    //
}
</style>
