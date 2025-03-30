import type { UploadType } from "../index";

import { i18n } from "../../../src/i18n";
import { UeElError, UeElErrorCode } from "../../../utils/error";

function createSvgInterceptor(isDealing: Ref<boolean>, fileData: Ref<Record<string, any>>): UE_EL_UTIL.UploadIntercept {
    const SVG_FILE_LIMIT = 1024 * 1024 * 0.4;
    const { t } = i18n.global;

    /**
     * 文件上传前的拦截器，对 SVG 文件进行优化并解析 viewBox。
     *
     * @param {File} file - 待上传的 SVG 文件
     * @returns {Promise<{file: File}>} 返回一个解析后的文件的 Promise
     * @throws {UeElError} 当文件过大、读取失败或 SVG 格式错误时抛出异常
     */
    return (file: File) => {
        if (file.size > SVG_FILE_LIMIT) {
            return Promise.reject(
                new UeElError(UeElErrorCode.UPLOAD_FILE_SIZE_EXCEED, {
                    message: t("ERROR_UPLOAD_FILE_SIZE_EXCEED") + " 400kb",
                })
            );
        }

        return new Promise((resolve, reject) => {
            isDealing.value = true;
            fileData.value = { w: undefined, h: undefined };

            const reader = new FileReader();

            reader.onload = (event) => {
                const svgContent = event.target?.result; // 读取到的SVG文件内容
                if (!svgContent || typeof svgContent !== "string") {
                    return reject(
                        new UeElError(UeElErrorCode.UPLOAD_SVG_FORMAT_ERROR, {
                            message: t("ERROR_UPLOAD_SVG_FORMAT_ERROR"),
                        })
                    );
                }
                resolve(svgContent);
            };
            reader.readAsText(file);
        })
            .then((svgContent) => {
                return import("@stone/uemo-editor-utils/lib/svgo").then(({ optimize, svgoOptimizeParam }) => {
                    return optimize(svgContent, svgoOptimizeParam).data;
                });
            })
            .then((svgContent: string) => {
                const editedSVGFile = new File([svgContent], file.name, {
                    type: file.type,
                });

                const viewBoxMatch = /viewBox="([^"]+)"/.exec(svgContent);
                if (viewBoxMatch) {
                    const viewBoxValue = viewBoxMatch[1];
                    if (viewBoxValue) {
                        const [_x, _y, width, height] = viewBoxValue.split(" ");
                        fileData.value = {
                            w: Number(width),
                            h: Number(height),
                        };
                    }
                } else {
                    return Promise.reject(
                        new UeElError(UeElErrorCode.UPLOAD_SVG_FORMAT_ERROR, {
                            message: t("ERROR_UPLOAD_SVG_VIEWBOX_MISSING"),
                        })
                    );
                }

                return Promise.resolve({ file: editedSVGFile });
            })
            .finally(() => {
                isDealing.value = false;
            })
            .catch(() => {
                return Promise.reject(
                    new UeElError(UeElErrorCode.UPLOAD_SVG_ERROR, {
                        message: t("ERROR_UPLOAD_SVG_ERROR"),
                    })
                );
            });
    };
}

export const uploadBeforeInterceptors = function (file: Ref<UploadType>): {
    fileData: Ref<UE_EL_UTIL.SvgFileUploadData>;
    isDealing: Ref<boolean>;
    interceptor: Ref<UE_EL_UTIL.UploadIntercept[]>;
} {
    const isDealing = ref(false);
    const fileData = ref<UE_EL_UTIL.SvgFileUploadData>({ w: 0, h: 0 });
    const interceptor = ref<UE_EL_UTIL.UploadIntercept[]>([]);

    if (file.value === "svg") {
        interceptor.value.push(createSvgInterceptor(isDealing, fileData));
    }

    watch(file, (newValue) => {
        interceptor.value = [];
        if (newValue === "svg") {
            interceptor.value.push(createSvgInterceptor(isDealing, fileData));
        }
    });

    return {
        fileData,
        isDealing,
        interceptor,
    };
};
