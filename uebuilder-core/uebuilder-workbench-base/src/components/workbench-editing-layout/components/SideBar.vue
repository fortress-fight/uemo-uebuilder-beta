<template>
    <div :class="$style['workbench-editing-layout-sidebar']" class="grid">
        <div :class="$style['oper-area']" class="grid">
            <div :class="$style['oper-group']">
                <div
                    v-for="item in operGroup"
                    :key="item.type"
                    v-ue-el-label="{ placement: 'right', content: item.name }"
                    :class="$style['oper-btn']"
                    :data-active="item.active"
                    class="flex justify-center items-center"
                >
                    <UeElIcon :name="item.icon" :size="18" />
                </div>
            </div>
            <div :class="$style['state--pos-bottom']">
                <slot name="helpCenter"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const operGroup = ref<{ type: string; name: string; icon: string; active?: boolean }[]>([
    { type: "pageSetting", name: t("pageSetting"), icon: "icon-shezhi" },
    { type: "themeSetting", name: t("themeSetting"), icon: "icon-app-theme" },
    { type: "plugin", name: t("plugin"), icon: "icon-app-plugin" },
]);
</script>
<style lang="scss" module>
.workbench-editing-layout-sidebar {
    border-right: 1px solid var(--editor-c-border--lighter);
    background: #fff;

    grid-template-columns: 40px auto;
    .oper-area {
        padding-top: 16px;
        padding-bottom: 16px;

        grid-template-rows: 1fr auto;
    }
    .oper-btn {
        height: 40px;

        cursor: pointer;

        color: var(--editor-c-gray);

        gap: 10px;
        &[data-active="true"],
        &:hover {
            color: #fff;
            background: color(var(--ue-color--blue));
        }
    }
}
</style>
