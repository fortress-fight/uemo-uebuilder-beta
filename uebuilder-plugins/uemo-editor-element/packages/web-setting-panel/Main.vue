<!--
 * @Description: 网页设置面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 01:25:13
-->
<template>
    <UeElEditorPanel
        :class="$style['web-setting']"
        :title="t('UNIT_WEB')"
        :isOperationEnabled="true"
        actionMode="confirmWithCancel"
        @cancel="handleCancel"
        @confirm="handleConfirm"
    >
        <UeElSettingGroup :title="t('WEB_URL')">
            <template #body>
                <UeElTextInput
                    ref="inputRef"
                    :auto-trim="true"
                    theme="enterText"
                    :value="webUrl"
                    :rules="webInputRules"
                    :placeholder="t('LINK_ADDRESS_INPUT_TIP')"
                    :required="true"
                    @confirm="inputConfirm"
                />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElWebSettingPanelBaseProps } from "./index";

import { isWebReg } from "@stone/uemo-editor-utils/lib/utils";

defineOptions({ name: "UeElWebSettingPanel" });
const _prop = withDefaults(defineProps<UeElWebSettingPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "cancel"): void; (e: "confirm", coordinates: string): void }>();

const inputRef = useTemplateRef("inputRef");

const { t } = useI18n();

const webUrl = ref<string>("");

const webInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isWebReg, message: t("WEB_URL_INPUT_TIP") }];

function inputConfirm(value: string) {
    webUrl.value = value;
    handleConfirm();
}

/**
 * 取消操作处理函数
 * @description 触发取消事件，通知父组件取消当前操作
 */
function handleCancel() {
    emit("cancel");
}

/**
 * 确认操作处理函数
 */
function handleConfirm() {
    emit("confirm", webUrl.value);
}

onMounted(() => {
    requestAnimationFrame(() => {
        inputRef.value?.focus();
    });
});
</script>
<style lang="scss" module>
.web-setting-panel {
    //
}
</style>
