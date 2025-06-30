import type { DOMOutputSpec } from "@tiptap/pm/model";

import $pageStyle from "../../src/app.module.scss";
import {
    renderBackgroundColorLayer,
    renderBackgroundImageLayer,
    renderBackgroundSvgLayer,
    renderBackgroundBlurLayer,
    renderBackgroundVideoLayer,
} from "./helper";

export function renderBackgroundLayer(
    param: {
        radius?: string;
        xxlBg?: UE_EL_UTIL.BackgroundValue[];
        mdBg?: UE_EL_UTIL.BackgroundValue[];
    },
    type: string
): DOMOutputSpec {
    function getBgLayer(background: UE_EL_UTIL.BackgroundValue[]) {
        const layerWrapper: DOMOutputSpec[] = [];
        background.forEach((item) => {
            const layerGroup: DOMOutputSpec[] = [];
            switch (item.type) {
                case "color":
                    {
                        const layer = renderBackgroundColorLayer(item as UE_EL_UTIL.BackgroundColorValue);
                        layerGroup.push(...layer);
                    }
                    break;

                case "image":
                    {
                        const layer = renderBackgroundImageLayer(item as UE_EL_UTIL.BackgroundImageValue);
                        layerGroup.push(...layer);
                    }
                    break;

                case "svg":
                    {
                        const layer = renderBackgroundSvgLayer(item as UE_EL_UTIL.BackgroundSvgValue);
                        layerGroup.push(...layer);
                    }
                    break;

                case "blur":
                    {
                        const layer = renderBackgroundBlurLayer(item as UE_EL_UTIL.BackgroundBlurValue);
                        layerGroup.push(...layer);
                    }
                    break;

                case "video":
                    {
                        const layer = renderBackgroundVideoLayer(item as UE_EL_UTIL.BackgroundVideoValue);
                        layerGroup.push(...layer);
                    }
                    break;

                default:
                    break;
            }
            layerWrapper.push(["div", { class: $pageStyle["bg-box"], "data-type": item.type }, ...layerGroup]);
        });
        return layerWrapper;
    }

    const bgGroup: DOMOutputSpec[] = [];

    if (param.xxlBg) {
        bgGroup.push([
            "div",
            {
                class: $pageStyle["layer-page_bg"],
                "data-viewport": "xxl",
                "data-md-show": !param.mdBg ? "1" : "0",
            },
            ...getBgLayer(param.xxlBg),
        ]);
    }
    if (param.mdBg) {
        bgGroup.push([
            "div",
            {
                class: $pageStyle["layer-page_bg"],
                "data-viewport": "md",
                "data-md-show": "1",
            },
            ...getBgLayer(param.mdBg),
        ]);
    }

    return [
        "div",
        { class: $pageStyle["background-layer-group"], style: `border-radius: ${param.radius};`, "data-type": type },
        ...bgGroup,
    ];
}
