# @stone/uemo-editor-tiptap

## Tiptap 使用方法记录

1.  获取 mark 所在选区

    ```ts
    import { getMarkRange } from "@tiptap/core";
    const { doc, selection } = editor.state;
    const { from, to, $from } = selection;
    const linkRange = getMarkRange($from, editor.schema.marks.link);
    ```

2.  判断选区中是否有文字内容

    ```ts
    import { isTextSelection } from "@tiptap/core";
    const { doc, selection } = editor.state;
    const { from, to, $from } = selection;
    const selectedText = doc.textBetween(from, to);
    const isEmptyTextBlock = !selectedText.length && isTextSelection(selection);
    ```

3.  获取属性值

    ```ts
    editor.getAttributes("link").href;
    ```

4.  判断是否处于指定类型中

    ```ts
    editor.isActive("link");
    ```

5.  获取选区内文字

    ```ts
    const { doc, selection } = editor.state;
    doc.textBetween(from, to);
    ```

6.  创建和设置文字选区

    ```ts
    import { TextSelection } from "@tiptap/pm/state";
    const newSelection = TextSelection.create(view.state.doc, newPosition, newPosition);
    editor.chain().setTextSelection(newSelection).run();
    ```

7.  扩展选区包裹指定类型

    ```ts
    const lastCursorPosition = -1;
    if (editor.isActive("link") && lastCursorPosition.value !== -1) {
        const { view, state } = editor;
        const { $from, $to } = state.selection;

        let linkRange: { from: number; to: number } | null = null;
        view.state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (linkRange) return false;

            const linkMark = node.marks.find((mark) => mark.type === editor.schema.marks.link);
            if (linkMark) {
                linkRange = { from: pos, to: pos + node.nodeSize };
            }
        });

        if (linkRange) {
            const newPosition = Math.min(lastCursorPosition.value, $to.pos - 1);
            const newSelection = TextSelection.create(view.state.doc, newPosition, newPosition);
            editor.chain().setTextSelection(newSelection).run();
            lastCursorPosition.value = -1;
        }
    }
    ```

8.  获取指定 Mark 的 Range

    ```ts
    import { getMarkRange } from "@tiptap/core";

    const { state, schema, view } = editor;
    const { selection } = state;
    const { $from } = selection;
    const linkRange = getMarkRange($from, linkMark);

    if (linkRange?.from && linkRange?.to) {
        // 处理链接选区
        const newSelection = TextSelection.create(view.state.doc, linkRange.from, linkRange.to);
        view.dispatch(view.state.tr.setSelection(newSelection));

        editor.chain().setEditingMark("link").run();
    }
    ```
