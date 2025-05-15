<template>
    <component ref="button" :key="data.theme || ''" :class="$style['button']" :data="data" :is="componentName" />
</template>
<script lang="ts" setup>
import ButtonNormal from "./ButtonNormal.vue";
import ButtonRotate from "./ButtonRotate.vue";
import { ueElButton } from "./script";

defineOptions({ name: "UeElButtonDom", components: { ButtonNormal, ButtonRotate } });

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

let buttonControl: ReturnType<typeof ueElButton.initButton> | null = null;

watch(
    () => {
        const beforeSource = props.data.beforeSvgIcon?.source;
        const afterSource = props.data.afterSvgIcon?.source;
        const isLottie = beforeSource?.endsWith(".lottie") || afterSource?.endsWith(".lottie");

        return isLottie ? `${beforeSource},${afterSource}` : "";
    },
    () => {
        if (!buttonRef.value) return;
        buttonControl?.kill();
        requestAnimationFrame(() => {
            if (!buttonRef.value) return;
            buttonControl = ueElButton.initButton([buttonRef.value.$el]);
        });
    }
);

onMounted(() => {
    if (!(buttonRef.value?.$el instanceof HTMLElement)) return;

    buttonControl = ueElButton.initButton([buttonRef.value.$el]);

    watch(buttonRef, (button, oldButton) => {
        if (oldButton) {
            buttonControl?.kill();
        }
        if (button) {
            buttonControl = ueElButton.initButton([button?.$el]);
        }
    });

    onBeforeUnmount(() => {
        buttonControl?.kill();
        buttonControl = null;
    });
});
</script>
<style lang="scss" module>
.preview-button {
    @include ab-cover;
}
</style>
