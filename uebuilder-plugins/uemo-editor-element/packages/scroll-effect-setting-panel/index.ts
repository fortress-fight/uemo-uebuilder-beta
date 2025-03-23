/*
 * @Description: 滚动效果控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:01:59
 */
import type { App } from "vue";

import UeElScrollEffectSettingPanel from "./Main.vue";

UeElScrollEffectSettingPanel.install = (app: App) => {
    if (!UeElScrollEffectSettingPanel.name) return;
    app.component(UeElScrollEffectSettingPanel.name, UeElScrollEffectSettingPanel);
};

export type ScrollBaseOptions = {
    triggerMode?: string;
    triggerDelay?: string;
    triggerEase?: string;
    triggerDuration?: string;

    startPos?: string;
    endPos?: string;
    startPosDis?: string;
    endPosDis?: string;

    opacityStart?: string;
    opacityEnd?: string;
};
export type ScrollRotateOptions = ScrollBaseOptions & {
    axis?: string;
    start?: string;
    end?: string;
};
export type ScrollTranslateOptions = ScrollBaseOptions & {
    xStart?: string;
    xEnd?: string;
    yStart?: string;
    yEnd?: string;
};
export type ScrollScaleOptions = ScrollBaseOptions & {
    start?: string;
    end?: string;
    overflow?: boolean;
};

export type ScrollOpacityOptions = ScrollBaseOptions & {
    start?: string;
    end?: string;
};

export type ScrollStickyOptions = {
    padding?: string;
};

export type ScrollFixedOptions = {
    moveY?: string;
};

export type ScrollParallaxOptions = {
    speed?: string;
};

export type ScrollImageParallaxOptions = {
    mode?: string;
};

export type UeElScrollEffectSettingPanelOptions = ScrollRotateOptions &
    ScrollTranslateOptions &
    ScrollScaleOptions &
    ScrollFixedOptions &
    ScrollParallaxOptions &
    ScrollStickyOptions &
    ScrollImageParallaxOptions &
    ScrollOpacityOptions;

export type UeElScrollEffectSettingPanelValue =
    | {
          type: "translate";
          options?: ScrollTranslateOptions;
      }
    | {
          type: "scale";
          options?: ScrollScaleOptions;
      }
    | {
          type: "sticky";
          options?: ScrollStickyOptions;
      }
    | {
          type: "fixed";
          options?: ScrollFixedOptions;
      }
    | {
          type: "parallax";
          options?: ScrollParallaxOptions;
      }
    | {
          type: "image-parallax";
          options?: ScrollImageParallaxOptions;
      }
    | {
          type: "rotate";
          options?: ScrollRotateOptions;
      }
    | {
          type: "opacity";
          options?: ScrollOpacityOptions;
      };

export interface UeElScrollEffectSettingPanelBaseProps {
    disabled?: boolean;
    isImage?: boolean;
}
export type UeElScrollEffectSettingPanelInstance = InstanceType<typeof UeElScrollEffectSettingPanel>;

export default UeElScrollEffectSettingPanel;
