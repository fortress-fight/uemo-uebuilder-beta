<!--
 * @Description: 链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 23:07:58
-->
<template>
    <UeElEditorPanel
        :class="$style['link-setting']"
        :title="title || t('UNIT_LINK')"
        :isOperationEnabled="true"
        actionMode="confirmWithCancel"
        @cancel="handleCancel"
        @confirm="handleConfirm"
    >
        <!-- 链接类型 -->
        <UeElSettingGroup :title="t('LINK_TYPE_TITLE')" is-first>
            <template #body>
                <UeElSelect v-model:value="linkType" :title="t('UNIT_TYPE')" :options="linkTypeOptions" />
            </template>
        </UeElSettingGroup>

        <!-- 弹窗链接 -->
        <FrameLink v-if="localValueRef.type === 'frame'" v-model:value="localValueRef">
            <UeElSettingGroup v-if="enableTriggerArea" :title="t('LINK_TARGET_AREA')">
                <template #body>
                    <UeElSelect :title="t('UNIT_AREA')" :options="triggerOptions" v-model:value="triggerArea" />
                </template>
            </UeElSettingGroup>
        </FrameLink>

        <!-- 功能链接 -->
        <FunctionLink v-else-if="localValueRef.type === 'function'" v-model:value="localValueRef">
            <UeElSettingGroup v-if="enableTriggerArea" :title="t('LINK_TARGET_AREA')">
                <template #body>
                    <UeElSelect :title="t('UNIT_AREA')" :options="triggerOptions" v-model:value="triggerArea" />
                </template>
            </UeElSettingGroup>
        </FunctionLink>

        <!-- 网址链接 -->
        <NormalLink v-else-if="localValueRef.type === 'link'" v-model:value="localValueRef">
            <UeElSettingGroup v-if="enableTriggerArea" :title="t('LINK_TARGET_AREA')">
                <template #body>
                    <UeElSelect :title="t('UNIT_AREA')" :options="triggerOptions" v-model:value="triggerArea" />
                </template>
            </UeElSettingGroup>
        </NormalLink>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
import type { UeElLinkSettingPanelBaseProps, UeElLinkSettingPanelValue } from "./index";

import { useDetectModelChange } from "../../utils/model-mixin";
import FunctionLink from "./sub-components/FunctionLink.vue";
import FrameLink from "./sub-components/FrameLink.vue";
import NormalLink from "./sub-components/NormalLink.vue";
import { checkLink } from "./utils/helper";

defineOptions({ name: "UeElLinkSettingPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const _props = withDefaults(defineProps<UeElLinkSettingPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "cancel" | "confirm"): void }>();
const valueRef = defineModel<UeElLinkSettingPanelValue>("value", { required: true });

/**
 * 本地值引用，用于处理模型变更
 * @description 使用 useDetectModelChange 处理模型变更，支持自动同步和值转换
 */
const { localValueRef, valueChange, checkHasUnsyncedChanges, syncToParent } = useDetectModelChange(valueRef, {
    watchChange: true,
    autoUpdateParent: false,
    transformValue: (value) => {
        // NOTE: 如果类型为功能链接，且detail为image，则转换为弹窗链接
        // @ts-expect-error function 下 image 类型已废弃，转换为 frame 类型
        if (value.type === "function" && value.detail === "image") {
            return { type: "frame", link: value.link, triggerArea: value.triggerArea } as const;
        }
        return value;
    },
});

/**
 * 链接类型选项
 * @description 定义可选的链接类型，包括网址链接、弹窗链接、锚点链接和下载链接
 */
const linkTypeOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { text: t("LINK_TYPE", { type: t("LINK_WEBSITE") }), value: "link" },
    { text: t("LINK_TYPE", { type: t("LINK_FRAME") }), value: "frame" },
    { text: t("LINK_TYPE", { type: t("LINK_ANCHOR") }), value: "anchor" },
    { text: t("LINK_TYPE", { type: t("LINK_DOWNLOAD") }), value: "download" },
]);

/**
 * 触发区域选项
 * @description 定义链接触发区域的可选范围，从当前按钮到父级布局
 */
const triggerOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => {
    return [
        { value: "", text: t("LINK_TRIGGER_AREA_CURRENT") },
        { value: "areaBlockModule", text: t("LINK_TRIGGER_AREA_MODULE") },
        { value: "areaColModule", text: t("LINK_TRIGGER_AREA_BLOCK") },
        { value: "areaRowModule", text: t("LINK_TRIGGER_AREA_ROW") },
        { value: "areaGroupModule", text: t("LINK_TRIGGER_AREA_GROUP") },
    ];
});

/**
 * 触发区域
 * @description 控制链接的触发区域范围
 */
const triggerArea = computed({
    get() {
        return localValueRef.value.triggerArea || "";
    },
    set(v) {
        localValueRef.value.triggerArea = v;
    },
});

/**
 * 链接类型
 * @description 控制链接的类型，支持普通链接、弹窗链接和功能链接
 * @returns {string} 当前链接类型
 */
const linkType = computed({
    get() {
        if (localValueRef.value.type === "function") {
            return localValueRef.value.detail;
        }
        return localValueRef.value.type || "link";
    },
    set(v) {
        if (v === "link") {
            localValueRef.value = { type: v, link: "", target: "_blank" };
        } else if (v === "frame") {
            localValueRef.value = { type: v, link: "" };
        } else {
            localValueRef.value = { type: "function", detail: v, link: "" };
        }
    },
});

/**
 * 取消操作处理函数
 * @description 触发取消事件，通知父组件取消当前操作
 */
function handleCancel() {
    emit("cancel");
}

/**
 * 确认操作处理函数
 * @description 验证链接有效性并同步到父组件
 * @throws {Error} 当链接验证失败时抛出错误
 */
function handleConfirm() {
    const link = localValueRef.value.link;
    const type = localValueRef.value.type;
    const detail = type === "function" ? localValueRef.value.detail : undefined;

    const result = checkLink(type, { detail: detail || undefined, link });
    if (result !== true) {
        instance?.proxy?.$ueElToast.error(result);
        return;
    }

    syncToParent();
    emit("confirm");
}

/**
 * 组件暴露方法
 * @description 检查是否存在未同步的改变，用于关闭弹窗时的保存提示
 */
defineExpose({
    valueChange,
    checkHasUnsyncedChanges,
});
</script>

<style lang="scss" module>
.link-setting {
    //
}
</style>
