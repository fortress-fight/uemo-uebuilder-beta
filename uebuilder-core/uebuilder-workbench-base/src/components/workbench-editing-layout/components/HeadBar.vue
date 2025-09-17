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
                    <div ref="tabShadowRef" :class="$style['btn-shadow']"></div>
                    <div :class="$style['agent-inner']">
                        <div
                            v-for="(item, index) in deviceOptions"
                            :key="index"
                            ref="deviceOptionsRef"
                            :class="$style['agent-btn']"
                            class="flex items-center justify-center relative"
                            :data-active="currentDevice === item.type"
                            :data-type="item.type"
                            @click="tabDevice(item.type)"
                        >
                            <UeElIcon :name="item.icon" :size="15" />
                        </div>
                    </div>
                </div>
                <!-- 页面预览 -->
                <div
                    v-ue-el-label="t('previewPage')"
                    :class="$style['btn--preview-page']"
                    @click="tabWorkbenchStateToPreview"
                >
                    <div :class="$style['icon-box']" class="flex items-center justify-center">
                        <UeElIcon name="icon-app-play" :size="15" />
                    </div>
                </div>

                <button class="flex items-center" :class="$style['oper-btn']" @click="tabWorkbenchStateToBrowsing">
                    <span class="text">{{ t("enterWorkbench") }}</span>
                </button>

                <slot name="siteSaveOper" />
            </div>
        </div>
        <slot name="siteOperPanel" />
    </div>
</template>
<script lang="ts" setup>
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

import { useUeBuilderWorkbenchStore } from "../../../store/store-workbench";

const props = withDefaults(defineProps<{ activeOperBtns?: string[]; hideOperBtns?: string[]; title?: string }>(), {
    hideOperBtns: () => [],
    activeOperBtns: () => [],
});
const emit = defineEmits<{
    (e: "trigger", type: "tabWorkbenchStateToBrowsing" | "tabWorkbenchStateToPreview"): void;
}>();

const { t } = useI18n();

const workbenchStore = useUeBuilderWorkbenchStore();

const tabShadowRef = useTemplateRef<HTMLElement>("tabShadowRef");
const currentDevice = computed(() => workbenchStore.workbenchState.device);
const deviceOptionsRef = useTemplateRef<HTMLElement[]>("deviceOptionsRef");
const deviceOptions = ref<{ type: UE_BUILDER.DeviceType; icon: string }[]>([
    { type: "desktop", icon: "icon-desktop" },
    { type: "mobile", icon: "icon-mobile" },
]);

/**
 * 切换设备
 */
function tabDevice(type: UE_BUILDER.DeviceType) {
    // TASK 需要检测是否满足切换设备的条件
    workbenchStore.setWorkbenchDevice(type);
}

watch(currentDevice, (device: UE_BUILDER.DeviceType) => {
    const activeItem = deviceOptionsRef.value?.find((item) => {
        return item.dataset.type === device;
    });
    gsap.to(tabShadowRef.value, {
        left: activeItem?.offsetLeft,
        width: activeItem?.offsetWidth,
        ease: "easeOutQuart",
        duration: 0.26,
    });
});

const operBtns = ref<{ type: string; icon?: string; name: string; disable?: boolean; active?: boolean }[]>([
    { type: "add", icon: "icon-tianjia", name: t("addLayoutGroup") },
    { type: "replace", icon: "icon-replace", name: t("replacePage") },
    { type: "page-tree", icon: "icon-app-page-tree", name: t("pageStructure") },
    { type: "ai", icon: "icon-app-ai", name: t("AIHelper") },
    { type: "article", name: t("documentHelper") },
]);

const showOperBtns = computed(() => {
    return operBtns.value
        .filter((item) => !props.hideOperBtns.includes(item.type))
        .map((item) => ({
            ...item,
            active: props.activeOperBtns.includes(item.type),
        }));
});

function tabWorkbenchStateToBrowsing() {
    emit("trigger", "tabWorkbenchStateToBrowsing");
}

function tabWorkbenchStateToPreview() {
    emit("trigger", "tabWorkbenchStateToPreview");
}
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
