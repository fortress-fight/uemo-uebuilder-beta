import type { AxiosInstance, CancelTokenSource } from "@stone/uemo-editor-utils/lib/axios";

import { i18n } from "../../../src/i18n";

import { normalUpload } from "./normal-upload";
import { qiniuUpload } from "./qiniu-upload";
import { checkFileSize } from "./helper";
import { UeElError, UeElErrorCode } from "../../../utils/error";

const { t } = i18n.global;

/**
 * 视频上传
 * @param file 文件
 * @param axiosInstance axios实例
 * @param uploadConfig 上传配置
 * @param param 参数
 */
export function videoUpload(
    file: File,
    axiosInstance: AxiosInstance | undefined,
    uploadConfig: UE_EL_UTIL.UploadConfig,
    param: {
        cancelSource?: CancelTokenSource;
        onProgress?: (progress: string) => void;
    }
) {
    const { video, fileLimitSize, qiniu } = uploadConfig;

    if (!video || !video.allow) {
        return Promise.reject(
            new UeElError(UeElErrorCode.UPLOAD_NOT_ALLOW_VIDEO, {
                message: t("ERROR_UPLOAD_NOT_ALLOW_VIDEO"),
            })
        );
    }

    return checkFileSize(file, video.limitSize || fileLimitSize).then(() => {
        if (video.useQiniu && qiniu) {
            return qiniuUpload(file, qiniu, param);
        } else {
            return normalUpload(file, axiosInstance, uploadConfig, param);
        }
    });
}
