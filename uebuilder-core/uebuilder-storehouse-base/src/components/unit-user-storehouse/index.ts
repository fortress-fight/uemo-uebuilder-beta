/*
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-30 01:35:36
 */
import type { App } from "vue";

import UnitUserStorehouse from "./Main.vue";

UnitUserStorehouse.install = (app: App) => {
    if (!UnitUserStorehouse.name) return;
    app.component(UnitUserStorehouse.name, UnitUserStorehouse);
};

export interface UnitUserStorehouseBaseProps {
    type?: "recent" | "all";
    list?: { title: string; thumb: string }[];
}
export type UnitUserStorehouseInstance = InstanceType<typeof UnitUserStorehouse>;

export default UnitUserStorehouse;

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

/**
 * 用户模板值
 */
export type UserTemplateValue = {
    json: string;
    thumb: string;
    title: string;
};

/**
 * 用户模板面板属性
 */
export type UserTemplatePanelBaseProps = {
    title: string;
    type: "add" | "editor";
    loading?: boolean;
    disableJSMO?: boolean;
    defaultThumb?: string[];
};
