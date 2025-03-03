/*
 * @Description: 文件上传
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 11:20:44
 */
import type { App } from "vue";

import UeElFileUploader from "./Main.vue";

UeElFileUploader.install = (app: App) => {
    if (!UeElFileUploader.name) return;
    app.component(UeElFileUploader.name, UeElFileUploader);
};

export interface UeElFileUploaderBaseProps {
    accept: string;
    disable?: boolean;
    uploadConfig?: UE_EL_UTIL.UploadConfig;
    interceptFileUpload?: (file: File) => void;
    interceptSelectUploadFile?: () => void;
    uploadBeforeInterceptors?: UE_EL_UTIL.UploadIntercept[];
}
export type UeElFileUploaderInstance = InstanceType<typeof UeElFileUploader>;

export default UeElFileUploader;
