<template>
    <div :class="$style['entry-layout']" class="w-full h-full">
        <div class="l-preview">
            <div v-if="!previewPageData.data" class="thumb-placeholder">
                previewPageData.data: {{ previewPageData.data }}
            </div>
        </div>
        <div :class="$style['l-mask']"></div>
        <div :class="$style['l-oper']" class="flex flex-col items-center justify-center">
            <div
                :class="[$style['btn--oper']]"
                class="flex items-center"
                :data-type="operBtn.type"
                @click="trigger(operBtn.type)"
            >
                <div :class="$style['icon-wrapper']">
                    <div :class="$style['icon-box']" class="justify-center items-center flex">
                        <UeElIcon :name="operBtn.icon.icon" :size="operBtn.icon.size" />
                    </div>
                </div>
                <div :class="$style['inner-box']">
                    <div :class="$style['btn-title']">
                        {{ operBtn.title }}
                    </div>
                    <div :class="$style['btn-desc']">
                        {{ operBtn.desc }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUeBuilderWorkbenchStore } from "../store/store-workbench";

type OperBtn = { type: string; title: string; desc: string; icon: { icon: string; size: number } };

const emit = defineEmits<{ (e: "trigger", type: string): void }>();
const workbenchStore = useUeBuilderWorkbenchStore();

const btnMap = {
    page: {
        add: {
            type: "add",
            title: "创建页面",
            desc: "点击创建新的编辑页面",
            icon: { icon: "icon-tianjia", size: 15 },
        },
        editor: {
            type: "editor",
            title: "编辑页面",
            desc: "点击进入编辑窗口",
            icon: { icon: "icon-bianji", size: 16 },
        },
    },
    layout: {
        add: {
            type: "addLayout",
            title: "创建布局",
            desc: "点击创建新的布局",
            icon: { icon: "icon-tianjia", size: 15 },
        },
        editor: {
            type: "editorLayout",
            title: "编辑布局",
            desc: "点击进入编辑窗口",
            icon: { icon: "icon-bianji", size: 16 },
        },
    },
};

const previewPageData = computed(() => workbenchStore.currentPreviewPageData);

const operBtn = computed<OperBtn>(() => {
    const config = workbenchStore.workbenchConfig;

    if (config.workbenchType === "layout") {
        return previewPageData.value.data ? btnMap.layout.editor : btnMap.layout.add;
    } else {
        return previewPageData.value.data ? btnMap.page.editor : btnMap.page.add;
    }
});

const trigger = (type: string) => {
    emit("trigger", type);
};

function initialWorkbenchPreviewChannel() {
    setTimeout(() => {
        workbenchStore.stopPageLoading();
    }, 2000);
}

onBeforeMount(() => {
    workbenchStore.startPageLoading("entry");
});

onMounted(() => {
    initialWorkbenchPreviewChannel();
});

onBeforeUnmount(() => {
    workbenchStore.stopPageLoading();
});
</script>
<style lang="scss" module>
.entry-layout {
    position: relative;
    &:hover {
        .l-mask {
            opacity: 1;
        }
        .l-oper {
            visibility: visible;

            opacity: 1;
        }
    }
    .l-mask {
        @include ab-cover;

        transition: 0.16s;

        opacity: 0;
        background: rgb(0 0 0 / 0.7);
    }
    .l-oper {
        @include ab-cover;
        z-index: 100;

        visibility: hidden;

        transition: 0.36s ease;

        opacity: 0;
        .btn--oper {
            --theme-color: #fff;
            position: relative;

            min-width: 220px;
            padding: 10px 15px;

            cursor: pointer;

            border-radius: 100px;
            background-color: #fff;
            .icon-wrapper {
                position: relative;
                z-index: 100;

                margin-right: 20px;
            }
            .icon-box {
                @include circle(36px);

                color: #fff;
                background-color: var(--theme-color);
            }
            .inner-box {
                overflow: hidden;
            }
            .btn-title {
                font-size: 16px;
                line-height: 24px;

                color: var(--editor-color-text);
            }
            .btn-desc {
                @include ellipse();
                font-size: 12px;
                line-height: 15px;

                margin-top: 2px;

                color: var(--editor-c-gray);
            }
            &[data-type="add"],
            &[data-type="addLayout"] {
                --theme-color: var(--theme-layout-group);
            }
            &[data-type="editorLayout"],
            &[data-type="editor"] {
                --theme-color: var(--theme-layout-row);
            }
            &[data-type="upload"] {
                --theme-color: var(--theme-layout-col);
            }
            &[data-type="download"] {
                --theme-color: var(--editor-color-text);
            }
        }
    }
}
</style>
