/*
 * @Description: 工具栏按钮通用
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 02:22:46
 */
import type { InjectionKey } from "vue";
import type { Editor } from "@tiptap/vue-3";

const key = Symbol() as InjectionKey<string>;

export function useInjectTiptapEditor() {
    const editor = inject<Editor | undefined>(key, undefined);
    return { editor };
}

export function useProvideTiptapEditor(editor: Editor) {
    provide<Editor>(key, editor);
}
