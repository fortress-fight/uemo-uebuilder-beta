<template>
    <UeElSettingGroup :title="t('UNIT_EFFECT_TYPE')">
        <template #body>
            <UeElControlGroup :colCount="2">
                <UeElSelect v-model:value="effect" :title="t('UNIT_EFFECT')" :options="effectOption" />
                <UeElNumberInput v-bind="durationParam" v-model:value="duration" />
            </UeElControlGroup>
            <UeElButton
                size="normal"
                :text="t('UNIT_PREVIEW')"
                theme="strokeText"
                :icon="{ name: 'icon-app-play', size: 16 }"
                :class="$style['oper-btn']"
                @trigger="emit('fire', { type: 'preview' })"
            />
        </template>
    </UeElSettingGroup>

    <UeElSettingGroup :title="t('UNIT_CONTENT')">
        <template #body>
            <UeElControlGroup :colCount="themeOptions.length > 1 ? 2 : 1">
                <UeElSelect
                    v-for="(item, index) in themeOptions"
                    :key="index"
                    :value="item.value"
                    :title="item.title"
                    :options="item.options"
                    @update:value="changeTheme(index, $event)"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>

    <UeElSettingGroup :title="t('UNIT_MAIN_COLOR')">
        <template #body>
            <UeElControlGroup>
                <UeElColorSetting v-model:value="textColor" type="color" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>

    <template v-if="value.theme === 'NO02' || value.theme === 'NO03'">
        <UeElSettingGroup :title="t('UNIT_DECORATION')">
            <template #body>
                <UeElControlGroup :colCount="2">
                    <UeElNumberInput v-bind="sizeOption" v-model:value="proxyZoom" />
                    <UeElSelect v-model:value="proxyPos" :title="t('UNIT_POSITION')" :options="proxyPosOption" />
                    <UeElNumberInput v-bind="translateInputParam" v-model:value="translate" />
                    <UeElCheckBox
                        v-model:value="enableProxyColor"
                        :text="t('UNIT_COLOR', { text: t('UNIT_DECORATION') })"
                    />
                    <UeElColorSetting
                        :class="$style['color-input']"
                        v-if="!!proxyColor"
                        v-model:value="proxyColor"
                        type="color"
                    />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
    </template>

    <template v-if="value.theme === 'NO03'">
        <UeElSettingGroup :title="t('UNIT_DESC')">
            <template #body>
                <UeElControlGroup :colCount="2">
                    <UeElNumberInput v-bind="sizeOption" v-model:value="descZoom" />
                    <UeElNumberInput v-bind="paddingTopOption" v-model:value="paddingTop" />
                    <UeElCheckBox v-model:value="enableDescColor" :text="t('UNIT_COLOR', { text: t('UNIT_DESC') })" />
                    <UeElColorSetting
                        :class="$style['color-input']"
                        v-if="!!descColor"
                        v-model:value="descColor"
                        type="color"
                    />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
    </template>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import { libList } from "../asset/data";

const { t } = useI18n();

const emit = defineEmits<{ (e: "fire", data: { type: "preview" }): void }>();

const valueRef = defineModel<UE_TIPTAP_EXTENSION.CounterNumber["attrs"]>("value", { required: true });

const effectOption = Object.keys(libList).map((key) => ({
    value: key,
    text: libList[key].name,
}));
const effect = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.effect,
    set: (value, modelValue) => {
        modelValue.effect = value;
        return modelValue;
    },
});

// #region 主题配置选择
const themeOptions = computed(() => {
    const { theme = "NO01", effect = "normal" } = valueRef.value;
    const themeArr = theme.split("-");
    const mainTheme = themeArr.shift();

    const themeInfo = libList[effect].theme;

    if (!themeInfo) return [];

    const selectTheme = themeInfo.options.find((item) => item.value === mainTheme);

    const result = [
        {
            title: themeInfo.title,
            value: mainTheme || "NO01",
            options: themeInfo.options.map((item) => ({
                value: item.value || "",
                text: item.text,
            })),
        },
    ];

    if (selectTheme) {
        const subInfo = selectTheme.sub;

        subInfo.forEach((item, index) => {
            let value = themeArr[index];

            if (!item.options.map((item) => item.value).includes(value)) {
                value = item.default;
            }

            result.push({ title: item.title, value, options: item.options });
        });
    }
    return result;
});

