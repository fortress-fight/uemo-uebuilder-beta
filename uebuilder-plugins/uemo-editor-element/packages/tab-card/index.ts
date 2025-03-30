/*
 * @Description: Tab 卡片
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 01:10:05
 */
import type { App } from "vue";

import UeElTabCard from "./Main.vue";

UeElTabCard.install = (app: App) => {
    if (!UeElTabCard.name) return;
    app.component(UeElTabCard.name, UeElTabCard);
};

export interface UeElTabCardBaseProps {
    theme?: string;
    hideHead?: boolean;
    defaultCard?: string;
    minHeight?: string;
    maxHeight?: string;
    cards: { title: string; name: string }[];
}
export type UeElTabCardInstance = InstanceType<typeof UeElTabCard>;

export default UeElTabCard;
