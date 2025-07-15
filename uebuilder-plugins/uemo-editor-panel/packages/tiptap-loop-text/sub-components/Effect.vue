<template>
    <UeElSettingGroup :title="t('UNIT_EFFECT_TYPE')">
        <template #body>
            <UeElControlGroup :colCount="2">
                <UeElSelect v-model:value="effect" :title="t('UNIT_EFFECT')" :options="effectOption" />
                <UeElNumberInput v-bind="durationParam" v-model:value="delay" />
            </UeElControlGroup>
            <UeElButton
                v-bind="previewButtonProps"
                :class="$style['oper-btn']"
                @trigger="isPreview ? pausePreview() : playPreview()"
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

const emit = defineEmits<{ (e: "fire", data: { type: "preview" | "stop" }): void }>();

const valueModel = defineModel<UE_TIPTAP_EXTENSION.LoopText["attrs"]>("value", { required: true });

const { t } = useI18n();

const isPreview = ref(false);
const previewButtonProps = computed<UE_EL_COMPONENT.UeElButtonProps>(() => ({
    size: "normal",
    text: isPreview.value ? t("UNIT_STOP") : t("UNIT_PLAY"),
    type: isPreview.value ? "warning" : undefined,
    theme: isPreview.value ? "fillText" : "strokeText",
    icon: { name: isPreview.value ? "icon-app-pause" : "icon-app-play", size: 16 },
}));

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

function playPreview() {
    isPreview.value = true;
    emit("fire", { type: "preview" });
}
function pausePreview() {
    isPreview.value = false;
    emit("fire", { type: "stop" });
}

defineExpose({
    playPreview,
    pausePreview,
});
</script>
<style lang="scss" module>
.tiptap-loop-text-effect-panel {
    // init
}
</style>
