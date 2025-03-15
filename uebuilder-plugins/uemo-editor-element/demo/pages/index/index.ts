/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 23:54:36
 */

// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import { createApp } from "vue";

import UeEl from "@/index";
import App from "./index.vue";
import router from "../../router/index";
import { AI_CONFIG } from "../../utils/ai-config";

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

app.use(router);
app.use(UeEl, {
    plugin: {
        ai: AI_CONFIG,
        fileUpload: { uploadConfig },
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
            textDecorationLibrary: {
                enable: true,
                getData: () => import("@stone/uemo-editor-assets/resource/text-decoration").then((res) => res.default),
            },
            shareIconLibrary: {
                enable: true,
                getData: () => import("@stone/uemo-editor-assets/resource/share-icon").then((res) => res.default),
            },
            fontFamilyLibrary: {
                enable: true,
                getData: () => import("@stone/uemo-editor-assets/resource/font-family").then((res) => res.default()),
            },
        },
    },
});

app.mount("#app");
