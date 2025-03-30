import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { isVideoType, isImageType } from "@stone/uemo-editor-utils/lib/utils";

import { transferUploadConfig } from "./helper";
import { videoUpload } from "./video-upload";
import { imageUpload } from "./image-upload";
import { assetUpload } from "./asset-upload";

import { i18n } from "@/i18n";
const { t } = i18n.global;

/**
 * 创建上传处理程序
 * @param axiosInstance axios实例
 * @param defaultUploadConfig 默认上传配置
 * @returns 上传处理程序
 */
export function createUploadHandler(
    axiosInstance?: AxiosInstance,
    defaultUploadConfig?: UE_EL_UTIL.UploadConfig
): UE_EL_UTIL.UploadHandler {
    return (config) => {
        const uploadConfig = config.uploadConfig || defaultUploadConfig;

        return {
            config: uploadConfig,
            fire: (file: File, param) => {
                if (!file) {
                    const errorMsg = t("ERROR_UPLOAD_NOT_SELECTED");
                    return Promise.reject(new UeElError(UeElErrorCode.UPLOAD_NOT_SELECTED, { message: errorMsg }));
                }

                if (!uploadConfig) {
                    const errorMsg = t("ERROR_UPLOAD_NOT_CONFIG");
                    return Promise.reject(new UeElError(UeElErrorCode.UPLOAD_NOT_CONFIG, { message: errorMsg }));
                }

                const newConfig = transferUploadConfig(uploadConfig);

                // 成功处理
                const successHandler = (res: string) => {
                    return res;
                };

                // 错误处理
                const errorHandler = (error: typeof UeElError) => {
                    return Promise.reject(error);
                };

                if (isVideoType(file.type)) {
                    return videoUpload(file, axiosInstance, newConfig, { onProgress: param.uploadProgress }).then(
                        successHandler,
                        errorHandler
                    );
                }

                if (isImageType(file.type)) {
                    return imageUpload(file, axiosInstance, newConfig, { onProgress: param.uploadProgress }).then(
                        successHandler,
                        errorHandler
                    );
                }

                return assetUpload(file, axiosInstance, newConfig, { onProgress: param.uploadProgress }).then(
                    successHandler,
                    errorHandler
                );
            },
        };
    };
}
