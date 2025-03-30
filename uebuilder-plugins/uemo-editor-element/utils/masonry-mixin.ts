import { Masonry } from "@stone/uemo-editor-utils/lib/masonry-layout";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

/**
 * Masonry 布局配置接口
 */
interface MasonryOptions {
    gutter: number;
    transitionDuration: number;
}

/**
 * Masonry 混入函数 - 用于处理视频列表的瀑布流布局
 * @param listDomRef - 容器DOM引用
 * @param listData - 列表数据
 * @throws {Error} 当DOM引用无效时抛出错误
 */
export function MasonryMixin(listDomRef: ReturnType<typeof useTemplateRef<HTMLElement>>, listData: Ref<any[]>): void {
    // Masonry 实例
    let msnry: Masonry | null = null;

    // ResizeObserver 实例
    let resizeObserver: ResizeObserver | null = null;

    /**
     * 销毁 Masonry 实例和相关资源
     */
    function destroyMsnry(): void {
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }
        if (msnry) {
            msnry.destroy?.();
            msnry = null;
        }
    }

    /**
     * 初始化或更新 Masonry 布局
     */
    const updateMasonryLayout = (): void => {
        if (!listDomRef.value) {
            console.warn("Masonry container DOM reference is invalid");
            return;
        }

        const options: MasonryOptions = {
            gutter: 10,
            transitionDuration: 0,
        };

        try {
            if (!msnry) {
                msnry = new Masonry(listDomRef.value, options);
            }
            msnry.reloadItems?.();
            msnry.layout?.();
        } catch (error) {
            console.error("Failed to initialize or update Masonry layout:", error);
            destroyMsnry();
        }
    };

    // 监听视频列表变化
    watch(listData, (newList) => {
        if (newList.length === 0) {
            destroyMsnry();
            return;
        }
        // 使用 rAF 确保DOM更新后再执行布局
        requestAnimationFrame(updateMasonryLayout);
    });

    // 创建并配置 ResizeObserver
    const setupResizeObserver = (): void => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }

        resizeObserver = new ResizeObserver(
            _debounce(() => {
                msnry?.layout?.();
            }, 200)
        );

        if (listDomRef.value) {
            resizeObserver.observe(listDomRef.value);
        }
    };

    // 监听容器DOM变化
    watchEffect(setupResizeObserver);

    // 组件卸载时清理资源
    onBeforeUnmount(destroyMsnry);
}
