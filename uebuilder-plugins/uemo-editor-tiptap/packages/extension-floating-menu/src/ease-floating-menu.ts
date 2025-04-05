import type { FloatingMenuPluginProps } from "./ease-floating-menu-plugin";

import { Extension } from "@tiptap/core";

import { FloatingMenuPlugin } from "./ease-floating-menu-plugin";

export type FloatingMenuOptions = Omit<FloatingMenuPluginProps, "editor">;

/**
 * This extension allows you to create a floating menu.
 * @see https://tiptap.dev/api/extensions/floating-menu
 */
export const FloatingMenu = Extension.create<FloatingMenuOptions>({
    name: "floatingMenu",

    addOptions() {
        return {
            pluginKey: "floatingMenu",
            shouldShow: null,
        };
    },

    addProseMirrorPlugins() {
        return [
            FloatingMenuPlugin({
                pluginKey: this.options.pluginKey,
                editor: this.editor,
                shouldShow: this.options.shouldShow,
            }),
        ];
    },
});
