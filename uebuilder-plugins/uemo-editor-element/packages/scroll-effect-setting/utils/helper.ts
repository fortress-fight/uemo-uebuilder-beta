export function getEffectName(type: string) {
    switch (type) {
        case "opacity":
            return "滚动渐显";

        case "rotate":
            return "滚动旋转";

        case "fixed":
            return "滚动锁定";

        case "sticky":
            return "滚动吸附";

        case "image-parallax":
            return "滚动视差 [图片]";

        case "parallax":
            return "滚动视差 [速度]";

        case "scale":
            return "滚动缩放";

        case "translate":
            return "滚动位移";

        default:
            return "";
    }
}

export const defaultScrollOptions = {
    rotate: { axis: "x-b", start: "60", end: "0", startPos: "top bottom", endPos: "bottom bottom" },
    opacity: { startPos: "top bottom", endPos: "bottom bottom", start: "0", end: "1" },
    fixed: { moveY: "0" },
    sticky: { padding: "0px" },
    scale: { startPos: "top bottom", endPos: "bottom bottom", start: "0.5", end: "1" },
    translate: {
        startPos: "top bottom",
        endPos: "bottom bottom",
        xStart: "0px",
        xEnd: "0px",
        yStart: "0px",
        yEnd: "0px",
    },
    parallax: { speed: "-100" },
    "image-parallax": { mode: "parallax-normal" },
};
