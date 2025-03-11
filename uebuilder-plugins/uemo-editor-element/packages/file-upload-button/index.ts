/*
 * @Description: 图片上传按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-03-11 12:02:49
 */
import type { App } from "vue";

import UeElFileUploadButton from "./Main.vue";

export type UploadType = "image" | "svg" | "lottie";

UeElFileUploadButton.install = (app: App) => {
    if (!UeElFileUploadButton.name) return;
    app.component(UeElFileUploadButton.name, UeElFileUploadButton);
};

export interface UeElFileUploadButtonBaseProps {
    type: UploadType;
    disable?: boolean;
}
export type UeElFileUploadButtonInstance = InstanceType<typeof UeElFileUploadButton>;

export default UeElFileUploadButton;
