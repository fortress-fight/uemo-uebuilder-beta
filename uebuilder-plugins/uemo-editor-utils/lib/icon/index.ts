import { loadScript } from "../utils";

export type IconLib = {
    id: string;
    name: string;
    data: string;
};

export type IconCategory = {
    id: string;
    name: string;
    nameCN: string;
    source: string;
    data: { title: string; name: string }[];
};

/**
 * 加载图标项目数据
 * @param iconPath 图标路径
 * @returns 图标项目数据
 */
export function loadIconProjectData(iconPath: string) {
    return import(/* webpackChunkName: "icon" */ `${iconPath}`);
}

/**
 * 加载 SVG 图标
 * @param sources 图标路径
 * @returns 加载后的 Promise
 */
export function loadSvgIcon(sources: string[] = []) {
    const loadFile: { title: string; source: string }[] = sources.map((source) => ({
        title: "iconpark-",
        source,
    }));

    function loadIcon() {
        return Promise.all(loadFile.map((item) => loadScript(document.body, item)))
            .then(() => {
                $("iconpark-icon").each((_i, dom) => {
                    (dom as any)?.update?.();
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    if (!customElements.get("iconpark-icon")) {
        // @ts-expect-error
        return import(/* webpackChunkName: "iconpark-components" */ "./icon-park/entry.js").then(() => {
            return loadIcon();
        });
    }

    return loadIcon();
}
