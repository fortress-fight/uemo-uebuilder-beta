/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-04-01 01:01:03
 */

// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import { createApp } from "vue";

import { getLocalFontLib, setLocalFontLib } from "@stone/uemo-editor-utils/lib/resource";
import UeEl from "@stone/uemo-editor-element/src";
import UeTiptap from "@/index";

import App from "./index.vue";
import router from "../../router/index";
import { AI_CONFIG } from "../../../utils/ai-config";

const app = createApp(App);

const uploadConfig: UE_EL_UTIL.UploadConfigOld = {
    uploadPath: "http://127.0.0.1:9005/service",
    uploadName: "Filedata",
    useFullLink: true,
    publicPath: "/templates/templates/editor_page/",
    resourceLink: "http://127.0.0.1:9005/",
    uploadFileSize: 2048,
    imageUploadSize: 10240,
    imageDataPath: "url",
    qiniu: { allow: false as const },
    video: { allow: true, limitSize: 10240 },
    // history: { type: "MO005" as const },
    history: { type: "custom" as const, url: "http://127.0.0.1:9005/service/history" },
};

setLocalFontLib([
    {
        name: "阿里妈妈数黑体-Bold",
        src: "https://qiniu-uematerial.uemo.net/Upfile/Font/20221104/AlimamaShuHeiTi-Bold.ttf",
    },
]);
// backgroundSetting: {
// },

app.use(router);
app.use(UeEl, {
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
        },
    },
});
app.use(UeTiptap);

app.mount("#app");
