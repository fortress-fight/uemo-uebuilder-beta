<template>
    <UeElSettingGroup :title="t('UNIT_MAP')" :class="$style['map-setting-group']">
        <template #body>
            <UeElControlGroup :col-count="1">
                <UeElTextInput
                    :class="$style['map-coordinates-input']"
                    :auto-trim="true"
                    theme="enterText"
                    :value="mapCoordinates"
                    :placeholder="t('MAP_COORDINATES_INPUT_TIP')"
                    :required="true"
                    :rules="mapInputRules"
                    @confirm="mapCoordinates = $event"
                >
                    <template #after>
                        <a
                            v-ue-el-label="t('MAP_GET_COORDINATES_TIP')"
                            href="https://lbs.amap.com/tools/picker"
                            target="_blank"
                            :class="$style['btn--map-pos']"
                            class="flex items-center justify-center"
                        >
                            <UeElIcon name="ue-tiptap-map-local" class="justify-center" :size="18" />
                        </a>
                    </template>
                </UeElTextInput>
                <UeElTextInput
                    :auto-trim="true"
                    theme="enterText"
                    :value="title"
                    :placeholder="t('INPUT_PLACEHOLDER', { text: t('MAP_TITLE') })"
                    :required="true"
                    :rules="mapInputRules"
                    @confirm="title = $event"
                />
                <UeElTextInput
                    :auto-trim="true"
                    theme="enterText"
                    :value="description"
                    :placeholder="t('INPUT_PLACEHOLDER', { text: t('MAP_DESCRIPTION') })"
                    :required="false"
                    :rules="mapInputRules"
                    @confirm="description = $event"
                />
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
    <UeElSizeSettingGroup v-model:value="size" />
    <UeElSettingGroup :title="t('UNIT_SETTING')">
        <template #body>
            <UeElControlGroup :col-count="2">
                <UeElSelect v-model:value="mapLang" :title="t('UNIT_LANGUAGE')" :options="langOptions" />
                <UeElSelect
                    v-if="mapLang != 'en'"
                    v-model:value="mapTheme"
                    :title="t('UNIT_STYLE')"
                    :options="themeOptions"
                />
                <UeElSelect v-model:value="pointerTheme" :title="t('UNIT_MARK')" :options="pointerOptions" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('UNIT_OPERATION')">
        <template #body>
            <UeElControlGroup :col-count="2">
                <UeElCheckBox v-model:value="mapScale" :text="t('MAP_SCALE')" />
                <UeElCheckBox v-model:value="mapDrag" :text="t('MAP_DRAG')" />
                <UeElCheckBox v-model:value="scaleBtns" :text="t('MAP_SCALE_BTNS')" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import { isMapPosReg } from "@stone/uemo-editor-utils/lib/utils";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.MapFrame["attrs"]>("value", { required: true });

const { t } = useI18n();

const mapInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isMapPosReg, message: t("MAP_COORDINATES_INPUT_TIP") }];
const mapCoordinates = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.mapPosition || "",
    set: (value, modelValue) => {
        modelValue.mapPosition = value;
        return modelValue;
    },
});

const title = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.mapTitle || "",
    set: (value, modelValue) => {
        modelValue.mapTitle = value;
        return modelValue;
    },
});

const description = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.mapDescription || "",
    set: (value, modelValue) => {
        modelValue.mapDescription = value;
        return modelValue;
    },
});

const align = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.align || "left",
    set: (value, modelValue) => {
        modelValue.align = value;
        return modelValue;
    },
});

const size = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        if (!modelValue.sizeMode) return undefined;

        return {
            mode: modelValue.sizeMode,
            width: modelValue.width,
            height: modelValue.height,
            ratio: modelValue.ratio,
        };
    },
    set: (value, modelValue) => {
        modelValue.sizeMode = value?.mode;
        modelValue.width = value?.width;
        modelValue.height = value?.height;
        modelValue.ratio = value?.ratio;

        return modelValue;
    },
});

const langOptions: UE_EL_COMPONENT.UeElSelectProps["options"] = [
    { value: "zh_cn", text: t("UNIT_LANG_ZH_CN") },
    { value: "en", text: t("UNIT_LANG_EN") },
];
const mapLang = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.mapLang || "zh_cn",
    set: (value, modelValue) => {
        if (value === "en") {
            modelValue.mapTheme = undefined;
        }
        modelValue.mapLang = value;
        return modelValue;
    },
});

const themeOptions: UE_EL_COMPONENT.UeElSelectProps["options"] = [
    { value: "normal", text: "标准" },
    { value: "dark", text: "幻影黑" },
    { value: "light", text: "月光银" },
    { value: "grey", text: "雅士灰" },
    { value: "fresh", text: "草色青" },
    { value: "whitesmoke", text: "远山黛" },
    { value: "graffiti", text: "涂鸦" },
    { value: "macaron", text: "马卡龙" },
    { value: "blue", text: "靛青蓝" },
    { value: "darkblue", text: "极夜蓝" },
    { value: "wine", text: "酱籽" },
];
const mapTheme = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.mapTheme || "normal",
    set: (value, modelValue) => {
        modelValue.mapTheme = value;
        return modelValue;
    },
});

const pointerOptions: UE_EL_COMPONENT.UeElSelectProps["options"] = [
    { value: "mode1", text: t("MAP_MARK_MODE1") },
    { value: "mode2", text: t("MAP_MARK_MODE2") },
];
const pointerTheme = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.pointerTheme || "mode1",
    set: (value, modelValue) => {
        modelValue.pointerTheme = value;
        return modelValue;
    },
});

const mapScale = useDefineObjectModel(valueModel, {
    get: (modelValue) => !!modelValue.mapScale,
    set: (value, modelValue) => {
        modelValue.mapScale = value;
        return modelValue;
    },
});

const mapDrag = useDefineObjectModel(valueModel, {
    get: (modelValue) => !!modelValue.mapDrag,
    set: (value, modelValue) => {
        modelValue.mapDrag = value;
        return modelValue;
    },
});

const scaleBtns = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.mapBtns?.includes("scale") || false,
    set: (_value, modelValue) => {
        let btn = modelValue.mapBtns || [];
        if (btn.includes("scale")) {
            btn = btn.filter((item) => item !== "scale");
        } else {
            btn = [...btn, "scale"];
        }
        modelValue.mapBtns = btn.length ? btn : undefined;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.map-coordinates-input {
    .btn--map-pos {
        @include square(30px);

        color: color(var(--ue-font-color));
        border-left: 1px solid color(var(--ue-border-color));
        &:hover {
            color: color(var(--ue-font-color--deeper));
        }
    }
    &:focus-within {
        .btn--map-pos {
            color: color(var(--ue-font-color--deeper));
            border-left-color: color(var(--ue-color--active));
        }
    }
}
</style>
