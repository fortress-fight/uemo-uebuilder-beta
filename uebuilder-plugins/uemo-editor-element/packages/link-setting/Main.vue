<!--
 * @Description: 链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-31 01:33:22
-->
<template>
    <UeElSettingBar
        :title="typeName"
        :infoText="infoText"
        :disable="disable"
        :class="$style['link-setting']"
        @triggerSetting="openLinkSettingPanel"
        ref="settingBarRef"
    />
    <UeElPopPanel v-model:open="linkSettingPanelOpen" v-bind="popPanelParams">
        <UeElLinkSettingPanel
            ref="linkSettingPanelRef"
            v-model:value="valueRef"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingBaseProps } from "./index";
import type { UeElLinkSettingPanelValue } from "../link-setting-panel";

import { usePopPanelParam } from "../../utils/pop-panel-mixin";
import UeElSettingBar from "../setting-bar";
import UeElLinkSettingPanel from "../link-setting-panel";
import { isImageReg, isVideoReg } from "@stone/uemo-editor-utils/lib/utils";

defineOptions({ name: "UeElLinkSetting" });

const { t } = useI18n();

const instance = getCurrentInstance();
const _props = withDefaults(defineProps<UeElLinkSettingBaseProps>(), {});
const valueRef = defineModel<UeElLinkSettingPanelValue>("value", { required: true });
const settingBarRef = useTemplateRef<InstanceType<typeof UeElSettingBar>>("settingBarRef");
const linkSettingPanelRef = useTemplateRef<InstanceType<typeof UeElLinkSettingPanel>>("linkSettingPanelRef");

const typeName = computed(() => {
    const type = valueRef.value.type;

    const typeNameMap = {
        link: t("LINK_WEBSITE"),
        frame: t("LINK_FRAME"),
        function: { anchor: t("LINK_ANCHOR"), download: t("LINK_DOWNLOAD"), image: t("LINK_IMAGE") },
    };

    if (type === "function") {
        return typeNameMap[type][valueRef.value.detail];
    } else {
        return typeNameMap[type] || "";
    }
});

const anchorMap = ref<UE_PLUGIN_OPTIONS.LinkAnchor[]>([]);

const infoText = computed(() => {
    const type = valueRef.value.type;

    if (type === "function") {
        // @ts-expect-error
        if (valueRef.value.detail === "image") {
            return t("LINK_TYPE", { type: t("LINK_IMAGE") });
        } else if (valueRef.value.detail === "anchor") {
            return anchorMap.value.find((item) => item.src === valueRef.value.link)?.name || "";
        } else {
            return valueRef.value.link || "";
        }
    } else if (type === "frame") {
        if (isImageReg.test(valueRef.value.link)) {
            return t("LINK_TYPE", { type: t("LINK_IMAGE") });
        } else if (isVideoReg.test(valueRef.value.link)) {
            return t("LINK_TYPE", { type: t("LINK_VIDEO") });
        } else {
            return t("LINK_ADDRESS");
        }
    } else {
        return valueRef.value.link || "";
    }
});

const linkSettingPanelOpen = ref(false);
function openLinkSettingPanel() {
    linkSettingPanelOpen.value = true;
}

/**
 * 弹窗位置配置
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    const result: UE_EL_COMPONENT.UeElPopPanelProps | undefined = usePopPanelParam(
        computed(() => settingBarRef.value?.$el)
    ).value;

    if (!result) return undefined;

    result.mask = {
        color: "transparent",
    };
    result.checkAllowClose = () => {
        const hasChange = linkSettingPanelRef.value?.checkHasUnsyncedChanges();
        if (hasChange) {
            return t("LINK_SETTING_UNSAVED_TIP");
        } else {
            return true;
        }
    };

    return result;
});

function handleConfirm() {
    linkSettingPanelOpen.value = false;
}

function handleCancel() {
    linkSettingPanelOpen.value = false;
}

onBeforeMount(() => {
    instance?.proxy?.$ueElLink?.anchor
        ?.getData()
        .then((res) => {
            anchorMap.value = res;
        })
        .catch((_error) => {
            instance?.proxy?.$ueElToast.error(t("LINK_ERROR_TIP_ANCHOR_ERROR"));
        });
});
</script>
<style lang="scss" module>
.link-setting {
    width: 100%;
}
</style>
