<template>
    <div ref="rootDom" :class="[$style['test-area']]" class="grid justify-center" :data-layout="layout">
        <div :class="$style['area-title']" class="cursor-pointer" @click="copyData()">{{ title }}</div>
        <div :class="$pageStyle['page-editor']" class="flex justify-center items-center relative z-10">
            <slot :editor="tiptapEditor"></slot>
        </div>
        <TestDataPanel :value="testValue">
            <UeElSelect v-model:value="testValueSelect" title="测试数据" :options="testValueOptions" />
        </TestDataPanel>
    </div>
</template>
<script lang="ts" setup>
import type { Extensions } from "@tiptap/vue-3";

import { Editor } from "@tiptap/vue-3";

import copy from "@stone/uemo-editor-utils/lib/copy";
import TestDataPanel from "./TestDataPanel.vue";

import $pageStyle from "../../src/app.module.scss";
import { useProvideTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { createBubbleEditorExtension } from "../../utils/tiptap-bubble-extension";

type TYPE_TEST_AREA_PROPS = {
    useEditor?: boolean;
    editorExtension?: Extensions;
    layout?: string;
    title?: string;
    testValue?: any;
    testValueList?: any[];
    dataPanelWidth?: string;
};

const instance = getCurrentInstance();
const slots = useSlots();
const prop = withDefaults(defineProps<TYPE_TEST_AREA_PROPS>(), {
    title: "",
    layout: "layout1",
    testValueList: () => [],
});

// 测试数据
const testValueSelect = defineModel("testValueSelect", { default: 0 });
const testValueOptions = computed(() => {
    return prop.testValueList.map((item, index) => {
        return { value: index, text: item.testOptionTitle || "选项" + (index + 1) };
    });
});

const componentName = computed(() => {
    const defaultSlot = slots.default?.({})[0];
    // @ts-expect-error
    return defaultSlot?.type.name || "";
});

function copyData() {
    const isSuc = copy(componentName.value);

    if (isSuc) {
        instance?.proxy?.$ueElToast.success("复制成功");
    } else {
        instance?.proxy?.$ueElToast.error("复制失败");
    }
}

const tiptapEditor = shallowRef<Editor | undefined>();
const content = ref("测试气泡工具栏控件");

useProvideTiptapEditor(tiptapEditor);

onMounted(() => {
    if (!prop.useEditor) return;

    const extensions = prop.editorExtension || createBubbleEditorExtension();

    tiptapEditor.value = new Editor({
        injectCSS: false,
        content: content.value,
        extensions,
        editorProps: {
            attributes: {
                class: $pageStyle["ue-richtext-editor"],
            },
        },
    });
});
onBeforeUnmount(() => {
    if (tiptapEditor.value?.isDestroyed) return;
    tiptapEditor.value?.destroy();
});
</script>
<style lang="scss" module>
.test-area {
    position: relative;

    padding: 20px;

    border: 1px solid #eee;
    border-radius: 10px;

    gap: 20px;
    grid-template-columns: minmax(350px, 1fr) minmax(0, 1fr);
    &[data-layout="layout2"] {
        grid-template-columns: minmax(350px, 1fr) 500px;
    }
}
.area-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 2;

    position: absolute;
    bottom: 100%;

    width: 100%;
    margin-bottom: 6px;

    text-align: center;
}
</style>
