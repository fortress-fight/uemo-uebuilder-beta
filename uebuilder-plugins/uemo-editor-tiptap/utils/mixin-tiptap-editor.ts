/*
 * @Description: 工具栏按钮通用
 * @Author: F-Stone
 * @LastEditTime: 2025-04-23 00:30:08
 */
import type { InjectionKey, ShallowRef } from "vue";
import type { Editor } from "@tiptap/vue-3";

const key = Symbol() as InjectionKey<string>;

export function useInjectTiptapEditor() {
    const editor = inject<ShallowRef<Editor> | undefined>(key, undefined);
    return { editor: editor?.value };
}

export function useProvideTiptapEditor(editor: ShallowRef<Editor | undefined>) {
    provide<ShallowRef<Editor | undefined>>(key, editor);
}
