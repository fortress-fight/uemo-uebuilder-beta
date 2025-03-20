import type { EnhancedComputePositionConfig } from "@stone/uemo-editor-utils/lib/floating-ui";

/**
 * 弹窗面板的显示模式
 */
type PopPanelMode = "editorPanel" | "customPanel";

/**
 * 默认的位置配置
 */
const DEFAULT_POSITION_CONFIG: EnhancedComputePositionConfig = {
    placement: "left-start",
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
    _mode: PopPanelMode = "editorPanel",
    dom: HTMLElement,
    options: EnhancedComputePositionConfig = {}
): UE_EL_COMPONENT.UeElPopPanelProps {
    return {
        draggable: true,
        panel: {
            position: {
                refEl: dom,
                options: { ...DEFAULT_POSITION_CONFIG, ...options },
            },
        },
    };
}
