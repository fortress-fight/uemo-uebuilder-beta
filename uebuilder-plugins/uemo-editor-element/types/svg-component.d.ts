/*
 * @Description: 添加样式文件的类型定义
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 01:22:56
 */
// declare module "*.module.scss";
// declare module "*.module.css";

// @ts-expect-error
import InlineSvg from "vue-inline-svg";

declare module "vue" {
    export interface GlobalComponents {
        InlineSvg: typeof InlineSvg;
    }
}
