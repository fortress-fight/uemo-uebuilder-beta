<template>
    <UeTiptapMenuButton ref="rootDom" type="moreOper" @trigger="openOperMenu" />
</template>
<script lang="ts" setup>
import type { TYPE_OPER_MENU_ITEM } from "../utils/more-oper-helper";

import { isNodeSelection } from "@tiptap/core";
import { UeElPopPanelRootId } from "@stone/uemo-editor-element/packages/pop-panel/utils/helper";
import { analyzeCopyInfo, getLocalClipboard } from "@stone/uemo-editor-utils/lib/clipboard/local-clipboard";

import { getExtensionOptions } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const props = defineProps<{ nodeName?: string }>();
const rootDom = useTemplateRef("rootDom");

const { t } = useI18n();

const rootId = inject(
    UeElPopPanelRootId,
    computed(() => "")
);

const selectNodeName = computed(() => {
    const state = editor?.state;
    if (!state) return undefined;

    if (props.nodeName) return props.nodeName;

    const { selection } = state;

    if (isNodeSelection(selection)) {
        return selection.node.type.name;
    }
    return undefined;
});

function getOperListLib(): TYPE_OPER_MENU_ITEM[][] {
    const nodeName = selectNodeName.value;

    if (!nodeName || !editor) return [];
    const { allowCopyAttrsType } = getExtensionOptions(editor, nodeName) || {};

    const copyAttrsSubList: TYPE_OPER_MENU_ITEM[][] = [];

    if (allowCopyAttrsType) {
        Object.entries(allowCopyAttrsType as Record<string, string[]>).forEach(([type, attrNames]) => {
            if (type === "all") {
                copyAttrsSubList.push([
                    {
                        type: "pastAttrs",
                        text: t("TIP_PASTE_ATTRS_ALL"),
                        param: { attrs: attrNames },
                        enable: (_nodeAttrs?: Record<string, any>) => {
                            return true;
                        },
                    },
                ]);
            }
            if (type === "design") {
                copyAttrsSubList.push([
                    {
                        type: "pastAttrs",
                        text: t("TIP_PASTE_ATTRS_DESIGN"),
                        param: { attrs: attrNames },
                        enable: (_nodeAttrs?: Record<string, any>) => {
                            return true;
                        },
                    },
                ]);
            }
            if (type === "effect") {
                copyAttrsSubList.push([
                    {
                        type: "pastAttrs",
                        text: t("TIP_PASTE_ATTRS_EFFECT"),
                        param: { attrs: attrNames },
                        enable: (_nodeAttrs?: Record<string, any>) => {
                            return true;
                        },
                    },
                ]);
            }
        });
    }
    return [
        [
            {
                type: "copyAttrs",
                text: t("TIP_COPY_ATTRS_TITLE"),
                enable: (nodeAttrs?: Record<string, any>) => {
                    if (!nodeAttrs || !allowCopyAttrsType) return false;
                    return true;
                },
            },
            {
                text: t("TIP_PASTE_ATTRS_TITLE"),
                enable: (nodeAttrs?: Record<string, any>) => {
                    if (!nodeAttrs || !allowCopyAttrsType) return false;

                    const localClipboard = getLocalClipboard();
                    if (!localClipboard) return false;

                    const { format } = localClipboard;
                    const { formatType, copyNodeName } = analyzeCopyInfo(format);

                    if (formatType !== "uebuilder/tiptap-attrs" || copyNodeName !== nodeName) {
                        return false;
                    }

                    return true;
                },
                subList: copyAttrsSubList,
            },
        ],
    ];
}

function calcOperList(list?: TYPE_OPER_MENU_ITEM[][]): UE_EL_COMPONENT.UeElContextmenuProps["list"] {
    const nodeName = selectNodeName.value;
    if (!nodeName || !list) return [];
    const nodeAttrs = editor?.getAttributes(nodeName);
    return list.map((menuGroup) => {
        return menuGroup.map((item) => ({
            type: item.type,
            text: item.text,
            param: item.param,
            enable: item.enable({ nodeName, nodeAttrs }),
            subList: calcOperList(item.subList),
        }));
    });
}

function openOperMenu() {
    const rect = rootDom.value?.$el as HTMLElement;

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel("moreOper", null, {
        popId: rootId.value,
        rect,
        props: { list: calcOperList(getOperListLib()) },
        updateAttrs: () => {
            //
        },
        fire: (
            type: string,
            param: { detail: { param: { attrs?: string[]; excludeAttr?: string[] } } } = { detail: { param: {} } }
        ) => {
            switch (type) {
                case "copyAttrs":
                    editor?.commands.copyAttrs();
                    break;

                case "pastAttrs":
                    editor?.commands.pasteAttrs({
                        attrs: param.detail.param.attrs,
                        excludeAttr: param.detail.param.excludeAttr,
                    });
                    break;
            }

            editor?.commands.closeAttrEditorPanel("moreOper");
        },
    });
}

onBeforeUnmount(() => {
    editor?.commands.closeAttrEditorPanel("moreOper");
});
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
