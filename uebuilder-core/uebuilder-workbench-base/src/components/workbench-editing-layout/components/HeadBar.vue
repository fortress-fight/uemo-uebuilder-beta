<template>
    <div :class="$style['workbench-editing-layout-head-bar']">
        <div :class="$style['inner']" class="grid">
            <div :class="$style['state-pos--left']" class="flex items-center">
                <slot name="siteLogo" />
                <div class="flex gap-2">
                    <button
                        class="flex items-center"
                        :class="$style['oper-btn']"
                        v-for="(item, index) in showOperBtns"
                        :key="index"
                    >
                        <UeElIcon v-if="item.icon" :class="$style['icon']" :name="item.icon" :size="15" />
                        <span class="text">{{ item.name }}</span>
                    </button>
                </div>
            </div>
            <div :class="$style['state-pos--center']" class="flex justify-center items-center">
                <div v-if="title" :class="$style['page-title']">{{ title }}</div>
            </div>
            <div :class="$style['state-pos--right']" class="inline-flex gap-2 justify-self-end">
                <!-- 适配设备控制 -->
                <div ref="agentController" :class="$style['agent-controller']">
                    <div ref="agentShadow" :class="$style['btn-shadow']"></div>
                    <div :class="$style['agent-inner']">
                        <div
                            :class="$style['agent-btn']"
                            class="flex items-center justify-center relative"
                            :data-active="currentDevice === 'desktop'"
                        >
                            <UeElIcon name="icon-desktop" :size="15" />
                        </div>
                        <div
                            :class="$style['agent-btn']"
                            class="flex items-center justify-center relative"
                            :data-active="currentDevice === 'mobile'"
                        >
                            <UeElIcon name="icon-mobile" :size="15" />
                        </div>
                    </div>
                </div>
                <!-- 页面预览 -->
                <div v-ue-el-label="t('previewPage')" :class="$style['btn--preview-page']">
                    <div :class="$style['icon-box']" class="flex items-center justify-center">
                        <UeElIcon name="icon-app-play" :size="15" />
                    </div>
                </div>

                <button class="flex items-center" :class="$style['oper-btn']">
                    <span class="text">{{ t("enterWorkbench") }}</span>
                </button>

                <slot name="siteSaveOper" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{ activeOperBtns?: string[]; hideOperBtns?: string[]; title?: string }>(), {
    hideOperBtns: () => [],
    activeOperBtns: () => [],
});
const { t } = useI18n();

const operBtns = ref<{ type: string; icon?: string; name: string; disable?: boolean; active?: boolean }[]>([
    { type: "add", icon: "icon-tianjia", name: t("addLayoutGroup") },
    { type: "replace", icon: "icon-replace", name: t("replacePage") },
    { type: "page-tree", icon: "icon-app-page-tree", name: t("pageStructure") },
    { type: "ai", icon: "icon-app-ai", name: t("AIHelper") },
    { type: "article", name: t("documentHelper") },
]);

const currentDevice = ref<"desktop" | "mobile">("desktop");

const showOperBtns = computed(() => {
    return operBtns.value
        .filter((item) => !props.hideOperBtns.includes(item.type))
        .map((item) => ({
            ...item,
            active: props.activeOperBtns.includes(item.type),
        }));
});
</script>
<style lang="scss" module>
.workbench-editing-layout-head-bar {
    font-size: 12px;
    .inner {
        min-width: 1100px;
        height: 100%;
        padding: 0 20px;

        border-bottom: 1px solid var(--editor-c-border--lighter);

        align-items: center;

        grid-template-columns: 540px 1fr 500px;
    }
    .oper-btn {
        line-height: 14px;

        padding: 6px 15px;

        cursor: pointer;

        color: var(--editor-color-text);
        border: 1px solid var(--editor-c-border--lighter);
        border-radius: 5px;
        background: #fff;
        .icon {
            margin-right: 4px;
        }
        &[data-active="true"] {
            color: #fff;
            border-color: transparent;
            background-color: var(--theme-layout-row);
        }
    }
    .btn--preview-page {
        height: 30px;

        cursor: pointer;
        &[data-active] {
            color: #fff;
            .icon-box {
                border-width: 0;
                background-color: var(--theme-layout-row);
            }
        }
        .icon-box {
            height: 100%;
            padding: 0 10px;

            border: 1px solid var(--editor-c-border--lighter);
            border-radius: 5px;
            background: #fff;
        }
    }
    .agent-controller {
        line-height: 1;

        position: relative;

        box-sizing: border-box;
        height: 30px;

        border: 1px solid var(--c-gray-90);
        border-radius: 4px;
        background-color: var(--c-gray-90);
        .agent-inner {
            display: flex;

            height: 100%;

            align-items: center;
        }
        .agent-btn {
            font-size: 20px;

            width: 38px;
            height: 100%;

            cursor: pointer;
            transition: color 0.36s ease;

            color: var(--c-gray-70);
            &[data-active="true"],
            &:hover {
                color: var(--c-black-20);
            }
        }
        .btn-shadow {
            position: absolute;
            top: 0;
            left: 0;

            width: 38px;
            height: 100%;

            border-radius: 3px;
            background-color: #fff;
        }
    }
}
</style>
