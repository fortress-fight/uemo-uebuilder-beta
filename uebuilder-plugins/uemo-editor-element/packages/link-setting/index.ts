/*
 * @Description: 链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-22 16:43:50
 */
import type { App } from "vue";

import UeElLinkSetting from "./Main.vue";

UeElLinkSetting.install = (app: App) => {
    if (!UeElLinkSetting.name) return;
    app.component(UeElLinkSetting.name, UeElLinkSetting);
};

export type UeElLinkSettingValue =
    | {
          type: "link";
          link: string;
          target: "_blank" | "_self";
          triggerArea?: string;
      }
    | {
          type: "function";
          link: string;
          detail: "anchor" | "download";
          triggerArea?: string;
      }
    | {
          type: "frame";
          link: string;
          triggerArea?: string;
          popLayer?: {
              width?: string;
          };
      };

export interface UeElLinkSettingBaseProps {
    title?: string;
    enableTriggerArea?: boolean;
}
export type UeElLinkSettingInstance = InstanceType<typeof UeElLinkSetting>;

export default UeElLinkSetting;
