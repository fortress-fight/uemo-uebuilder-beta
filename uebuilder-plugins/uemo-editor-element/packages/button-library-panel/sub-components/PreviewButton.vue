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
import $ from "@stone/uemo-editor-utils/lib/jquery";
import { initIconParkComponent } from "@stone/uemo-editor-utils/lib/icon";
import { buttonCreator } from "../utils/initButtonEffect";

import $pageStyle from "../utils/app.module.scss";
import ButtonNormal from "./ButtonNormal.vue";
import ButtonRotate from "./ButtonRotate.vue";

defineOptions({ name: "UeElPreviewButton", components: { ButtonNormal, ButtonRotate } });

const props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();
const rootDom = useTemplateRef("rootDom");
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
    const iconparkDom = rootDom.value?.querySelectorAll("iconpark-icon");

    if (iconparkDom) {
        initIconParkComponent(iconparkDom);
    }

    const dotLottieDom = rootDom.value?.querySelectorAll("dotlottie-player");

    if (dotLottieDom) {
        import("@stone/uemo-editor-utils/lib/lottie").catch((err) => {
            console.error(err);
        });
    }

    if (props.data.theme !== "rotate" && buttonRef.value?.$el instanceof HTMLElement) {
        buttonCreator(props.data.theme || "normal", buttonRef.value.$el)
            .then(() => {
                //
            })
            .catch((err) => {
                console.error(err);
            });
    }
});

onBeforeUnmount(() => {
    if (props.data.theme !== "rotate" && buttonRef.value?.$el instanceof HTMLElement) {
        $(buttonRef.value.$el).data("buttonCreatorCtrl")?.destroy();
    }
});
</script>
<style lang="scss" module>
.preview-button {
    @include ab-cover;
}
</style>
