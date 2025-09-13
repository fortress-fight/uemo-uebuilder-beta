// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { createUeBuilderCreator } from "@/utils/uebuilder-creator";

$(() => {
    // MARK Uebuilder-Tools 的初始化位置
    $(".uebuilder-container").each((_index, dom) => {
        const option: UE_BUILDER_CREATOR.InitParams = {
            appName: "UEMO_TOOLS",
            appPath: "/",
            appSize: "fullscreen",
            appType: "page",
            appState: "browsing",
            appUpload: {
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
            },
            appResource: {
                defaultImage: "https://static.jsmo.xin/uebuilder/public-resource/images/base-image.jpg",
                defaultSvg: "https://static.jsmo.xin/uebuilder/public-resource/svg-bg/svg-bg-default.svg",
                defaultVideo: "https://static.jsmo.xin/static/video/background001.mp4",
                defaultSpline: "https://static.jsmo.xin/uebuilder/public-resource/spline/beijing/spline001.splinecode",
            },
        };

        createUeBuilderCreator(dom, option).init();
    });
});
