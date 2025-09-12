// SECTION - 样式文件
import "@stone/uemo-editor-assets/assets/style/reset.scss";
import "@/assets/style";
// !SECTION

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { createUeBuilderStorehouse } from "@/utils/uebuilder-storehouse";

$(() => {
    const container = document.querySelector<HTMLElement>("#UEBUILDER-STOREHOUSE");
    if (!container) return;

    createUeBuilderStorehouse(container).init();
});
