/*
 * @Description: 滚动效果控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 10:57:53
 */
import type { App } from "vue";

import UeElScrollEffectSetting from "./Main.vue";

UeElScrollEffectSetting.install = (app: App) => {
    if (!UeElScrollEffectSetting.name) return;
    app.component(UeElScrollEffectSetting.name, UeElScrollEffectSetting);
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

export type UeElScrollEffectSettingOptions = ScrollRotateOptions &
    ScrollTranslateOptions &
    ScrollScaleOptions &
    ScrollFixedOptions &
    ScrollParallaxOptions &
    ScrollStickyOptions &
    ScrollImageParallaxOptions &
    ScrollOpacityOptions;

export type UeElScrollEffectSettingValue =
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

export interface UeElScrollEffectSettingBaseProps {
    disabled?: boolean;
    isImage?: boolean;
}
export type UeElScrollEffectSettingInstance = InstanceType<typeof UeElScrollEffectSetting>;

export default UeElScrollEffectSetting;
