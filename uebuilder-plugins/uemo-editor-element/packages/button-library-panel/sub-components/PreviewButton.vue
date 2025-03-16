<template>
    <div
        class="flex items-center justify-center"
        ref="rootDom"
        :class="[$style['preview-button'], $pageStyle['page-editor']]"
    >
        <component ref="button" :class="$style['button']" :data="data" :is="componentName" />
    </div>
</template>
<script lang="ts" setup>
import $pageStyle from "../utils/app.module.scss";
import ButtonNormal from "./ButtonNormal.vue";
import ButtonRotate from "./ButtonRotate.vue";
import { UeElButton } from "../utils/initButtonEffect";

defineOptions({ name: "UeElPreviewButton", components: { ButtonNormal, ButtonRotate } });

const props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();
const buttonRef = useTemplateRef<InstanceType<typeof ButtonNormal>>("button");

const componentName = computed(() => {
    switch ((props.data.theme || "").split("-")[0]) {
        case "rotate": {
            return "ButtonRotate";
        }

        default:
            return "ButtonNormal";
    }
});

onMounted(() => {
    const ueButtonInstance = new UeElButton();

    if (!(buttonRef.value?.$el instanceof HTMLElement)) return;

    ueButtonInstance.initButton([buttonRef.value.$el]);

    onBeforeUnmount(() => {
        if (!(buttonRef.value?.$el instanceof HTMLElement)) return;
        ueButtonInstance.destroyButton([buttonRef.value.$el]);
    });
});
</script>
<style lang="scss" module>
.preview-button {
    @include ab-cover;
}
</style>
