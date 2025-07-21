// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { createUeBuilderCreator } from "@/utils/uebuilder-creator";

$(() => {
    $(".editor-container").each((_index, dom) => {
        const option: UE_BUILDER_CREATOR.InitParams = {
            appName: "UEMO_TOOLS",
            initFullSize: true,
            appPath: "/",
            appType: "page",
        };

        createUeBuilderCreator(dom, option).init();
    });
});
