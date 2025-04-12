import type { Editor } from "@tiptap/core";
import type { LinkOptions } from "../src";

/**
 * 粘贴时自动链接的正则表达式
 */
export const pasteRegex =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi;

// From DOMPurify
// https://github.com/cure53/DOMPurify/blob/main/src/regexp.js
// 忽略控制字符
const ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

/**
 * 检查 URI 是否允许
 * @param {string} uri - 待检查的 URI
 * @param {LinkOptions["protocols"]} [protocols] - 允许的协议列表
 * @returns {boolean} 是否允许该 URI
 */
export function isAllowedUri(uri: string | undefined, protocols?: LinkOptions["protocols"]) {
    const allowedProtocols: string[] = [
        "http",
        "https",
        "ftp",
        "ftps",
        "mailto",
        "tel",
        "callto",
        "sms",
        "cid",
        "xmpp",
    ];

    if (protocols) {
        protocols.forEach((protocol) => {
            const nextProtocol = typeof protocol === "string" ? protocol : protocol.scheme;
            if (nextProtocol) {
                allowedProtocols.push(nextProtocol);
            }
        });
    }

    return (
        !uri ||
        new RegExp(`^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`, "i").exec(
            uri.replace(ATTR_WHITESPACE, "")
        )
    );
}

export function getLinkAttr(editor: Editor) {
    return editor.getAttributes("link") as UE_TIPTAP_EXTENSION.LinkAttr;
}
