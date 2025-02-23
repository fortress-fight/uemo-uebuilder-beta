<template>
    <div ref="rootDom" :class="$style['test-area']" class="grid justify-center" :data-layout="layout">
        <div :class="$style['area-title']" class="cursor-pointer" @click="copyData()">{{ title }}</div>
        <div class="flex justify-center items-center relative z-10">
            <slot></slot>
        </div>
        <TestDataPanel :value="testValue">
            <UeElSelect v-model:value="testValueSelect" title="测试数据" :options="testValueOptions" />
        </TestDataPanel>
    </div>
</template>
<script lang="ts" setup>
import copy from "@stone/uemo-editor-utils/lib/copy";
import TestDataPanel from "./TestDataPanel.vue";

type TYPE_TEST_AREA_PROPS = {
    layout?: string;
    title?: string;
    testValue?: any;
    testValueList?: any[];
};

const instance = getCurrentInstance();
const rootDom = ref<HTMLElement>();
const slots = useSlots();
const prop = withDefaults(defineProps<TYPE_TEST_AREA_PROPS>(), {
    title: "",
    layout: "layout1",
    testValueList: () => [],
});

// 测试数据
const testValueSelect = defineModel("testValueSelect", { default: 0 });
const testValueOptions = computed(() => {
    return prop.testValueList.map((_item, index) => {
        return { value: index, text: "选项" + (index + 1) };
    });
});

const componentName = computed(() => {
    const defaultSlot = slots.default?.({})[0];
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
        grid-template-columns: minmax(350px, 1fr) 270px;
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
