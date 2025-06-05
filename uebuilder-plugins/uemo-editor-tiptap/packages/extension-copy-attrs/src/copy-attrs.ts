import { Extension } from "@tiptap/core";
import { _pick, _omit } from "@stone/uemo-editor-utils/lib/lodash";
import {
    setLocalClipboard,
    getLocalClipboard,
    analyzeCopyInfo,
} from "@stone/uemo-editor-utils/lib/clipboard/local-clipboard";

import { i18n } from "../../../src/i18n";
import { getNodeName } from "../../../utils/tiptap-utils";

// 扩展 Tiptap 命令接口
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        copyAttrsExtension: {
            copyAttrs(): ReturnType;
            pasteAttrs(param: { attrs?: string[]; excludeAttr?: string[] }): ReturnType;
        };
    }
}

/**
 * 复制属性扩展
 * 提供复制属性的命令
 */
export const CopyAttrsExtension = Extension.create({
    name: "copyAttrsExtension",

    addCommands() {
        return {
            copyAttrs: () => () => {
                const nodeName = getNodeName(this.editor);

                if (nodeName) {
                    setLocalClipboard({
                        format: `uebuilder/tiptap-attrs:${nodeName}:attrs:all`,
                        content: this.editor?.getAttributes(nodeName),
                    });

                    this.editor.commands.showToast("success", i18n.global.t("TIP_COPY_ATTRS_SUCCESS"));
                }

                return true;
            },

            pasteAttrs:
                (param: { attrs?: string[]; excludeAttr?: string[] }) =>
                ({ chain }) => {
                    const nodeName = getNodeName(this.editor);
                    if (!nodeName) return false;

                    const localClipboard = getLocalClipboard();
                    if (!localClipboard) return false;

                    const { format, content } = localClipboard;
                    const { formatType, copyNodeName } = analyzeCopyInfo(format);
                    if (formatType !== "uebuilder/tiptap-attrs" || copyNodeName !== nodeName) {
                        return false;
                    }

                    let newAttrs: Record<string, any> = {};

                    if (param.attrs) {
                        newAttrs = _pick(content, param.attrs);
                    }

                    if (param.excludeAttr) {
                        newAttrs = _omit(content, param.excludeAttr);
                    }

                    chain().updateAttributes(nodeName, newAttrs).run();

                    this.editor.commands.showToast("success", i18n.global.t("TIP_PASTE_ATTRS_SUCCESS"));

                    return true;
                },
        };
    },
});
