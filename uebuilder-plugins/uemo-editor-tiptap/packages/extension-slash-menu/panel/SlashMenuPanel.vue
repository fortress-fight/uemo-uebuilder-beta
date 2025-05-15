<template>
    <UeElPopPanel :class="$style['slash-menu-panel']" v-model:open="showPopPanel" v-bind="popPanelParams">
        <div :class="$style['slash-menu-panel-content']">
            <div ref="popPanelRef" :class="$style['slash-menu-group-list']">
                <div></div>
                <template v-if="items.length > 0">
                    <UeElSettingGroup
                        v-for="(group, index) in items"
                        :key="index"
                        :class="$style['slash-menu-group']"
                        :title="group.title"
                    >
                        <div :class="$style['menu-list']" class="grid">
                            <button
                                v-for="item in group.list"
                                ref="btns"
                                :key="item.name"
                                :class="$style['menu-item']"
                                class="flex items-center"
                                :data-active="selectName === item.name"
                                @click="handleItemSelect(item.name)"
                            >
                                <template v-if="operMap[item.name]">
                                    <div class="flex items-center justify-center" :class="$style['icon']">
                                        <UeElIcon
                                            v-if="operMap[item.name].icon"
                                            :name="operMap[item.name].icon || ''"
                                        />
                                    </div>
                                    <div :class="$style['intro']">
                                        <div :class="$style['title']">
                                            <span class="text">
                                                {{ operMap[item.name].title }}
                                            </span>
                                        </div>
                                        <div :class="$style['subtitle']">
                                            <span class="text">
                                                {{ operMap[item.name].subtitle }}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </button>
                        </div>
                    </UeElSettingGroup>
                </template>
                <div v-else :class="$style['empty-panel']">{{ t("NOT_FOUND_MODULE") }}</div>
            </div>
        </div>
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/core";
import type { SlashMenuSuggestionItem } from "../src";

import { operMap } from "../../../utils/tiptap-oper-manage";

defineOptions({ inheritAttrs: false });

const { t } = useI18n();

/**
 * 组件属性定义
 */
const props = defineProps<{
    editor: Editor;
    clientRect: () => DOMRect;
    items: SlashMenuSuggestionItem[];
    command: (props: { name: string }) => void;
}>();

/**
 * 当前选中的索引
 */
const selectedIndex = ref<number>(0);

/**
 * 按钮元素引用
 */
const btns = useTemplateRef<HTMLElement[]>("btns");

/**
 * 弹出面板显示状态
 */
const showPopPanel = ref<boolean>(false);

/**
 * 处理向上选择
 */
function handleUpSelect() {
    selectedIndex.value = (selectedIndex.value + nameList.value.length - 1) % nameList.value.length;
}

/**
 * 处理向下选择
 */
function handleDownSelect() {
    selectedIndex.value = (selectedIndex.value + 1) % nameList.value.length;
}

/**
 * 处理回车选择
 */
function handleEnterSelect() {
    handleItemSelect(selectName.value);
}

/**
 * 处理项目选择
 * @param name - 选中的项目名称
 */
function handleItemSelect(name: string) {
    props.command({ name });
}

/**
 * 监听选中索引变化，自动滚动到可见区域
 */
watch(selectedIndex, (index) => {
    btns.value?.[index]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
    });
});

/**
 * 计算所有可选项的名称列表
 */
const nameList = computed(() => {
    return props.items.reduce<string[]>((acc, group) => {
        return [...acc, ...group.list.map((item) => item.name)];
    }, []);
});

/**
 * 当前选中的项目名称
 */
const selectName = computed(() => {
    return nameList.value[selectedIndex.value] || "";
});

/**
 * 弹出面板配置参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps>(() => ({
    autoClose: false,
    draggable: false,
    zIndex: 100001,
    panel: {
        position: {
            autoUpdate: true,
            options: {
                strategy: "fixed",
                placement: "bottom-start",
                middleware: [
                    ["flip", { crossAxis: true, padding: 17 }],
                    ["offset", { mainAxis: 10 }],
                ],
            },
            refEl: {
                getBoundingClientRect: props.clientRect,
            },
        },
    },
}));

/**
 * 组件对外暴露的方法
 */
defineExpose({
    openPopPanel: () => {
        showPopPanel.value = true;
    },
    closePopPanel: () => {
        showPopPanel.value = false;
    },
    onKeyDown: (param: { event: KeyboardEvent }) => {
        const { event } = param;

        switch (event.key) {
            case "ArrowUp":
                handleUpSelect();
                return true;
            case "ArrowDown":
                handleDownSelect();
                return true;
            case "Enter":
                if (!selectName.value) {
                    return false;
                }
                handleEnterSelect();
                return true;
            default:
                return false;
        }
    },
});
</script>
<style lang="scss" module>
.slash-menu-panel {
    //
}
.slash-menu-panel-content {
    font-size: 13px;
    line-height: 1.4;

    position: relative;

    overflow: hidden;

    white-space: nowrap;

    color: color(var(--ue-font-color--deeper));
    border-radius: var(--ue-border-radius--lv2);
    background: #fff;
    background-color: #fff;
    box-shadow: var(--ue-tiptap-shadow);
    .slash-menu-group-list {
        overflow: auto;

        max-height: 350px;

        overscroll-behavior: none;
    }
    .slash-menu-group {
        &:last-of-type::after {
            display: none;
        }
    }
    .empty-panel {
        font-size: 14px;

        width: 300px;
        padding: 20px;

        text-align: center;

        color: color(var(--ue-font-color));
    }
    .menu-list {
        gap: 4px;
    }
    .menu-item {
        font-size: 14px;

        width: 100%;
        padding: 6px;

        text-align: left;

        color: color(var(--ue-font-color--deeper));
        border-radius: var(--ue-border-radius--lv1);
        outline: 0;

        align-items: center;
        &:hover,
        &[data-active="true"] {
            background-color: color(var(--ue-tiptap-background-color));
        }
        .title {
            font-size: 12px;
            font-weight: 700;
            line-height: 1.2;

            margin-bottom: 1px;
        }
        .subtitle {
            font-size: 12px;
            line-height: 1.3;

            color: color(var(--ue-font-color));
        }
        .intro {
            min-width: 230px;
        }
    }
    .icon {
        @include square(36px);
        margin-right: 10px;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        background-color: #fff;
    }
}
</style>
