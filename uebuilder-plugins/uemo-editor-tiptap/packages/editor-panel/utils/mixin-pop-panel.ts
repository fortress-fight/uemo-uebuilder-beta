/*
 * @Description: 弹窗面板混合
 * @Author: F-Stone
 * @LastEditTime: 2025-05-16 15:41:38
 */

export function usePopPanelParam(
    type: Ref<keyof UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"] | undefined>,
    rectRef: Ref<UE_TIPTAP_UNIT.PositionRect | undefined>,
    options: {
        checkAllowClose: UE_EL_COMPONENT.UeElPopPanelProps["checkAllowClose"];
    }
) {
    return computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
        if (!rectRef.value || !type.value) return {};

        const refEl =
            rectRef.value instanceof HTMLElement
                ? rectRef.value
                : { getBoundingClientRect: () => rectRef.value as any };

        switch (type.value) {
            case "textColor":
            case "fontFamily":
            case "fontSize":
            case "letterSpacing":
            case "textDecoration":
                return {
                    draggable: true,
                    panel: {
                        position: {
                            refEl,
                            options: {
                                placement: "bottom-start",
                                middleware: [
                                    ["offset", { mainAxis: 6 }],
                                    ["shift", { crossAxis: true, padding: 17 }],
                                ],
                            },
                        },
                    },
                };

            case "textAlign":
            case "lineHeight":
            case "editorAI":
                return {
                    draggable: false,
                    panel: {
                        position: {
                            refEl,
                            autoUpdate: true,
                            options: {
                                placement: "bottom",
                                middleware: [
                                    ["offset", { mainAxis: 6 }],
                                    ["shift", { crossAxis: true, padding: 17 }],
                                ],
                            },
                        },
                    },
                };

            case "moreOper":
                return {
                    draggable: false,
                    panel: {
                        position: {
                            refEl,
                            autoUpdate: true,
                            options: {
                                placement: "bottom-end",
                                middleware: [
                                    ["flip", { crossAxis: false }],
                                    ["offset", { mainAxis: 6 }],
                                    ["shift", { crossAxis: true, padding: 17 }],
                                ],
                            },
                        },
                    },
                };

            case "link":
                return {
                    draggable: true,
                    mask: { color: "transparent" },
                    checkAllowClose: options.checkAllowClose,
                    panel: {
                        position: {
                            refEl,
                            options: {
                                placement: "bottom-start",
                                middleware: [
                                    ["offset", { mainAxis: 6 }],
                                    ["shift", { crossAxis: true, padding: 17 }],
                                ],
                            },
                        },
                    },
                };

            case "buttonRow":
            case "buttonItem":
            case "image":
                return {
                    draggable: true,
                    checkAllowClose: options.checkAllowClose,
                    panel: {
                        position: {
                            refEl,
                            options: {
                                placement: "right-start",
                                middleware: [
                                    ["offset", { mainAxis: 6 }],
                                    ["shift", { crossAxis: true, padding: 17 }],
                                ],
                            },
                        },
                    },
                };

            default:
                return {};
        }
    });
}
