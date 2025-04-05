import type { BubbleMenuPluginProps } from "./bubble-menu-plugin.js";

import { Extension } from "@tiptap/core";

import { BubbleMenuPlugin } from "./bubble-menu-plugin.js";

export type BubbleMenuOptions = Omit<BubbleMenuPluginProps, "editor">;

/**
 * This extension allows you to create a bubble menu.
 * @see https://tiptap.dev/api/extensions/bubble-menu
 */
export const BubbleMenu = Extension.create<BubbleMenuOptions>({
    name: "bubbleMenu",

    addOptions() {
        return {
            pluginKey: "bubbleMenu",
            updateDelay: undefined,
            shouldShow: null,
            controller: null,
        };
    },

    addProseMirrorPlugins() {
        if (!this.options.controller) {
            return [];
        }

        return [
            BubbleMenuPlugin({
                pluginKey: this.options.pluginKey,
                editor: this.editor,
                updateDelay: this.options.updateDelay,
                shouldShow: this.options.shouldShow,
                controller: this.options.controller,
            }),
        ];
    },
});
