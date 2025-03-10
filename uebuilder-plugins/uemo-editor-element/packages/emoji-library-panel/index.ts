/*
 * @Description: Emoji 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 10:33:53
 */
import type { App } from "vue";

import UeElEmojiLibraryPanel from "./Main.vue";

UeElEmojiLibraryPanel.install = (app: App) => {
    if (!UeElEmojiLibraryPanel.name) return;
    app.component(UeElEmojiLibraryPanel.name, UeElEmojiLibraryPanel);
};

export type EmojiCategoryMap = { name: string; svg: string };
export type EmojiItem = {
    emoji: string;
    skin_tone_support: boolean;
    skin_tone_support_unicode_version: string;
    name: string;
    slug: string;
    unicode_version: string;
    emoji_version: string;
};
export type EmojiList = EmojiItem[];
export type EmojiData = { name: string; slug: string; emojis: EmojiList }[];

export interface UeElEmojiLibraryPanelBaseProps {
    query: string;
}
export type UeElEmojiLibraryPanelInstance = InstanceType<typeof UeElEmojiLibraryPanel>;

export default UeElEmojiLibraryPanel;
