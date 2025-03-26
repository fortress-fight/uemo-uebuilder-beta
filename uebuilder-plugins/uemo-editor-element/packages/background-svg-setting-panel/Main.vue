<!--
 * @Description: 背景SVG控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 14:32:31
-->
<template>
    <UeElEditorPanel
        :class="$style['background-svg-setting-panel']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: 'Svg' })"
    >
        <!-- SVG 资源设置 -->
        <UeElSettingGroup is-first>
            <template #body>
                <UeElResourceSetting type="svg" :removable="false" v-model:value="svgSource">
                    <template v-if="svgSource" #operGroup="{ openPopPanel }">
                        <div :class="$style['oper-bar']" class="w-full grid grid-cols-2">
                            <UeElButton v-bind="replaceButtonProps" @trigger="openPopPanel" />
                            <UeElSelect v-model:value="adjust" :options="adjustOptions">
                                <template #info>
                                    <UeElButton v-bind="adjustButtonProps" />
                                </template>
                            </UeElSelect>
                        </div>
                    </template>
                </UeElResourceSetting>
            </template>
        </UeElSettingGroup>

        <!-- 对齐方式设置 -->
        <UeElSettingGroup>
            <template #body>
                <UeElAlignSetting v-model:value="align" />
            </template>
        </UeElSettingGroup>

        <!-- 尺寸设置 -->
        <UeElSettingGroup v-bind="widthSettingGroup" @trigger="handleWidthTrigger">
            <template #body v-if="width">
                <UeElNumberInput v-bind="widthInputParam" v-model:value="width" :label="t('UNIT_WIDTH')" />
            </template>
        </UeElSettingGroup>

        <!-- 偏移设置 -->
        <UeElSettingGroup>
            <template #body>
                <UeElTranslateSetting v-model:value="translate" />
            </template>
        </UeElSettingGroup>

        <!-- 描边颜色设置 -->
        <UeElColorSettingGroup v-model:value="strokeColor" :title="t('UNIT_STROKE_COLOR')" />

        <!-- 填充颜色设置 -->
        <UeElColorSettingGroup v-model:value="fillColor" :title="t('UNIT_FILL_COLOR')" />
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElBackgroundSvgSettingPanelBaseProps, UeElBackgroundSvgSettingPanelValue } from "./index";

import { useDefineObjectModel } from "~/utils/model-mixin";

const { t } = useI18n();
defineOptions({ name: "UeElBackgroundSvgSettingPanel" });
const _props = withDefaults(defineProps<UeElBackgroundSvgSettingPanelBaseProps>(), {});

const valueRef = defineModel<UeElBackgroundSvgSettingPanelValue>("value", { required: true });

const svgSource = useDefineObjectModel(valueRef, {
    get(modelValue) {
        const { url, natureWidth, natureHeight } = modelValue;
        return url
            ? {
                  source: url,
                  data: natureWidth && natureHeight ? { w: natureWidth, h: natureHeight } : undefined,
              }
            : undefined;
    },
    set(value, modelValue) {
        if (!value) return undefined;

        modelValue.url = value.source;
        modelValue.natureWidth = value.data?.w;
        modelValue.natureHeight = value.data?.h;

        return modelValue;
    },
});

const adjust = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.effect || "normal";
    },
    set(value, modelValue) {
        modelValue.effect = value;

        return modelValue;
    },
});

const adjustOptions = computed(() => {
    return [
        { value: "normal", text: t("UNIT_NORMAL") },
        { value: "sticky", text: t("UNIT_STICKY") },
        { value: "scroll", text: t("UNIT_SCROLL") },
    ];
});

const adjustButtonProps = computed<UE_EL_COMPONENT.UeElButtonProps>(() => {
    let adjustName = t("UNIT_EFFECT");

    switch (adjust.value) {
        case "sticky":
            adjustName = t("UNIT_STICKY");
            break;

        case "scroll":
            adjustName = t("UNIT_SCROLL");
            break;

        default:
            adjustName = t("UNIT_NORMAL");
            break;
    }

    return {
        theme: "hoverStrokeText",
        size: "normal",
        icon: { name: "icon-tiaojie", size: 16 },
        text: adjustName,
    } as const;
});

const align = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.align;
    },
    set(value, modelValue) {
        modelValue.align = value;

        return modelValue;
    },
});

const widthSettingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("UNIT_WIDTH"),
        oper: !width.value ? [{ id: "addWidth", type: "add" }] : [{ id: "removeWidth", type: "remove" }],
    };
});

function handleWidthTrigger(id: string) {
    switch (id) {
        case "addWidth":
            width.value = "50%";
            break;

        case "removeWidth":
            width.value = undefined;
            break;

        default:
            break;
    }
}

const widthInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => {
    return {
        limit: { px: [20, Infinity], "%": [5, 300] },
        units: [
            { value: "px", text: "px", default: 200 },
            { value: "%", text: "%", default: 100 },
        ],
        title: { icon: { name: "icon-kuandu", size: 15 } },
        paddingSize: "level2",
        show: {
            input() {
                return !width.value ? t("UNIT_DEFAULT") : undefined;
            },
        },
    };
});

const width = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.width;
    },

    set(value, modelValue) {
        modelValue.width = value;

        return modelValue;
    },
});

const translate = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.translate;
    },

    set(value, modelValue) {
        modelValue.translate = value;

        return modelValue;
    },
});

const strokeColor = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.strokeColor;
    },

    set(value, modelValue) {
        modelValue.strokeColor = value;

        return modelValue;
    },
});

const fillColor = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.fillColor;
    },

    set(value, modelValue) {
        modelValue.fillColor = value;

        return modelValue;
    },
});

const replaceButtonProps = computed<UE_EL_COMPONENT.UeElButtonProps>(() => {
    return {
        size: "normal",
        theme: "hoverStrokeText",
        icon: { name: "icon-app-svg", size: 16 },
        text: svgSource.value ? t("UNIT_REPLACE") : t("UNIT_ADD", { text: "SVG" }),
    } as const;
});
</script>
<style lang="scss" module>
.background-svg-setting-panel {
    .oper-bar {
        gap: var(--ue-control-row-space);
    }
}
</style>
