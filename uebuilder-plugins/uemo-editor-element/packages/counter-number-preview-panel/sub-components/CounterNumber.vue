<template>
    <div :class="pageStyle['page-editor']">
        <div
            ref="previewBox"
            :class="pageStyle['counter-number-block']"
            :style="getCounterNumberBlockStyle(attrs)"
            v-bind="getCounterNumberBlockCustomAttr(attrs)"
        >
            <div :class="pageStyle['counter-number-inner']">
                <div :class="pageStyle['counter-number-group']">
                    <div
                        v-for="item in attrs.body"
                        :key="item.id"
                        :class="pageStyle['counter-number-item']"
                        :data-id="item.id"
                        :data-nums="JSON.stringify(item.numList)"
                        :data-num-pad="item.numPad"
                    >
                        <div :class="pageStyle['counter-number-item-info']">
                            <div :class="pageStyle['counter-number-item-text']">
                                {{ item.numList[1]?.toString().padStart(getNumDecimal(item), "0") || "" }}
                            </div>
                            <div v-if="item.proxy" :class="pageStyle['counter-number-item-proxy']">
                                {{ item.proxy.value }}
                            </div>
                        </div>
                        <div v-if="item.desc" :class="pageStyle['counter-number-item-desc']">
                            {{ item.desc }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    getCounterNumberBlockStyle,
    getCounterNumberBlockCustomAttr,
} from "@stone/uemo-editor-tiptap/packages/extension-counter-number/utils/render";

import { ueCounterNumber } from "../utils/ue-counter-number";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import pageStyle from "@stone/uemo-editor-tiptap/src/app.module.scss";

const props = defineProps<{ value: UE_TIPTAP_EXTENSION.CounterNumber["attrs"] }>();
const eventBus = mitt<{ update: undefined; destroy: undefined }>();

const attrs = computed(() => props.value);

const previewBox = useTemplateRef("previewBox");

function getNumDecimal(item: UE_TIPTAP_EXTENSION.CounterNumber["attrs"]["body"][number]) {
    return Math.max(item.numPad || 0, item.numList[0]?.toString().length || 0, item.numList[1]?.toString().length || 0);
}

defineExpose({
    init(scroller: HTMLElement) {
        if (!scroller) return;

        ueCounterNumber.updateDefaultParams({ scroller });

        const { kill } = ueCounterNumber.initCounterNumber([previewBox.value as HTMLElement], { scroller });

        eventBus.on("update", () => {
            ueCounterNumber.updateCounterNumber([previewBox.value as HTMLElement], true);
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
.counter-number-preview {
    // init
}
</style>
