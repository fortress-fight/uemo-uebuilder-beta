import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { i18n } from "@/index";
import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { isVideoType, isImageType } from "@stone/uemo-editor-utils/lib/utils";

import { transferUploadConfig } from "./helper";
import { videoUpload } from "./video-upload";
import { imageUpload } from "./image-upload";
import { assetUpload } from "./asset-upload";

const { t } = i18n.global;

/**
 * 创建上传处理程序
 * @param axiosInstance axios实例
 * @param defaultUploadConfig 默认上传配置
 * @returns 上传处理程序
 */
export function createUploadHandler(
    axiosInstance?: AxiosInstance,
    defaultUploadConfig?: UE_EL_UTIL.UploadConfig | UE_EL_UTIL.UploadConfigOld
): UE_EL_UTIL.UploadHandler {
    return (config) => {
        const uploadConfig = config.uploadConfig || defaultUploadConfig;

        return {
            config: uploadConfig,
            fire: (file: File, param) => {
                if (!file) {
                    const errorMsg = t("FILE_UPLOADER_TIP_NOT_SELECTED");
                    param.onError({ code: "0", msg: errorMsg });
                    return Promise.reject(new UeError("0", { message: errorMsg }));
                }

                if (!uploadConfig) {
                    const errorMsg = t("FILE_UPLOADER_TIP_NOT_CONFIG");
                    param.onError({ code: "0", msg: errorMsg });
                    return Promise.reject(new UeError("0", { message: errorMsg }));
                }

                const newConfig = transferUploadConfig(uploadConfig);

                // 错误处理
                const errorHandler = (error: { code: string; msg: string }) => {
                    param.onError(error);
                    return Promise.reject(new UeError("0", { message: error.msg }));
                };

                if (isVideoType(file.type)) {
                    return videoUpload(file, axiosInstance, newConfig, { onProgress: param.uploadProgress }).then(
                        (res) => res,
                        errorHandler
                    );
                }

                if (isImageType(file.type)) {
                    return imageUpload(file, axiosInstance, newConfig, { onProgress: param.uploadProgress }).then(
                        (res) => res,
                        errorHandler
                    );
                }

                return assetUpload(file, axiosInstance, newConfig, { onProgress: param.uploadProgress }).then(
                    (res) => res,
                    errorHandler
                );
            },
        };
    };
}
