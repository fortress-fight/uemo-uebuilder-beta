import Color from "color";

export function testColor(color: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try {
            Color(color).rgb(); // 验证颜色值是否有效
            resolve(color);
        } catch (error) {
            // 确保 reject 的是 Error 对象
            reject(error instanceof Error ? error : new Error(String(error)));
        }
    });
}

export function testColorSync(color: string, suc: () => void, err: () => void): any {
    try {
        Color(color).rgb();
        return suc();
    } catch (_error) {
        return err();
    }
}

export function isColor(color: string): boolean {
    try {
        Color(color).rgb();
        return true;
    } catch (_error) {
        return false;
    }
}

export function isLightColor(color: string): boolean | undefined {
    try {
        return Color(color).isLight();
    } catch (_error) {
        return undefined;
    }
}

export default Color;
