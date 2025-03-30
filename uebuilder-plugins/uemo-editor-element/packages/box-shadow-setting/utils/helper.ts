import { isColor } from "@stone/uemo-editor-utils/lib/color";

/**
 * 解析阴影参数
 */
export function parseShadowValue(paramArr: string[]) {
    if (paramArr[0] === "inset") {
        paramArr.shift();
    }

    const isColorValue = isColor(paramArr[0]);

    if (paramArr.length === 4) {
        if (isColorValue) {
            const [color, x, y, blur] = paramArr;
            return { x, y, blur, spread: "0", color };
        } else {
            const [x, y, blur, color] = paramArr;
            return { x, y, blur, spread: "0", color };
        }
    } else {
        if (isColorValue) {
            const [color, x, y, blur, spread] = paramArr;
            return { x, y, blur, spread, color };
        } else {
            const [x, y, blur, spread, color] = paramArr;
            return { x, y, blur, spread, color };
        }
    }
}

export function getShadowParam(value: string) {
    return value.match(/(?:[^\s()]+|\([^()]*\))+/g);
}
