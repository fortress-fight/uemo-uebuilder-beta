<template>
    <div
        class="cursor-pointer"
        ref="rootDom"
        :class="$style['unsplash-preview']"
        :data-select="data.isActive"
        @click="useImageLink($event, data)"
    >
        <div :class="$style['item-box']" :style="{ '--width': data.width, '--height': data.height }">
            <img :src="data.src" />
        </div>
        <div :class="$style['author']">
            by
            <a target="_blank" :href="data.authorLink">{{ data.author }}</a>
            on
            <a href="https://unsplash.com/?utm_source=uebuilder&utm_medium=referral" target="_blank"> Unsplash </a>
        </div>
    </div>
    <UeElPopPanel v-model:open="optionIsOpen" :panel="popPanelParams">
        <UeElSelectOption :list="selectOptions" :value="select" @change="selectVideo" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UNSPLASH_IMAGE } from "../index";

const prop = defineProps<{ data: UNSPLASH_IMAGE; select?: string }>();
const emit = defineEmits<{ (e: "select", url: string): void }>();
const rootDomRef = useTemplateRef("rootDom");

const optionIsOpen = ref<boolean>(false);

/**
 * 计算弹出面板的参数
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps["panel"]} 弹出面板参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => ({
    position: {
        refEl: rootDomRef.value as HTMLElement,
        options: {
            placement: "right-start",
            middleware: [
                ["shift", { crossAxis: true, padding: 17, rootBoundary: "viewport" }],
                ["offset", () => ({ mainAxis: 4 })],
            ],
        },
    },
}));

const selectOptions = ref<UE_EL_COMPONENT.UeElSelectOptionProps["list"]>([
    { text: "800px", value: "800" },
    { text: "1080px", value: "1080" },
    { text: "1200px", value: "1200" },
    { text: "1600px", value: "1600" },
    { text: "1920px", value: "1920" },
    { text: "2560px", value: "2560" },
]);

function useImageLink(_ev: MouseEvent, _image: UNSPLASH_IMAGE) {
    optionIsOpen.value = true;
}

function selectVideo(value?: string | number) {
    if (!value) return;
    emit("select", prop.data.regularImgUrl + "&w=" + value);
    optionIsOpen.value = false;
}
</script>
<style lang="scss" module>
.unsplash-preview {
    width: calc(50% - 5px);
    margin-bottom: 10px;

    border-radius: var(--ue-border-radius--lv1);
    &[data-select="true"] {
        .item-box {
            &::before {
                box-shadow: inset 0 0 0 4px color(var(--ue-border-color--deeper)), inset 0 0 0 7px #fff;
            }
        }
    }
    .item-box {
        position: relative;

        overflow: hidden;

        border-radius: var(--ue-border-radius--lv1);
        img {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            object-fit: cover;
        }
        &::before {
            @include ab-cover;
            z-index: 10;

            content: "";
            pointer-events: none;
        }
        &::after {
            display: block;

            padding-bottom: calc(100% * (var(--height) / var(--width)));

            content: "";
            pointer-events: none;
        }
    }
}
.author {
    margin-top: 3px;

    color: color(var(--ue-font-color));
    a {
        text-decoration: underline;
    }
}
</style>
