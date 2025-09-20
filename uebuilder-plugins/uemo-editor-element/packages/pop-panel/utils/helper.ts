import type { EnhancedComputePositionConfig } from "@stone/uemo-editor-utils/lib/floating-ui";

/**
 * 弹窗面板的显示模式
 */
type PopPanelMode = "editorPanel" | "centerPanel";

/*
 * 弹窗面板的根ID
 */
export const UeElPopPanelRootId = Symbol() as InjectionKey<ComputedRef<string>>;

/**
 * 默认的位置配置
 */
const DEFAULT_POSITION_CONFIG: EnhancedComputePositionConfig = {
    placement: "right-start",
    middleware: [
        ["flip", { crossAxis: false }],
        ["offset", { mainAxis: 10 }],
        ["shift", { crossAxis: true, padding: 17 }],
    ],
};

/**
 * 获取弹窗面板的位置参数
 * @param mode - 弹窗面板的显示模式
 * @param dom - 参考元素
 * @param options - 自定义位置配置选项
 * @returns 弹窗面板的位置参数
 */
export function getPopPanelParams(
    mode: PopPanelMode = "editorPanel",
    dom: HTMLElement
): UE_EL_COMPONENT.UeElPopPanelProps {
    if (mode === "editorPanel") {
        return {
            draggable: true,
            panel: {
                position: {
                    refEl: dom,
                    options: DEFAULT_POSITION_CONFIG,
                },
            },
        };
    }
    return {
        draggable: false,
        autoClose: false,
        mask: { color: "rgba(0,0,0,0.2)" },
        panel: {
            position: "center",
        },
    };
}
