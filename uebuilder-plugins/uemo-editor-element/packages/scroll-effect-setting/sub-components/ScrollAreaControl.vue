<template>
    <UeElSettingGroup :class="$style['scroll-area']" title="运动范围">
        <template #body>
            <UeElControlGroup :col-count="1">
                <UeElSelect
                    v-model:value="startPos"
                    title="起始"
                    :options="startPosOptions"
                    :show-value-icon="true"
                    value-align="right"
                />
                <UeElSelect
                    v-if="triggerMode !== 'enter-leaver'"
                    v-model:value="endPos"
                    title="结束"
                    :options="endPosOptions"
                    :show-value-icon="true"
                    value-align="right"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "~/utils/model-mixin";

type TYPE_SCROLL_POS = { startPos: string; endPos: string };

const _props = defineProps<{ triggerMode: string }>();
const valueRef = defineModel<Partial<TYPE_SCROLL_POS>>("value", { required: true });

const startPos = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.startPos,
    set(v, modelValue) {
        const allowEndPos = getAllowEndPos(v);
        if (modelValue.endPos && !allowEndPos.includes(modelValue.endPos)) {
            modelValue.endPos = allowEndPos[0];
        }
        modelValue.startPos = v;
        return modelValue;
    },
});

const endPos = useDefineObjectModel(valueRef, {
    get: (modelValue) => {
        return modelValue.endPos;
    },
    set(v, modelValue) {
        modelValue.endPos = v;
        return modelValue;
    },
});

const posOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { text: "目标底部对齐窗口顶部时", value: "bottom top", icon: "icon-app-align-b-t" },
    { text: "目标顶部对齐窗口顶部时", value: "top top", icon: "icon-app-align-t-t" },
    { text: "目标中间对齐窗口中间时", value: "center center", icon: "icon-app-align-c-c" },
    { text: "目标底部对齐窗口底部时", value: "bottom bottom", icon: "icon-app-align-b-b" },
    { text: "目标顶部对齐窗口底部时", value: "top bottom", icon: "icon-app-align-t-b" },
]);

function getAllowEndPos(startPos: string | undefined) {
    const condition: string[] = [];
    switch (startPos) {
        case "top top":
            condition.push("bottom top");
            break;
        case "center center":
            condition.push("bottom top", "top top");
            break;
        case "bottom bottom":
            condition.push("bottom top", "top top", "center center");
            break;
        case "top bottom":
            condition.push("bottom top", "top top", "center center", "bottom bottom");
            break;

        default:
            break;
    }
    return condition;
}

const startPosOptions = computed(() => {
    return posOptions.value.filter((item) => !["bottom top"].includes(item.value as string));
});
const endPosOptions = computed(() => {
    return posOptions.value.filter((item) => getAllowEndPos(startPos.value).includes(item.value as string));
});
</script>
<style lang="scss" module>
.scroll-area {
    // init
}
</style>
