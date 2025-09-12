/*
 * @Description: 获取 uebuilder 的 element 配置
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 15:00:31
 */
import type { UE_EL_OPTIONS } from "@stone/uemo-editor-element/src";

import { getLocalFontLib } from "@stone/uemo-editor-utils/lib/resource";
import { AI_CONFIG } from "@stone/uemo-editor-panel/demo/utils/ai-config";

export function getUeElementConfig(
    uploadConfig: UE_EL_UTIL.UploadConfig,
    resourceConfig: UE_BUILDER.ResourceConfig
): UE_EL_OPTIONS {
    return {
        config: {
            backgroundSetting: {
                defaultImageData: {
                    image: resourceConfig.defaultImage,
                    size: "cover",
                },
                defaultSvgData: {
                    url: resourceConfig.defaultSvg,
                    natureWidth: 580,
                    natureHeight: 580,
                },
                defaultVideoData: { video: resourceConfig.defaultVideo },
                defaultSplineData: {
                    url: resourceConfig.defaultSpline,
                },
            },
        },
        plugin: {
            ai: AI_CONFIG,
            fileUpload: { uploadConfig },
            link: {
                anchor: {
                    enable: true,
                    getData: () => Promise.resolve([{ name: "测试锚点", src: "#asdf" }]),
                },
            },
            resource: {
                shapeLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/shape").then((res) => res.default),
                },
                splineLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/spline").then((res) => res.default),
                },
                lottieLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/lottie").then((res) => res.default),
                },
                richTextLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/rich-text").then((res) => res.default),
                },
                iconLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/icon").then((res) => res.default),
                },
                videoLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/video").then((res) => res.default),
                },
                imageLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/image").then((res) => res.default),
                },
                shareIconLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/share-icon").then((res) => res.default),
                },
                fontFamilyLibrary: {
                    enable: true,
                    getData: () =>
                        import("@stone/uemo-editor-assets/resource/font-family").then((res) => res.default()),
                    getUsedFontFamily: () => Promise.resolve(getLocalFontLib()),
                },
                buttonLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/button").then((res) => res.default),
                },
                mapLibrary: {
                    enable: true,
                    getData: () => import("@stone/uemo-editor-assets/resource/map").then((res) => res.default),
                },
            },
        },
    };
}
