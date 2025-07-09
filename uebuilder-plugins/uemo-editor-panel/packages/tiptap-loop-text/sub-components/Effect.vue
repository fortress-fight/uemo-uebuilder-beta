<template>
    <UeElSettingGroup :title="t('UNIT_EFFECT_TYPE')">
        <template #body>
            <UeElControlGroup :colCount="2">
                <UeElSelect v-model:value="effect" :title="t('UNIT_EFFECT')" :options="effectOption" />
                <UeElNumberInput v-bind="durationParam" v-model:value="delay" />
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
    <UeElTextSettingGroup :title="t('UNIT_PREFIX')" v-model:value="prefix" />
    <UeElTextSettingGroup :title="t('UNIT_SUFFIX')" v-model:value="suffix" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import libList from "../assets/data";

defineOptions({ name: "UeEditorPanelTiptapLoopTextEffectPanel" });

const emit = defineEmits<{ (e: "fire", data: { type: "preview" }): void }>();

const valueModel = defineModel<UE_TIPTAP_EXTENSION.LoopText["attrs"]>("value", { required: true });

const { t } = useI18n();

const effectOption = Object.keys(libList).map((key) => ({
    value: key,
    text: libList[key].name,
}));

const effect = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.effect,
    set: (value, modelValue) => {
        modelValue.effect = value;
        return modelValue;
    },
});

const durationParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_DELAY") },
    limit: [2.4, 5],
    step: 0.1,
    show: {
        input: (value) => value.num + "s",
    },
}));

const delay = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.delay || "2.4",
    set: (value, modelValue) => {
        modelValue.delay = value;
        return modelValue;
    },
});

const prefix = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return modelValue.prefix?.value || "";
    },
    set: (value, modelValue) => {
        modelValue.prefix = { type: "text", value };
        return modelValue;
    },
});

const suffix = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return modelValue.suffix?.value || "";
    },
    set: (value, modelValue) => {
        modelValue.suffix = { type: "text", value };
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.tiptap-loop-text-effect-panel {
    // init
}
</style>
