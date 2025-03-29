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
import $pageStyle from "../utils/ue-button/app.module.scss";
import ButtonNormal from "./ButtonNormal.vue";
import ButtonRotate from "./ButtonRotate.vue";
import { UeElButton } from "../utils/ue-button";

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

    const { kill } = ueButtonInstance.initButton([buttonRef.value.$el]);

    onBeforeUnmount(() => {
        kill();
    });
});
</script>
<style lang="scss" module>
.preview-button {
    @include ab-cover;
}
</style>
