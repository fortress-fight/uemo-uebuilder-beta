<template>
    <div :class="$style['data-panel']" class="flex items-center justify-center">
        <div :class="$style['data-select']">
            <slot></slot>
        </div>
        <pre :class="$style['data']" v-html="source"></pre>
        <button :class="$style['btn--copy']" @click="copyData()">
            <UeElIcon name="icon-editor-copy" />
        </button>
    </div>
</template>
<script lang="ts" setup>
import copy from "@stone/uemo-editor-utils/lib/copy";

const instance = getCurrentInstance();
const prop = defineProps<{ value: any }>();

const source = computed(() => {
    return JSON.stringify(prop.value, null, 4);
});

function copyData() {
    const isSuc = copy(source.value);
    if (isSuc) {
        instance?.proxy?.$ueElToast.success("复制成功");
    } else {
        instance?.proxy?.$ueElToast.error("复制失败");
    }
}
</script>
<style lang="scss" module>
.data-panel {
    position: relative;

    height: 100%;

    border: 1px solid #eee;
    border-radius: 6px;
    .data-select {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .data {
        padding: 60px;
    }
    .btn--copy {
        @include square(28px);
        position: absolute;
        top: 10px;
        right: 10px;

        display: flex;

        color: #999;
        border: 1px solid #eee;
        border-radius: var(--ue-border-radius--lv1);

        align-items: center;
        justify-content: center;
        &:hover {
            color: #fff;
            border-color: #000;
            background-color: #000;
        }
    }
}
</style>
