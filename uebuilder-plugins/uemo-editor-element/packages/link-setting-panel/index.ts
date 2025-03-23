/*
 * @Description: 链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:04:57
 */
import type { App } from "vue";

import UeElLinkSettingPanel from "./Main.vue";

UeElLinkSettingPanel.install = (app: App) => {
    if (!UeElLinkSettingPanel.name) return;
    app.component(UeElLinkSettingPanel.name, UeElLinkSettingPanel);
};

export type UeElLinkSettingPanelValue =
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

export interface UeElLinkSettingPanelBaseProps {
    title?: string;
    enableTriggerArea?: boolean;
}
export type UeElLinkSettingPanelInstance = InstanceType<typeof UeElLinkSettingPanel>;

export default UeElLinkSettingPanel;
