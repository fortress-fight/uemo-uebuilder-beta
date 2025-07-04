/*
 * @Description: 弹窗面板混合
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 14:05:24
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
            case "tableScale":
            case "tableAlign":
                return {
                    draggable: false,
                    panel: {
                        position: {
                            refEl,
                            autoUpdate: true,
                            options: {
                                placement: "bottom",
                                middleware: [
                                    ["flip", { crossAxis: false }],
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
            case "svgIcon":
            case "frame":
            case "svgView":
            case "spline":
            case "lottie":
            case "gridGroup":
            case "gridItem":
            case "dividerBlock":
            case "hrRule":
            case "tableScale":
            case "table":
            case "shareRow":
            case "shareItem":
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
