<template>
    <UeElSettingGroup :title="t('UNIT_CONTENT')" :isFirst="true">
        <template #body>
            <UeElControlGroup>
                <UeElTextInput type="textarea" :value="content" @confirm="content = $event" :required="true" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.EffectText["attrs"]>("value", { required: true });

const content = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.content,
    set: (value, modelValue) => {
        modelValue.content = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.content-panel {
    // init
}
</style>
