/*
 * @Description: 按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 17:18:08
 */
import type { App } from "vue";

import UeElButton from "./Main.vue";

UeElButton.install = (app: App) => {
    if (!UeElButton.name) return;
    app.component(UeElButton.name, UeElButton);
};

export interface UeElButtonBaseProps {
    label?: string;
    /** squareIcon: 方向图标按钮 hoverStrokeText: Hover线框文字按钮 strokeText: 线框文字按钮 fillText: 实心文字按钮 */
    theme: "squareIcon" | "hoverStrokeText" | "hoverStrokeText2" | "strokeText" | "fillText";
    text?: string;
    icon?: string | { name: string; size: number };
    size?: "small" | "small-y" | "normal" | "large";
    loading?: boolean;
    type?: "warning" | "primary" | "danger";
    active?: boolean;
    disable?: boolean;
    disableTip?: string;
}
export type UeElButtonInstance = InstanceType<typeof UeElButton>;

export default UeElButton;
