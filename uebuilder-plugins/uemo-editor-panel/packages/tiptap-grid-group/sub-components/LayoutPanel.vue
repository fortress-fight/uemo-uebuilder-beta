<template>
    <UeElGridLayoutSetting :with-replace="true" :value="grid" @change="gridChange" />
    <UeElSettingGroup>
        <template #body>
            <UeElAlignSetting v-model:value="align" type="xy" />
        </template>
    </UeElSettingGroup>
    <UeElWidthSettingGroup v-bind="widthInputProps" v-model:value="width" />
    <UeElGapSettingGroup v-model:value="gap" />
    <UeElPaddingSettingGroup v-model:value="padding" v-bind="paddingInputProps" />
    <UeElOverflowSetting v-model:value="overflow" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel, useDefineObjectModuleCustomProxy } from "@stone/uemo-editor-element/utils/model-mixin";
import { getGridInfo, getGridArea } from "@stone/uemo-editor-utils/lib/css-grid";

const emit = defineEmits<{
    (
        e: "fire",
        data: {
            type: "remove";
            param: { grid: string; mdGrid: string; list: number[] };
        }
    ): void;
}>();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.GridGroup["attrs"]>("value", { required: true });

const changeValue = useDefineObjectModuleCustomProxy(valueModel);

const grid = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.grid || "",
    set: (value, modelValue) => {
        modelValue.grid = value;
        return modelValue;
    },
});

function gridChange(value: { grid: string; reset: boolean; lengthChange: boolean; removeIndexList?: number[] }) {
    if (value.removeIndexList) {
        const { subColInfo } = getGridInfo(value.grid);
        emit("fire", {
            type: "remove",
            param: {
                grid: value.grid,
                mdGrid: getGridArea(subColInfo.length, true),
                list: value.removeIndexList || [],
            },
        });
        changeValue((modelValue) => {
            modelValue.grid = value.grid;
            modelValue.mdGrid = getGridArea(subColInfo.length, true);
            return modelValue;
        });
    } else if (value.reset) {
        changeValue((modelValue) => {
            const currentGridInfo = getGridInfo(modelValue.grid);
            const newGridInfo = getGridInfo(value.grid);
            modelValue.grid = value.grid;
            if (newGridInfo.subColInfo.length != currentGridInfo.subColInfo.length) {
                modelValue.gap = "20px";
            }
            return modelValue;
        });
    } else {
        grid.value = value.grid;
    }
}

// #region design

const align = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        const x = (modelValue.alignX || "left") as UE_EL_UTIL.ALIGN_X;
        const y = (modelValue.alignY || "top") as UE_EL_UTIL.ALIGN_Y;
        return `${x} ${y}` as const;
    },
    set: (value, modelValue) => {
        const [x, y] = value.split(" ");
        modelValue.alignX = x as UE_EL_UTIL.ALIGN_X;
        modelValue.alignY = y as UE_EL_UTIL.ALIGN_Y;
        return modelValue;
    },
});

const widthInputProps = computed<UE_EL_COMPONENT.UeElWidthSettingGroupProps>(() => ({
    numberInputProps: {
        limit: { px: [20, 1200], "%": [5, 100] },
        units: [
            { value: "px", text: "px", default: 1200 },
            { value: "%", text: "%", default: 100 },
        ],
    },
}));

const width = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.width,
    set: (value, modelValue) => {
        modelValue.width = value;
        return modelValue;
    },
});

const gap = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.gap,
    set: (value, modelValue) => {
        modelValue.gap = value;
        return modelValue;
    },
});

const overflow = useDefineObjectModel(valueModel, {
    get: (modelValue) => !!modelValue.overflow,
    set: (value, modelValue) => {
        if (value) {
            modelValue.overflow = "hidden";
        } else {
            modelValue.overflow = undefined;
        }
        return modelValue;
    },
});

const paddingInputProps = computed<UE_EL_COMPONENT.UeElPaddingSettingGroupProps>(() => ({
    paddingSettingProps: {
        units: [
            { text: "px", value: "px", default: 0 },
            { text: "%", value: "%", default: 0 },
        ],
        limit: { "%": [0, 100], px: [0, 500] },
    },
}));

const padding = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.padding,
    set: (value, modelValue) => {
        modelValue.padding = value;
        return modelValue;
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
