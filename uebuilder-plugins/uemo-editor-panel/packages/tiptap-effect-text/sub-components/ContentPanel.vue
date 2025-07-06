<template>
    <UeElSettingGroup :title="t('UNIT_CONTENT')" :isFirst="true" :class="$style['content-panel']">
        <template #body>
            <UeElControlGroup>
                <UeElTextInput
                    ref="contentInputRef"
                    type="textarea"
                    :value="content"
                    :required="true"
                    :useBlurConfirm="false"
                    @confirm="content = $event"
                />
                <UeElButton
                    :class="$style['update-btn']"
                    theme="fillText"
                    :text="t('CONFIRM')"
                    @trigger="updateContent"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.EffectText["attrs"]>("value", { required: true });

const contentInputRef = useTemplateRef("contentInputRef");

const content = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.content,
    set: (value, modelValue) => {
        modelValue.content = value;
        return modelValue;
    },
});

function updateContent() {
    contentInputRef.value?.confirm();
}
</script>
<style lang="scss" module>
.content-panel {
    .update-btn {
        margin-top: 4px;
    }
}
</style>
