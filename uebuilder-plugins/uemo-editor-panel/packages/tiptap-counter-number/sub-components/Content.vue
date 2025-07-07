<template>
    <UeElSettingGroup
        ref="rootDomRef"
        :class="$style['tiptap-counter-number-content']"
        v-bind="settingGroupParams"
        @trigger="addItem"
    >
        <template v-if="sortList.length" #body>
            <UeElControlGroup>
                <UeElDraggable v-model:value="sortList" class="grid gap-1" ref="draggerListGroupRef">
                    <DraggerItem
                        v-for="item in sortList"
                        :key="item.id"
                        :disableRemove="sortList.length === 1"
                        @remove="removeItem(item.id)"
                    >
                        <div
                            :class="$style['text-item']"
                            class="grid"
                            :data-active="editorItemId === item.id"
                            @click="editorItem(item)"
                        >
                            <div :class="$style['preview-box']" class="flex items-center justify-center">
                                <div :class="$style['preview-inner']" class="flex items-center justify-center">
                                    <UeElIcon name="icon-app-font" :size="12" />
                                </div>
                            </div>
                            <div :class="$style['title']" :title="item.desc">
                                {{ item.numList[0] ?? "数字" }} 到 {{ item.numList[1] ?? "数字" }}
                            </div>
                        </div>
                    </DraggerItem>
                </UeElDraggable>
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <ContentEditorPanel v-if="editorItemValue" v-model:value="editorItemValue" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import DraggerItem from "@stone/uemo-editor-element/packages/draggable/sub-components/DraggerItem.vue";
import { usePopPanelParam } from "@stone/uemo-editor-element/utils/pop-panel-mixin";

import { guid } from "@stone/uemo-editor-utils/lib/guid";

import ContentEditorPanel from "./ContentEditorPanel.vue";

const valueRef = defineModel<UE_TIPTAP_EXTENSION.CounterNumber["attrs"]>("value", { required: true });
const { t } = useI18n();

const rootDomRef = useTemplateRef("rootDomRef");

const sortList = computed({
    get() {
        return valueRef.value.body || [];
    },
    set(value) {
        valueRef.value.body = value;
    },
});

/**
 * @description 设置组参数
 */
const settingGroupParams = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => ({
    title: t("UNIT_CONTENT"),
    oper: [
        {
            id: "addItem",
            type: "add",
        },
    ],
}));

const editorItemId = ref<string>("");

function addItem() {
    sortList.value.push({ ...valueRef.value.body[0], id: guid() });
}

function removeItem(id: string) {
    sortList.value = sortList.value.filter((item) => item.id !== id);
}

const popPanelOpen = ref(false);
const popPanelParams = usePopPanelParam(
    computed(() => {
        return rootDomRef.value?.$el as HTMLElement;
    })
);

function editorItem(item: UE_TIPTAP_EXTENSION.CounterNumber["attrs"]["body"][number]) {
    editorItemId.value = item.id;
    popPanelOpen.value = true;
}

const editorItemValue = computed({
    get() {
        return valueRef.value.body.find((item) => item.id === editorItemId.value);
    },
    set(value) {
        if (!value) return;
        valueRef.value.body = sortList.value.map((item) => (item.id === editorItemId.value ? value : item));
    },
});
</script>
<style lang="scss" module>
.tiptap-counter-number-content {
    .text-item {
        --bg-setting-border-color: transparent;

        font-size: 12px;
        line-height: 26px;

        padding: 0 var(--ue-editor-row-space--lv1) 0 0;

        border: 1px solid var(--bg-setting-border-color);
        border-radius: var(--ue-border-radius--lv1);

        grid-template-columns: auto 1fr;
        &:hover {
            --bg-setting-border-color: #{color(var(--ue-border-color))};
        }
        &[data-active="true"],
        &:focus-within {
            --bg-setting-border-color: #{color(var(--ue-color--active))};
        }
        .preview-box {
            min-width: 0;
            height: 100%;
            padding: 0 var(--ue-editor-row-space--lv1);
        }
        .preview-inner {
            @include square(16px);
            position: relative;

            overflow: hidden;

            border: 1px solid color(var(--ue-border-color));
            border-radius: var(--ue-border-radius--lv1);
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            .ic {
                font-size: 12px;
            }
        }
        .title {
            @include ellipse(1);
            font-size: 12px;

            min-width: 0;
            height: 100%;
        }
    }
}
</style>
