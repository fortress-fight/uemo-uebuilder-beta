/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 13:21:51
 */

// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import { createApp } from "vue";

import UeEl from "@/index";
import App from "./index.vue";
import router from "../../router/index";

import { createUploadHandler } from "~/packages/file-upload-plugin/utils/upload";

const app = createApp(App);

app.use(router);
app.use(UeEl, {
    plugin: {
        fileUpload: {
            uploadHandler: createUploadHandler(undefined, {
                uploadPath: "http://127.0.0.1:9005/service",
                uploadName: "Filedata",
                useFullLink: true,
                publicPath: "/templates/templates/editor_page/",
                resourceLink: "http://127.0.0.1:9005/",
                uploadFileSize: 2048,
                imageUploadSize: 10240,
                imageDataPath: "url",
            }),
        },
    },
});

app.mount("#app");
