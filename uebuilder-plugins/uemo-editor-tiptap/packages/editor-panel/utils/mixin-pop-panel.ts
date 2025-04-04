/*
 * @Description: 弹窗面板混合
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 16:55:30
 */

export function usePopPanelParam(
    type: Ref<keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap | undefined>,
    rectRef: Ref<UE_TIPTAP_UNIT.PositionRect | undefined>
) {
    return computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
        if (!rectRef.value || !type.value) return {};

        switch (type.value) {
            case "textDecoration":
                return {
                    draggable: true,
                    panel: {
                        position: {
                            refEl: { getBoundingClientRect: () => rectRef.value as any },
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

            default:
                return {};
        }
    });
}
