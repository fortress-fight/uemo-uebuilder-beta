<template>
    <div :class="pageStyle['page-editor']">
        <div
            :class="viewClassName"
            :style="getLoopTextBlockStyle(attrs)"
            v-bind="getLoopTextBlockCustomAttr(attrs)"
            ref="previewBox"
        >
            <div :class="pageStyle['loop-text-inner']">
                <!-- 前缀 -->
                <div
                    v-if="attrs.prefix"
                    :class="pageStyle['loop-text--prefix']"
                    :data-type="attrs.prefix.type"
                    :data-value="attrs.prefix.value"
                >
                    <span :class="pageStyle.text">{{ attrs.prefix.value }}</span>
                </div>
                <!-- 跑马灯文本组 -->
                <div :class="pageStyle['loop-text-group']">
                    <div
                        v-for="(item, index) in attrs.body || []"
                        :key="item.id"
                        :class="pageStyle['loop-text-item']"
                        :data-id="item.id"
                        :data-active="index === 0 ? '' : null"
                    >
                        <span :class="pageStyle['loop-text-item-text']">{{ item.title }}</span>
                    </div>
                </div>
                <!-- 后缀 -->
                <div
                    v-if="attrs.suffix"
                    :class="pageStyle['loop-text--suffix']"
                    :data-type="attrs.suffix.type"
                    :data-value="attrs.suffix.value"
                >
                    <span :class="pageStyle.text">{{ attrs.suffix.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    getLoopTextBlockStyle,
    getLoopTextBlockCustomAttr,
} from "@stone/uemo-editor-tiptap/packages/extension-loop-text/utils/render";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import pageStyle from "@stone/uemo-editor-tiptap/src/app.module.scss";

import { ueLoopText } from "../utils/ue-loop-text";

defineOptions({ name: "UeElTiptapEffectText" });

const props = defineProps<{ value: UE_TIPTAP_EXTENSION.LoopText["attrs"] }>();
const eventBus = mitt<{ update: undefined; destroy: undefined }>();

const attrs = computed(() => props.value);

const previewBox = useTemplateRef("previewBox");

const isPxFontSize = computed(() => {
    return attrs.value.fontSize?.endsWith("px");
});

const viewClassName = computed(() => {
    return [pageStyle["loop-text-block"], { ["text-" + parseInt(attrs.value.fontSize || "")]: isPxFontSize.value }];
});
defineExpose({
    init(scroller: HTMLElement) {
        if (!scroller) return;

        ueLoopText.updateDefaultParams({ scroller });

        const { kill } = ueLoopText.initLoopText([previewBox.value as HTMLElement], { scroller });

        eventBus.on("update", () => {
            ueLoopText.updateLoopText([previewBox.value as HTMLElement], true);
        });

        eventBus.on("destroy", () => {
            kill();
        });
    },
    update() {
        eventBus.emit("update");
    },
});

onBeforeUnmount(() => {
    eventBus.emit("destroy");
    eventBus.all.clear();
});
</script>
<style lang="scss" module>
.loop-text {
    // init
}
</style>
