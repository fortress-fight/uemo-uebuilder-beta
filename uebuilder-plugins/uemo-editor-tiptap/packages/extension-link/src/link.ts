import type { Plugin } from "@tiptap/pm/state";
import type { Attribute } from "@tiptap/core";
import type { LinkAttrs } from "./index";

import { Mark, markPasteRule, mergeAttributes, getMarkAttributes } from "@tiptap/core";
import { find, registerCustomProtocol, reset } from "linkifyjs";

import $pageStyle from "../../../src/app.module.scss";
import { isTelNumberReg, isEmailReg } from "@stone/uemo-editor-utils/lib/utils";
import { autolink } from "../utils/auto-link";
import { clickHandler } from "../utils/click-handler";
import { pasteHandler } from "../utils/paste-handler";
import { isAllowedUri } from "../utils/helper";

/**
 * @deprecated 现在默认行为是在编辑器不可编辑时打开链接。
 */
type DeprecatedOpenWhenNotEditable = "whenNotEditable";

/**
 * 链接协议配置选项接口
 * @interface LinkProtocolOptions
 * @property {string} scheme - 协议名称
 * @property {boolean} [optionalSlashes] - 是否可选斜杠
 */
export interface LinkProtocolOptions {
    scheme: string;
    optionalSlashes?: boolean;
}

/**
 * 链接扩展配置选项接口
 * @interface LinkOptions
 */
export interface LinkOptions {
    /**
     * 是否启用自动链接功能
     */
    autolink: boolean;

    /**
     * 自定义协议数组
     */
    protocols: (LinkProtocolOptions | string)[];

    /**
     * 默认协议，当没有指定协议时使用
     * @default 'http'
     */
    defaultProtocol: string;

    /**
     * 如果启用，链接将在点击时打开
     * @default true
     * @example false
     */
    openOnClick: boolean | DeprecatedOpenWhenNotEditable;

    /**
     * 如果启用，粘贴时自动创建链接
     * @default true
     * @example false
     */
    linkOnPaste: boolean;
    /**
     * 渲染的 HTML 属性
     */
    HTMLAttributes: LinkAttrs;

    /**
     * @deprecated Use the `shouldAutoLink` option instead.
     * 验证函数，用于修改自动链接的链接验证
     * @param url - 待验证的 URL
     * @returns 如果 URL 有效，返回 true，否则返回 false
     */
    validate: (url: string) => boolean;

    /**
     * 验证函数，用于配置链接验证以防止 XSS 攻击
     * @returns 如果 URL 有效，返回 true，否则返回 false
     *
     * @example
     * isAllowedUri: (url, { defaultValidate, protocols, defaultProtocol }) => {
     * return url.startsWith('./') || defaultValidate(url)
     * }
     */
    isAllowedUri: (
        /**
         * 待验证的 URL
         */
        url: string,
        ctx: {
            /**
             * 默认验证函数
             */
            defaultValidate: (url: string) => boolean;
            /**
             * 允许的协议数组
             */
            protocols: (LinkProtocolOptions | string)[];
            /**
             * 默认协议
             */
            defaultProtocol: string;
        }
    ) => boolean;

    /**
     * 确定是否应该自动链接有效的链接
     * @param {string} url - 已经验证的 URL
     * @returns {boolean} 如果链接应该自动链接，返回 true，否则返回 false
     */
    shouldAutoLink: (url: string) => boolean;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        link: {
            /**
             * 打开链接编辑器面板
             */
            openLinkEditorPanel: (param: { rect: UE_TIPTAP_UNIT.PositionRect }) => ReturnType;

            /**
             * 设置一个链接标记
             */
            setLink: (attributes: MakeRequired<LinkAttrs, "link">) => ReturnType;

            /**
             * 取消一个链接标记
             */
            unsetLink: () => ReturnType;
        };
    }
}

/**
 * This extension allows you to create links.
 * @see https://www.tiptap.dev/api/marks/link
 */
