/*
 * @Description: 客户模版库操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-21 00:26:14
 */
import type { App } from "vue";

import UnitUserTemplatePanel from "./Main.vue";

UnitUserTemplatePanel.install = (app: App) => {
    if (!UnitUserTemplatePanel.name) return;
    app.component(UnitUserTemplatePanel.name, UnitUserTemplatePanel);
};

/**
 * 用户模板值
 */
export type UserTemplateValue = {
    json: string;
    thumb: string;
    title: string;
};

export interface UnitUserTemplatePanelBaseProps {
    type: "add" | "edit";
    disableJSMO?: boolean;
    defaultThumb?: string[];
    getTemplateDetail?: () => Promise<{ json: string; thumb: string; title: string }>;
}

export type UnitUserTemplatePanelInstance = InstanceType<typeof UnitUserTemplatePanel>;

/**
 * 默认封面图
 */
export const DEFAULT_THUMB: string[] = [
    "https://static.jsmo.xin/uebuilder/public-resource/images/page-thumb-1.png",
    "https://static.jsmo.xin/uebuilder/public-resource/images/page-thumb-2.png",
    "https://static.jsmo.xin/uebuilder/public-resource/images/page-thumb-3.png",
    "https://static.jsmo.xin/uebuilder/public-resource/images/page-thumb-4.png",
    "https://static.jsmo.xin/uebuilder/public-resource/images/page-thumb-5.png",
    "https://static.jsmo.xin/uebuilder/public-resource/images/page-thumb-6.png",
];

export default UnitUserTemplatePanel;
