/*
 * @Description: UEBuilder 编辑层 -- 控制面板页面
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 22:53:24
 */

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { createUeBuilderEditorFactory } from "./utils/uebuilder-editor-factory";

$(() => {
    const container = document.querySelector<HTMLElement>("#UEBUILDER-EDITOR-FACTORY");
    if (!container) return;

    createUeBuilderEditorFactory(container).init();
});
