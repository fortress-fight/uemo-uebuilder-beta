// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
// !SECTION

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { createUeBuilderWorkbench } from "@/utils/uebuilder-workbench";

$(() => {
    const workbenchDom = document.querySelector<HTMLElement>("#UEBUILDER_WORKBENCH");

    if (!workbenchDom) return;

    createUeBuilderWorkbench(workbenchDom, { appPath: "/", initFullSize: true }).init();
});
