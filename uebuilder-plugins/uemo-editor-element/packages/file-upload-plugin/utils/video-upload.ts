import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { i18n } from "@/index";

import { normalUpload } from "./normal-upload";
import { qiniuUpload } from "./qiniu-upload";
import { checkFileSize } from "./helper";

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
        onProgress?: (progress: string) => void;
    }
) {
    const { video, fileLimitSize, qiniu } = uploadConfig;

    if (!video || !video.allow) {
        return Promise.reject(new UeError("0", { message: t("FILE_UPLOADER_TIP_NOT_ALLOW_VIDEO") }));
    }

    return checkFileSize(file, video.limitSize || fileLimitSize).then(() => {
        if (video.useQiniu && qiniu) {
            return qiniuUpload(file, qiniu, param);
        } else {
            return normalUpload(file, axiosInstance, uploadConfig, param);
        }
    });
}
