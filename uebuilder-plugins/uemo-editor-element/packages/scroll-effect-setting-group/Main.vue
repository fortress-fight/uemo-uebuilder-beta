<!--
 * @Description: 滚动效果属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:03:28
-->
<template>
    <UeElSettingGroup :class="$style['scroll-effect-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef && valueRef.type" #body>
            <UeElSettingBar
                :title="t('UNIT_MODE')"
                :infoText="infoText"
                :class="$style['link-setting']"
                @triggerSetting="openLinkSettingPanel"
                ref="settingBarRef"
            />
        </template>
    </UeElSettingGroup>
    <UeElPopPanel v-model:open="scrollEffectSettingPanelOpen" v-bind="popPanelParams">
        <UeElScrollEffectSettingPanel ref="scrollEffectSettingPanelRef" v-if="valueRef" v-model:value="valueRef" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingGroupBaseProps } from "./index";
import type { UeElScrollEffectSettingPanelValue } from "../scroll-effect-setting-panel";

import UeElSettingBar from "../setting-bar";
import UeElScrollEffectSettingPanel from "../scroll-effect-setting-panel";
import { settingGroupPopPanelPropsKey } from "../setting-group";
import { editorGroupPopPanelPropsKey } from "../editor-group";
import { getPopPanelParams } from "../pop-panel/utils/helper";

defineOptions({ name: "UeElScrollEffectSettingGroup" });

const props = withDefaults(defineProps<UeElScrollEffectSettingGroupBaseProps>(), {
    defaultValue: () => ({ type: "opacity", options: {} }),
});
const valueRef = defineModel<UeElScrollEffectSettingPanelValue>("value", { required: false });
const settingBarRef = useTemplateRef<InstanceType<typeof UeElSettingBar>>("settingBarRef");
const scrollEffectSettingPanelRef =
    useTemplateRef<InstanceType<typeof UeElScrollEffectSettingPanel>>("scrollEffectSettingPanelRef");

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("SCROLL_EFFECT_SETTING_TITLE"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = props.defaultValue;
            break;

        case "remove":
            valueRef.value = undefined;
            break;

        default:
            break;
    }
};

const infoText = computed(() => {
    const effectOptions = [
        { text: t("SCROLL_EFFECT_SETTING_OPTION_TITLE"), value: "opacity" },
        { text: t("SCROLL_EFFECT_SETTING_ROTATE_TITLE"), value: "rotate" },
        { text: t("SCROLL_EFFECT_SETTING_PARALLAX_TITLE"), value: "parallax" },
        { text: t("SCROLL_EFFECT_SETTING_FIXED_TITLE"), value: "fixed" },
        { text: t("SCROLL_EFFECT_SETTING_STICKY_TITLE"), value: "sticky" },
        { text: t("SCROLL_EFFECT_SETTING_SCALE_TITLE"), value: "scale" },
        { text: t("SCROLL_EFFECT_SETTING_TRANSLATE_TITLE"), value: "translate" },
        { text: t("SCROLL_EFFECT_SETTING_IMAGE_PARALLAX_TITLE"), value: "image-parallax" },
    ];

    return effectOptions.find((item) => item.value === valueRef.value?.type)?.text || "";
});

const scrollEffectSettingPanelOpen = ref(false);
function openLinkSettingPanel() {
    scrollEffectSettingPanelOpen.value = true;
}

const injectSettingGroupPopPanelProps = inject(settingGroupPopPanelPropsKey, undefined);
const injectEditorGroupPopPanelProps = inject(editorGroupPopPanelPropsKey, undefined);

/**
 * 弹窗位置配置
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (injectSettingGroupPopPanelProps?.value) return injectSettingGroupPopPanelProps.value;
    if (injectEditorGroupPopPanelProps?.value) return injectEditorGroupPopPanelProps.value;

    if (!settingBarRef.value?.$el) return undefined;
    return getPopPanelParams("editorPanel", settingBarRef.value.$el);
});
</script>
<style lang="scss" module>
.scroll-effect-setting-group {
    //
}
</style>