const theme = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.theme,
    set: (value, modelValue) => {
        modelValue.theme = value;
        return modelValue;
    },
});

function changeTheme(index: number, value: UE_EL_UTIL.SelectValue) {
    const result: string[] = [];
    themeOptions.value.forEach((item) => {
        result.push(item.value);
    });
    result[index] = value ? value.toString() : "";

    theme.value = result.join("-");
}

const durationParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_DURATION") },
    limit: [1, 10],
    step: 0.1,
    show: {
        input: (value) => value.num + "s",
    },
}));

const duration = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.duration,
    set: (value, modelValue) => {
        modelValue.duration = value;
        return modelValue;
    },
});

const textColor = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.textColor || "#333",
    set: (value, modelValue) => {
        modelValue.textColor = value;
        return modelValue;
    },
});

const sizeOption = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_SCALE") },
    limit: [0.1, 1],
    step: 0.01,
}));

// #region 样式

const extStyle = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.extStyle || {},
    set: (value, modelValue) => {
        modelValue.extStyle = value;
        return modelValue;
    },
});

function changeStyle(key: string, value?: string) {
    const result: Record<string, string> = {};
    Object.entries({ ...extStyle.value, [key]: value }).forEach(([key, value]) => {
        if (!value) return;
        result[key] = value;
    });
    extStyle.value = result;
}

const proxyZoom = computed({
    get() {
        return extStyle.value["--counter-number-proxy-zoom"] || "0.5";
    },
    set(value) {
        changeStyle("--counter-number-proxy-zoom", value);
    },
});

const proxyPosOption = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { value: "", text: t("UNIT_SUP") },
    { value: "flex-end", text: t("UNIT_SUB") },
]);

const proxyPos = computed({
    get() {
        return extStyle.value["--counter-number-proxy-pos"] || "";
    },
    set(value) {
        changeStyle("--counter-number-proxy-pos", value);
    },
});

const translateInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_TRANSLATE") },
    limit: { em: [-1, 1] },
    units: [{ text: "em", value: "em" }],
    step: 0.1,
    hideUnit: true,
    show: {
        input: (value) => value.num + "em",
    },
}));

const translate = computed({
    get() {
        return extStyle.value["--counter-number-proxy-translate"] || "0em";
    },
    set(value) {
        changeStyle("--counter-number-proxy-translate", value);
    },
});

const enableProxyColor = computed({
    get() {
        return !!extStyle.value["--counter-number-proxy-color"];
    },
    set(value) {
        changeStyle("--counter-number-proxy-color", value ? textColor.value || "#333" : undefined);
    },
});

const proxyColor = computed({
    get() {
        return extStyle.value["--counter-number-proxy-color"];
    },
    set(value) {
        changeStyle("--counter-number-proxy-color", value);
    },
});

const descZoom = computed({
    get() {
        return extStyle.value["--counter-number-desc-zoom"] || "0.5";
    },
    set(value) {
        changeStyle("--counter-number-desc-zoom", value);
    },
});

const paddingTopOption = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_TRANSLATE") },
    limit: { em: [-1, 1] },
    units: [{ text: "em", value: "em" }],
    step: 0.1,
    hideUnit: true,
    show: {
        input: (value) => {
            return value.num + "em";
        },
    },
}));

const paddingTop = computed({
    get() {
        return extStyle.value["--counter-number-desc-padding"] || "0";
    },
    set(value) {
        changeStyle("--counter-number-desc-padding", value);
    },
});

const enableDescColor = computed({
    get() {
        return !!extStyle.value["--counter-number-desc-color"];
    },
    set(value) {
        changeStyle("--counter-number-desc-color", value ? textColor.value || "#333" : undefined);
    },
});

const descColor = computed({
    get() {
        return extStyle.value["--counter-number-desc-color"];
    },
    set(value) {
        changeStyle("--counter-number-desc-color", value);
    },
});
// #endregion
</script>
<style lang="scss" module>
.tiptap-counter-number-content {
    // init
}
.color-input {
    grid-column: span 2;
}
</style>
