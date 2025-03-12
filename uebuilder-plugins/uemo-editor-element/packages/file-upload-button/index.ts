/*
 * @Description: 图片上传按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 00:26:48
 */
import type { App } from "vue";

import UeElFileUploadButton from "./Main.vue";

export type UploadType = "image" | "svg" | "lottie" | "video";

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
