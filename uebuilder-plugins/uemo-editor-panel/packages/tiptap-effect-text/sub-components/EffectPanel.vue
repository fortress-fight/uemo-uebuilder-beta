<template>
    <UeElSettingGroup :title="t('UNIT_CONTENT')" :isFirst="true">
        <template #body>
            <UeElControlGroup> {{ valueModel }} </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.EffectText["attrs"]>("value", { required: true });
</script>
<style lang="scss" module>
.content-panel {
    // init
}
</style>
