import type { Basic } from "unsplash-js/dist/methods/photos/types";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";

import { createApi } from "unsplash-js";

export type PhotosBasic = Basic;

export default class Unsplash {
    unsplash: ReturnType<typeof createApi>;

    constructor(accessKey: string) {
        this.unsplash = createApi({
            accessKey,
        });
    }

    photosSearch(query: string, page = 1): Promise<ApiResponse<Photos>> {
        return this.unsplash.search.getPhotos({
            query: query || "Wallpaper",
            page,
            perPage: 20,
            contentFilter: "high",
            // @ts-expect-error
            lang: "zh-Hans",
        });
    }

    photosTrackDownload(query: string) {
        return this.unsplash.search.getPhotos({
            query,
            page: 1,
            perPage: 10,
        });
    }
}