export const Link = Mark.create<LinkOptions>({
    name: "link",

    priority: 1000,

    // 在分割时保持链接标记
    keepOnSplit: false,

    // 允许退出链接标记
    exitable: true,

    onCreate() {
        // 处理废弃的 validate 选项
        if (this.options.validate && !this.options.shouldAutoLink) {
            this.options.shouldAutoLink = this.options.validate;
            console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.");
        }

        // 注册自定义协议
        this.options.protocols.forEach((protocol) => {
            if (typeof protocol === "string") {
                registerCustomProtocol(protocol);
            } else {
                registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
            }
        });
    },

    onDestroy() {
        reset();
    },

    inclusive() {
        return this.options.autolink;
    },

    addOptions() {
        return {
            openOnClick: false,
            linkOnPaste: true,
            autolink: true,
            protocols: [],
            defaultProtocol: "http",
            HTMLAttributes: {
                type: "link",
                link: "",
                target: "_blank",
            },
            isAllowedUri: (url, ctx) => !!isAllowedUri(url, ctx.protocols),
            validate: (url) => !!url,
            shouldAutoLink: (url) => !!url,
        };
    },

    addAttributes(): Record<AllKeys<LinkAttrs>, Attribute> {
        return {
            type: {
                default: "link",
                parseHTML: (element) => element.getAttribute("data-type"),
            },
            link: {
                default: null,
                parseHTML: (element) => element.getAttribute("href"),
            },
            target: {
                default: "_blank",
                parseHTML: (element) => element.getAttribute("target"),
            },
            triggerArea: {
                default: null,
                parseHTML: (element) => element.getAttribute("data-trigger-area"),
            },
            detail: {
                default: null,
                parseHTML: (element) => element.getAttribute("data-detail"),
            },
            popLayer: {
                default: null,
                parseHTML: (element) => element.getAttribute("data-pop-layer"),
            },
        };
    },

    parseHTML() {
        return [
            // {
            //     tag:
            //         "a[href]:not([rel]):not([data-layout]):not(." +
            //         $pageStyle.btn +
            //         ")",
            //     contentElement(node) {
            //         const span = document.createElement("span");
            //         span.textContent = node.textContent;
            //         return span;
            //     },
            // },
            {
                tag: "a[href]:not([data-layout]):not(." + $pageStyle.btn + ")",
                getAttrs: (dom: HTMLElement) => {
                    const href = dom.getAttribute("href");
                    return !href || !isAllowedUri(href, this.options.protocols) ? false : null;
                },
            },
            {
                tag: "a[data-layout='0'],a[data-layout='4']",
                priority: 1000,
            },
        ];
    },

    renderHTML(param) {
        const HTMLAttributes = param.HTMLAttributes as LinkAttrs;

        if (!HTMLAttributes.link) {
            return ["p"];
        }

        const isUriAllowed = this.options.isAllowedUri(HTMLAttributes.link, {
            defaultValidate: (href) => !!isAllowedUri(href, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol,
        });

        if (!isUriAllowed) {
            return [
                "a",
                mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, href: "", class: $pageStyle.link }),
                0,
            ];
        }

        return [
            "a",
            mergeAttributes(this.options.HTMLAttributes, {
                ...HTMLAttributes,
                href: HTMLAttributes.link,
                class: $pageStyle.link,
            }),
            ["span", 0],
        ];
    },

    addCommands() {
        return {
            /**
             * 打开链接编辑器面板
             */
            openLinkEditorPanel:
                ({ rect }) =>
                ({ editor, state, commands }) => {
                    let linkAttr: LinkAttrs;
                    if (!editor.isActive("link")) {
                        linkAttr = {
                            type: "link",
                            link: "",
                            target: "_blank",
                        };
                    } else {
                        linkAttr = getMarkAttributes(state, this.name) as LinkAttrs;
                    }

                    commands.openAttrEditorPanel("link", linkAttr, {
                        rect,
                        setData: (attr) => {
                            editor.chain().setMarkSelection("link").run();

                            if (!attr.link) {
                                editor.chain().unsetLink().run();
                            } else {
                                editor
                                    .chain()
                                    .setLink(attr as MakeRequired<LinkAttrs, "link">)
                                    .run();
                            }
                        },
                        focus: () => {
                            commands.focus();
                        },
                    });
                    return true;
                },

            setLink:
                (attributes) =>
                ({ chain }) => {
                    const { type } = attributes;

                    if (type === "link") {
                        const { link: href, target } = attributes;
                        if (isTelNumberReg.test(href)) {
                            attributes.link = "tel:" + href;
                            attributes.target = target || "_self";
                        } else if (isEmailReg.test(href)) {
                            attributes.link = "mailto:" + href;
                            attributes.target = target || "_self";
                        }

                        if (
                            !this.options.isAllowedUri(href, {
                                defaultValidate: (url) => !!isAllowedUri(url, this.options.protocols),
                                protocols: this.options.protocols,
                                defaultProtocol: this.options.defaultProtocol,
                            })
                        ) {
                            return false;
                        }

                        return chain().focus().setMark(this.name, attributes).setMeta("preventAutolink", true).run();
                    }

                    return true;
                },

            unsetLink:
                () =>
                ({ chain }) =>
                    chain()
                        .focus()
                        .unsetMark(this.name, { extendEmptyMarkRange: true })
                        .setMeta("preventAutolink", true)
                        .run(),
        };
    },

    addPasteRules() {
        return [
            markPasteRule({
                find: (text) => {
                    if (!text) return [];

                    const { protocols, defaultProtocol } = this.options;
                    const links = find(text).filter(
                        (item) =>
                            item.isLink &&
                            this.options.isAllowedUri(item.value, {
                                defaultValidate: (href) => !!isAllowedUri(href, protocols),
                                protocols,
                                defaultProtocol,
                            })
                    );

                    return links.map((link) => ({
                        text: link.value,
                        data: { href: link.href },
                        index: link.start,
                    }));
                },
                type: this.type,
                getAttributes: (match) => ({
                    href: match.data?.href,
                }),
            }),
        ];
    },

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [];
        const { protocols, defaultProtocol } = this.options;

        if (this.options.autolink) {
            plugins.push(
                autolink({
                    type: this.type,
                    defaultProtocol,
                    validate: (url) =>
                        this.options.isAllowedUri(url, {
                            defaultValidate: (href) => !!isAllowedUri(href, protocols),
                            protocols,
                            defaultProtocol,
                        }),
                    shouldAutoLink: this.options.shouldAutoLink,
                })
            );
        }

        if (this.options.openOnClick === true) {
            plugins.push(
                clickHandler({
                    type: this.type,
                })
            );
        }

        if (this.options.linkOnPaste) {
            plugins.push(
                pasteHandler({
                    editor: this.editor,
                    defaultProtocol,
                    type: this.type,
                })
            );
        }

        return plugins;
    },
});
