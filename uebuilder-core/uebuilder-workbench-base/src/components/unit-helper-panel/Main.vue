<template>
    <div :class="$style['helper-panel']">
        <div :class="$style['btn--item']" @click="triggerHandler('showGuid')">
            <UeElIcon :class="$style['ic']" name="icon-app-quick" :size="15" />
            <span>{{ t("quickStart") }}</span>
        </div>
        <div :class="$style['btn--item']" @click="triggerHandler('showQR')">
            <UeElIcon :class="$style['ic']" name="icon-app-qr" :size="15" />
            <span>{{ t("userCommunication") }}</span>
        </div>
        <a
            :class="$style['btn--item']"
            href="https://q1j1jhhmkl.feishu.cn/wiki/B2A8wb3oeidX1DkugtccMRv2nbt"
            target="_blank"
        >
            <UeElIcon :class="$style['ic']" name="icon-app-doc" :size="15" />
            <span>{{ t("helpCenter") }}</span>
        </a>
    </div>
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <UebuilderWorkbenchUnitCommunicationQrcode v-if="showPopPanelType === 'showQR'" />
        <UebuilderWorkbenchUnitTutorialPanel
            v-else-if="showPopPanelType === 'showGuid'"
            @finish="showPopPanelType = undefined"
        />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import UebuilderWorkbenchUnitTutorialPanel from "../unit-tutorial-panel";
import UebuilderWorkbenchUnitCommunicationQrcode from "../unit-communication-qrcode";

const { t } = useI18n();
const showPopPanelType = ref<string>();
const popPanelOpen = computed({
    get: () => !!showPopPanelType.value,
    set: (value) => {
        void (!value && (showPopPanelType.value = undefined));
    },
});
const popPanelParams = ref<UE_EL_COMPONENT.UeElPopPanelProps>({
    autoClose: true,
    mask: { color: "rgba(0, 0, 0, 0.5)" },
});

function triggerHandler(type: "showGuid" | "showQR" | "hide") {
    showPopPanelType.value = type;
}
</script>
<style lang="scss" module>
.helper-panel {
    display: flex;
    overflow: hidden;
    flex-direction: column;

    width: 150px;
    padding: 10px;

    border-radius: var(--ue-border-radius--panel);
    background: #fff;
    box-shadow: var(--ue-shadow--lv1);

    gap: 5px;
    .btn--item {
        font-family: Microsoft YaHei;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px; /* 150% */

        display: flex;

        padding: 10px;

        cursor: pointer;
        text-align: center;

        color: color(var(--ue-font-color--deeper));
        border-radius: var(--ue-border-radius--lv1);

        align-items: center;
        .ic {
            margin-right: 10px;

            color: var(--ue-font-color);
        }
        &:hover {
            background: color(var(--ue-background-color));
        }
    }
}
</style>
