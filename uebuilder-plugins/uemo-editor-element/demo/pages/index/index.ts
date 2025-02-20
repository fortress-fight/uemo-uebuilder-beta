/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 12:31:34
 */

// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import { createApp } from "vue";

import App from "./index.vue";
import router from "../../router/index";
import UeEl from "@/index";

const app = createApp(App);

app.use(router);
app.use(UeEl, { plugin: {} });

app.mount("#app");
