import type { UE_EL_OPTIONS } from "@stone/uemo-editor-element/src";

import { getLocalFontLib } from "@stone/uemo-editor-utils/lib/resource";
import { AI_CONFIG } from "@stone/uemo-editor-panel/demo/utils/ai-config";

const uploadConfig: UE_EL_UTIL.UploadConfig = {
    uploadPath: "http://127.0.0.1:9005/service",
    uploadName: "Filedata",
    useFullLink: true,
    publicPath: "/templates/templates/editor_page/",
    resourceLink: "http://127.0.0.1:9005/",
    fileLimitSize: 20480,
    uploadFileQueryPath: "url",

    asset: false,
    image: { allow: true, limitSize: 10240 },
    qiniu: { allow: false as const },
    video: { allow: true, limitSize: 10240 },

    // history: { type: "MO005" as const },
    history: { type: "custom" as const, url: "http://127.0.0.1:9005/service/history" },
};

export const UE_EL_CONFIG: UE_EL_OPTIONS = {
    config: {
        backgroundSetting: {
            defaultImageData: {
                image: "https://static.jsmo.xin/uebuilder/public-resource/images/base-image.jpg",
                size: "cover",
            },
            defaultSvgData: {
                url: "https://static.jsmo.xin/uebuilder/public-resource/svg-bg/svg-bg-default.svg",
                natureWidth: 580,
                natureHeight: 580,
            },
            defaultVideoData: { video: "https://static.jsmo.xin/static/video/background001.mp4" },
            defaultSplineData: {
                url: "https://static.jsmo.xin/uebuilder/public-resource/spline/beijing/spline001.splinecode",
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
                getData: () => import("@stone/uemo-editor-assets/resource/font-family").then((res) => res.default()),
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
