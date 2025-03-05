import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { _get } from "@stone/uemo-editor-utils/lib/lodash";
import { i18n } from "@/i18n";

import { createAxios } from "./helper";

const { t } = i18n.global;

/**
 * 普通上传
 * @param file 文件
 * @param axiosInstance axios实例
 * @param uploadConfig 上传配置
 * @param param 参数
 */
export function normalUpload(
    file: File,
    axiosInstance: AxiosInstance | undefined,
    uploadConfig: UE_EL_UTIL.UploadConfig,
    param: { onProgress?: (progress: string) => void }
): Promise<string> {
    const { uploadPath, resourceLink, uploadName, uploadFileQueryPath, uploadData, withCredentials } = uploadConfig;

    const formData = new FormData();

    formData.append("type", file.type);
    formData.append(uploadName, file);

    if (uploadData) {
        for (const [key, value] of Object.entries(uploadData)) {
            formData.append(key, value);
        }
    }

    // 创建 axios 实例
    const instance = axiosInstance || createAxios();

    instance.defaults.withCredentials = withCredentials;

    // 监听上传进度事件
    instance.defaults.onUploadProgress = function (ev) {
        const progressEvent = ev.event;
        if (progressEvent.lengthComputable) {
            const percent = (progressEvent.loaded / progressEvent.total) * 100;
            param.onProgress?.(percent.toFixed(2));
        }
    };

    // 发送上传请求
    return instance.post(uploadPath, formData).then(
        (response) => {
            if (!response) {
                return Promise.reject(
                    new UeElError(UeElErrorCode.UPLOAD_NETWORK_ERROR, {
                        message: t("ERROR_UPLOAD_NETWORK_ERROR"),
                    })
                );
            }

            if (typeof response === "object") {
                const imagePath = _get(response, uploadFileQueryPath).replace("\\", "/");
                return Promise.resolve(resourceLink + imagePath);
            } else {
                return Promise.resolve(resourceLink + (response as string));
            }
        },
        () => {
            return Promise.reject(
                new UeElError(UeElErrorCode.UPLOAD_FAILED, {
                    message: t("ERROR_UPLOAD_FAILED"),
                })
            );
        }
    );
}
// #endregion
