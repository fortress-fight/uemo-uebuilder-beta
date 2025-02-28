<!--
 * @Description: 数字输入框拖拽组件
 * @Author: F-Stone
-->
<template>
    <div
        class="cursor-ew-resize flex items-center"
        :class="$style['dragger-box']"
        v-ue-el-dragging="{ onStart, onChange }"
    >
        <slot>
            <div v-if="title" :class="$style['title-box']" class="flex items-center justify-center">
                <div v-if="title?.icon" :class="$style['icon-box']">
                    <UeElIcon :name="title.icon.name" :class="$style['ic']" :size="title.icon.size" />
                </div>
                <div v-if="title?.text" :class="$style['text-box']" class="flex items-center justify-center">
                    {{ title.text }}
                </div>
            </div>
            <div v-else :class="$style['dragger-bar']"></div>
        </slot>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "UeElNumberInputDragger" });

interface Props {
    title?: { icon?: { name: string; size?: number }; text?: string };
}

defineProps<Props>();

const emit = defineEmits<{
    start: [];
    change: [delta: number];
}>();

const onStart = () => {
    emit("start");
};

const onChange = (delta: number) => {
    emit("change", delta);
};
</script>

<style lang="scss" module>
.dragger-box {
    position: relative;
    .dragger-bar {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        min-width: var(--ue-editor-row-space--lv1);
        height: 100%;
    }
}
.title-box {
    min-width: 28px;
    height: 100%;

    color: color(var(--ue-font-color));
    .icon-box {
        padding: 0 var(--ue-editor-row-space--lv1);
    }
    .text-box {
        font-size: 12px;

        height: 100%;
        padding: 0 var(--ue-editor-row-space--lv1);

        border-right: 1px solid var(--text-border-color);
    }
}
</style>
