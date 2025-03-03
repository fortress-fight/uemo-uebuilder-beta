import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { _get } from "@stone/uemo-editor-utils/lib/lodash";
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { i18n } from "@/index";

import { createAxios } from "./helper";

const { t } = i18n.global;

/**
 * 获取七牛云上传凭证
 * @param config 七牛云上传配置
 * @returns 七牛云上传凭证
 */
function getQiniuToken(config: UE_EL_UTIL.QiniuUploadConfig) {
    if (!config) {
        return Promise.reject(new UeError("0", { message: t("FILE_UPLOADER_TIP_NOT_CONFIG_QINIU") }));
    }

    const axiosInstance = createAxios();
    const { tokenUrl, tokenPath, tokenFolderPath, tokenRegionPath, tokenUrlPrefix } = config;

    return axiosInstance.post(tokenUrl, {}, { withCredentials: config.withCredentials }).then((response) => ({
        token: _get(response, tokenPath),
        path: tokenFolderPath ? _get(response, tokenFolderPath) : "",
        region: _get(response, tokenRegionPath),
        urlPrefix: tokenUrlPrefix ? _get(response, tokenUrlPrefix) : "",
    }));
}

/**
 * 七牛云上传
 * @param file 文件
 * @param qiniuConfig 七牛云上传配置
 * @param param 参数
 * @returns 七牛云上传凭证
 */
export function qiniuUpload(
    file: File,
    qiniuConfig: UE_EL_UTIL.QiniuUploadConfig,
    param: {
        onProgress?: (progress: string) => void;
    }
) {
    if (!qiniuConfig) {
        return Promise.reject(new UeError("0", { message: t("FILE_UPLOADER_TIP_NOT_CONFIG_QINIU") }));
    }

    const ext = file.name.slice(file.name.lastIndexOf("."));
    const fileName = file.type.split("/")[0] + "-" + guid();
    return getQiniuToken(qiniuConfig)
        .then(
            (response) => {
                return import("qiniu-js").then((qiniuJS) => {
                    const { token, path, urlPrefix } = response;
                    const url = path + fileName + ext;
                    return new Promise<string>((resolve, reject) => {
                        const observable = qiniuJS.upload(file, url, token);

                        observable.subscribe({
                            error: () => {
                                reject(new UeError("0", { message: t("FILE_UPLOADER_TIP_UPLOAD_ERROR") }));
                            },
                            next(value) {
                                if (value.total.percent) {
                                    param.onProgress?.(value.total.percent.toFixed(2));
                                }
                            },
                            complete: (res: any) => {
                                const filePath = _get(res, qiniuConfig.uploadFilePath);
                                let url = "";
                                if (urlPrefix.endsWith("/")) {
                                    url = urlPrefix + filePath;
                                } else {
                                    url = urlPrefix + "/" + filePath;
                                }
                                resolve(url);
                            },
                        });
                    });
                });
            },
            () => {
                return Promise.reject(new UeError("0", { message: t("FILE_UPLOADER_TIP_GET_QINIU_TOKEN_FAILED") }));
            }
        )
        .then((imageUrl) => {
            return Promise.resolve(imageUrl);
        });
}
// #endregion
