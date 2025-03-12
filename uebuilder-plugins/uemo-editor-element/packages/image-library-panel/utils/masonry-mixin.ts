import type { UNSPLASH_IMAGE } from "../index";

import { Masonry } from "@stone/uemo-editor-utils/lib/masonry-layout";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

export function MasonryMixin(
    listDom: ReturnType<typeof useTemplateRef<HTMLElement>>,
    imageList: Ref<UNSPLASH_IMAGE[]>
) {
    let msnry: Masonry | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function destroyMsnry() {
        resizeObserver?.disconnect();
        msnry?.destroy?.();
        msnry = null;
    }

    watch(imageList, (newList) => {
        if (newList.length === 0) {
            return;
        }
        requestAnimationFrame(() => {
            if (!msnry && listDom.value) {
                msnry = new Masonry(listDom.value, {
                    gutter: 10,
                    transitionDuration: 0,
                });
            }
            msnry?.reloadItems?.();
            msnry?.layout?.();
        });
    });

    watch(
        () => imageList.value.length > 0,
        (notEmpty) => {
            requestAnimationFrame(() => {
                if (!notEmpty || !listDom.value) {
                    destroyMsnry();
                    return;
                }
                if (!resizeObserver) {
                    resizeObserver = new ResizeObserver(
                        _debounce(() => {
                            msnry?.layout?.();
                        }, 200)
                    );
                }
                resizeObserver?.observe(listDom.value);
            });
        }
    );

    onBeforeUnmount(() => {
        destroyMsnry();
    });
}
