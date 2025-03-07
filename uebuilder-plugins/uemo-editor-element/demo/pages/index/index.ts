/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 12:27:03
 */

// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import { createApp } from "vue";

import UeEl from "@/index";
import App from "./index.vue";
import router from "../../router/index";

const app = createApp(App);

app.use(router);
app.use(UeEl, {
    plugin: {
        fileUpload: {
            uploadConfig: {
                uploadPath: "http://127.0.0.1:9005/service",
                uploadName: "Filedata",
                useFullLink: true,
                publicPath: "/templates/templates/editor_page/",
                resourceLink: "http://127.0.0.1:9005/",
                uploadFileSize: 2048,
                imageUploadSize: 10240,
                imageDataPath: "url",
            },
        },
        resource: {
            getShapeList: () => import("@stone/uemo-editor-assets/resource/shape").then((res) => res.default),
        },
    },
});

app.mount("#app");
