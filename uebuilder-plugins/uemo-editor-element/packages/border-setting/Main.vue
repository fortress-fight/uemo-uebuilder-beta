<!--
 * @Description: 边框控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 00:55:07
-->
<template>
    <UeElControlGroup :class="$style['border-setting']" :data-disable="disable" :col="1">
        <UeElControlGroup v-bind="borderStyleToggleParam" @selectChange="changeStyle">
            <UeElColorSetting v-model:value="color" :class="$style['color-input']" :type="colorType" />
        </UeElControlGroup>
        <UeElControlGroup :col-count="2" v-bind="onOffParam" @onOffChange="toggleShowDetail">
            <template v-if="borderDetailOnOff">
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="t"
                    :title="{ icon: { name: 'icon-shangmiaobian' } }"
                />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="l"
                    :title="{ icon: { name: 'icon-zuomiaobian' } }"
                />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="b"
                    :title="{ icon: { name: 'icon-xiamiaobian' } }"
                />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="r"
                    :title="{ icon: { name: 'icon-youmiaobian' } }"
                />
            </template>
            <template v-else>
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="all"
                    :class="$style['all-input']"
                    :title="{ icon: { name: 'icon-miaobian' } }"
                />
            </template>
        </UeElControlGroup>
    </UeElControlGroup>
</template>
<script lang="ts" setup>
import type { UeElBorderSettingBaseProps } from "./index";

const i18n = useI18n();

defineOptions({ name: "UeElBorderSetting" });

const prop = withDefaults(defineProps<UeElBorderSettingBaseProps>(), {
    disable: false,
    colorType: "color",
    defaultValue: () => ({ color: "#000000", width: "1px", style: "solid" }),
});
const valueRef = defineModel<UE_EL_UTIL.BorderValue>("value", { required: false });

const useValue = computed(() => {
    return valueRef.value || prop.defaultValue;
});

const borderDetailOnOff = ref<boolean>(false);

const borderParam = computed(() => {
    if (!useValue.value?.width) {
        return ["0", "0", "0", "0"];
    }

    const resultArr = useValue.value.width.split(" ");

    return [
        resultArr[0],
        resultArr[1] ?? resultArr[0],
        resultArr[2] ?? resultArr[0],
        resultArr[3] ?? resultArr[1] ?? resultArr[0],
    ];
});

const inputParam: UE_EL_COMPONENT.UeElNumberInputProps = {
    limit: { px: [0, Infinity] },
    units: [{ value: "px", text: "px", default: 4 }],
    paddingSize: "level2",
};

// #region 边框宽度

const all = computed({
    get() {
        return borderParam.value[0];
    },
    set(value) {
        changeWidth([value, value, value, value]);
    },
});

const t = computed({
    get() {
        return borderParam.value[0];
    },
    set(value) {
        const [, right, bottom, left] = borderParam.value;
        changeWidth([value, right, bottom, left]);
    },
});

const r = computed({
    get() {
        return borderParam.value[1]; // 获取右边框宽度
    },
    set(value) {
        const [top, , bottom, left] = borderParam.value;
        changeWidth([top, value, bottom, left]); // 更新右边框宽度
    },
});

const b = computed({
    get() {
        return borderParam.value[2];
    },
    set(value) {
        const [top, right, , left] = borderParam.value;
        changeWidth([top, right, value, left]);
    },
});

const l = computed({
    get() {
        return borderParam.value[3];
    },
    set(value) {
        const [top, right, bottom] = borderParam.value;
        changeWidth([top, right, bottom, value]);
    },
});

function changeWidth(value: string[]) {
    const result = value.map((item) => (item === "0px" ? "0" : item));

    if (result[0] === result[1] && result[1] === result[2] && result[2] === result[3]) {
        changeValue({ width: result[0] });
        return;
    }

    if (result[0] === result[2] && result[1] === result[3]) {
        changeValue({ width: `${result[0]} ${result[1]}` });
        return;
    }

    const isEmpty = !result.some((item) => item != "0");
    changeValue({ width: isEmpty ? "0" : result.join(" ") });
}

// #endregion

// #region 边框样式

const borderStyle = computed({
    get() {
        return useValue.value.style;
    },
    set(value) {
        changeValue({ style: value });
    },
});

function changeStyle(value: UE_EL_UTIL.SelectValue) {
    if (value == "solid" || value == "dashed") {
        borderStyle.value = value;
    }
}

const borderStyleToggleParam = computed<UE_EL_COMPONENT.UeElControlGroupProps>(() => ({
    operType: "select",
    buttonParam: {
        icon: "icon-gengduo",
        label: borderStyle.value === "solid" ? i18n.t("BORDER_STYLE_SOLID") : i18n.t("BORDER_STYLE_DASHED"),
    },
    selectParam: {
        value: borderStyle.value,
        options: [
            { value: "solid", text: i18n.t("BORDER_STYLE_SOLID") },
            { value: "dashed", text: i18n.t("BORDER_STYLE_DASHED") },
        ],
    },
}));

// #endregion

// #region 边框颜色

const isGradientBorder = computed(() => {
    return useValue.value.color.includes("gradient");
});

const color = computed({
    get() {
        return useValue.value.color;
    },
    set(value) {
        if (!useValue.value.color.includes("gradient") && value.includes("gradient")) {
            borderDetailOnOff.value = false;
            changeValue({
                color: value,
                width: `${all.value} ${all.value} ${all.value} ${all.value}`,
            });
        } else {
            changeValue({ color: value });
        }
    },
});

// #endregion

const onOffParam = computed<UE_EL_COMPONENT.UeElControlGroupProps>(() => ({
    operType: "onOff",
    onOffParam: {
        disable: false,
        label: i18n.t("TOGGLE_INDEPENDENT"),
        value: borderDetailOnOff.value,
        icon: "icon-dulimiaobian",
    },
}));

function toggleShowDetail(value: any) {
    if (isGradientBorder.value) return;
    borderDetailOnOff.value = value;
    all.value = borderParam.value[0];
}

function changeValue(value: Partial<UE_EL_UTIL.BorderValue>) {
    if (prop.disable) return;
    valueRef.value = { ...useValue.value, ...value };
}

onBeforeMount(() => {
    const arr = borderParam.value;
    if (!(arr[0] === arr[2] && arr[1] === arr[3] && arr[2] === arr[1])) {
        borderDetailOnOff.value = true;
    }
});
</script>
<style lang="scss" module>
.border-setting {
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
}
.all-input,
.color-input {
    grid-area: span 1 / span 2;
}
</style>
