// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { createUeBuilderCreator } from "@/utils/uebuilder-creator";

$(() => {
    $(".uebuilder-container").each((_index, dom) => {
        const option: UE_BUILDER_CREATOR.InitParams = {
            appName: "UEMO_TOOLS",
            appPath: "/",
            appType: "page",
            appState: "browsing",
        };

        createUeBuilderCreator(dom, option).init();
    });
});
