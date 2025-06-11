import type { UeTiptapOperItem } from "../utils/tiptap-oper-manage";

declare global {
    namespace UE_TIPTAP_UNIT {
        type Device = "pc" | "mobile";

        type FontScaleHandle = (type: "set" | "get", fontSize?: string, scale?: number) => void;

        type OperItem = UeTiptapOperItem;

        type PositionRect =
            | {
                  width: number;
                  height: number;
                  x: number;
                  y: number;
                  left: number;
                  right: number;
                  top: number;
                  bottom: number;
              }
            | HTMLElement;

        /**
         * @description 滚动效果参数
         */
        type SCROLL_EFFECT_OPTION = Record<string, string | undefined>;
        type SCROLL_EFFECT_VALUE = { type: string; options?: SCROLL_EFFECT_OPTION };
    }
}

export {};
