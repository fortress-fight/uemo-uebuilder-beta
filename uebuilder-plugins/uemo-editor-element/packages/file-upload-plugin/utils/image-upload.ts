import type { AxiosInstance, CancelTokenSource } from "@stone/uemo-editor-utils/lib/axios";

import { i18n } from "../../../src/i18n";

import { normalUpload } from "./normal-upload";
import { checkFileSize } from "./helper";
import { UeElError, UeElErrorCode } from "../../../utils/error";

const { t } = i18n.global;

/**
 * 图片上传
 * @param file 文件
 * @param axiosInstance axios实例
 * @param uploadConfig 上传配置
 * @param param 参数
 */
export function imageUpload(
    file: File,
    axiosInstance: AxiosInstance | undefined,
    uploadConfig: UE_EL_UTIL.UploadConfig,
    param: {
        cancelSource?: CancelTokenSource;
        onProgress?: (progress: string) => void;
    }
) {
    const { image, fileLimitSize } = uploadConfig;

    if (!image || !image.allow) {
        return Promise.reject(
            new UeElError(UeElErrorCode.UPLOAD_NOT_ALLOW_IMAGE, {
                message: t("ERROR_UPLOAD_NOT_ALLOW_IMAGE"),
            })
        );
    }

    return checkFileSize(file, image.limitSize || fileLimitSize).then(() => {
        return normalUpload(file, axiosInstance, uploadConfig, param);
    });
}
