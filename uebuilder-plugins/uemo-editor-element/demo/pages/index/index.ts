/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2024-11-27 14:20:13
 */

// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import { createApp } from "vue";

import App from "./index.vue";
import router from "../../router/index";

const app = createApp(App);
app.use(router);
app.mount("#app");
