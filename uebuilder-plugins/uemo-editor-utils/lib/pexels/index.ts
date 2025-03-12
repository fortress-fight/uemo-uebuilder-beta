import type { Videos, Video } from "pexels";

import { UeError } from "../error";
import { createClient } from "pexels";

export type { Videos, Video };

export default class Pexels {
    pexels: ReturnType<typeof createClient>;

    constructor(accessKey: string) {
        this.pexels = createClient(accessKey);
    }

    // 新增私有方法用于统一响应验证
    private validateResponse<T>(res: T): T {
        if (!res) {
            throw new Error("No response received");
        }
        if (this.pexels.typeCheckers.isError(res)) {
            throw new UeError("ERROR:PEXELS_API_ERROR", { message: res.error });
        }
        return res;
    }

    // 重构 videoSearch，使用 async/await
    async videoSearch(
        query: string,
        page = 1,
        orientation?: "landscape" | "portrait" | "square" | ""
    ): Promise<Videos> {
        const params: any = { query: query || "Nature", page, per_page: 10, size: "large", locale: "zh-CN" };
        if (orientation) {
            params.orientation = orientation;
        }
        try {
            const res = await this.pexels.videos.search(params);
            return this.validateResponse<Videos>(res as Videos);
        } catch (err) {
            if (err instanceof UeError) {
                return Promise.reject(err);
            } else {
                return Promise.reject(new UeError("ERROR:UNKNOWN_ERROR", { message: "未知错误" }));
            }
        }
    }

    // 重构 popularVideoSearch，使用 async/await
    async popularVideoSearch(page: number): Promise<Videos> {
        try {
            const res = await this.pexels.videos.popular({ page, per_page: 10, min_duration: 1, max_duration: 5 });
            return this.validateResponse<Videos>(res as Videos);
        } catch (err) {
            if (err instanceof UeError) {
                return Promise.reject(err);
            } else {
                return Promise.reject(new UeError("ERROR:UNKNOWN_ERROR", { message: "未知错误" }));
            }
        }
    }
}
