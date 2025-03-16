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
                document.querySelectorAll("iconpark-icon").forEach((dom) => {
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

/**
 * 初始化 IconPark 组件
 * @description 从组件列表中提取图标资源路径并加载相应的 SVG 图标
 * @param components - 需要初始化的 IconPark 组件列表
 * @returns 返回组件实例对象,包含销毁方法
 */
export function initIconParkComponent(components: NodeListOf<Element> | Element[]) {
    if (!components || components.length === 0) return;

    // 提取所有组件的图标资源路径
    const sourceList = Array.from(components)
        .map((dom) => dom.getAttribute("data-source"))
        .filter(Boolean) as string[];

    // 加载SVG图标资源
    loadSvgIcon(sourceList).catch((err) => {
        console.error("Failed to load SVG icons:", err);
    });

    return {
        /**
         * 销毁方法
         * @description IconPark组件不需要手动销毁
         */
        destroy() {
            console.warn("IconPark 组件不需要手动销毁");
        },
    };
}
