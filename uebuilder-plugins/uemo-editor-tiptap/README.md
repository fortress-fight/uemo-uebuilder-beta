# @stone/uemo-editor-tiptap

## Tiptap 使用记录

1.  contenteditable 属性
    当 contenteditable 属性为 true 时，点击其内部，将不会聚焦在当前的 Node 上，而是聚焦其内部

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

9.  如何选中当前所在位置距离最近的指定节点

    ```ts
    import { findParentNode } from "@tiptap/core";

    const paragraphRange = findParentNode((node) => node.type.name === "paragraph")(selection);
    ```

10. 转换指定内容，示例：自动转换行首的 > 为块引用例如：


    appendTransaction 钩子会在每次事务（Transaction）应用后被调用，允许追加额外的事务。

    ```ts
    function createAutoBlockquotePlugin() {
        return new Plugin({
            appendTransaction: (transactions, oldState, newState) => {
                const trs = [];
                transactions.forEach((tr) => {
                    if (tr.docChanged) {
                        const newTr = newState.tr;
                        newState.doc.descendants((node, pos) => {
                            if (
                                node.type.name === "paragraph" &&
                                node.textContent.startsWith("> ") &&
                                pos === 0 // 仅处理行首
                            ) {
                                // 创建块引用节点
                                const blockquote = newState.schema.nodes.blockquote.create(
                                    {},
                                    newState.schema.nodes.paragraph.create(
                                        {},
                                        newState.schema.text(node.textContent.slice(2))
                                    )
                                );
                                newTr.replaceWith(pos, pos + node.nodeSize, blockquote);
                                trs.push(newTr);
                            }
                        });
                    }
                });
                return trs.length > 0 ? trs : null;
            },
        });
    }
    ```

11. 强制触发编辑器更新 (存在性能问题，不建议频繁使用)


    ```ts
    editor.view.updateState(editor.view.state);
    ```

12. 派发空事件触发编辑器更新


    ```ts
    // 获取编辑器视图（EditorView）
    const editorView = editor.view;

    // 创建空事务
    const tr = editorView.state.tr;

    // 添加一个空步骤（可选，但明确事务意图）
    tr.setMeta("manualUpdate", true);

    // 派发事务
    editorView.dispatch(tr);
    ```

13. 获取指定位置的的 Node


    ```ts
    state.doc.nodeAt(selection.from);
    ```

14. 获取选区内 DOM 节点


    ```ts
    const { view, state } = editor;
    const { from } = state.selection;

    // 获取位置处的 DOM 节点（node 和 offset）
    const domInfo = view.domAtPos(from);
    const domNode = domInfo.node as HTMLElement;
    const offset = domInfo.offset;

    // 获取块级节点（如 paragraph）的 DOM
    const nodeDom = view.nodeDOM(from);
    ```

15. 获取整个选区对应的 DOM 节点范围


    ```ts
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const domStartNode = range.startContainer;
        const domEndNode = range.endContainer;

        console.log("DOM 选区范围：", domStartNode, domEndNode);
    }
    ```

16. 获取节点对应的 Rect


    ```ts
    import { posToDOMRect } from "@tiptap/core";

    const { view } = editor;
    const { from, to } = state.selection;

    posToDOMRect(view, from, to);
    ```

17. 获取光标点击位置的 Node 信息


    ```ts
    {
        addProseMirrorPlugins() {
            const plugins: Plugin[] = [
                new Plugin({
                    key: new PluginKey("handleGridGroupEvent"),
                    props: {
                        // 修复当选中 Node 时，点击 gridItem ，gridItem 无法聚焦的问题
                        handleClick(view, pos, event) {
                            const dom = event.target;
                            if (!(dom instanceof HTMLElement)) return;
                            const clickInGridItemInner = dom.classList.contains($pageStyle["grid-item--inner"]);
                            const emptyP = dom.classList.contains($pageStyle["is-empty"]);
                            if (!clickInGridItemInner && !emptyP) return;

                            const coords = view.posAtCoords({
                                left: event.clientX,
                                top: event.clientY,
                            });

                            if (!coords) return;

                            const $pos = view.state.doc.resolve(coords.pos);
                            const $posNode = $pos.node($pos.depth);
                            const $targetPos = view.state.doc.resolve($posNode.lastChild?.resolve(0).pos || 0);
                            if (!$targetPos) return false;
                            const newSelection = TextSelection.create(view.state.doc, pos);
                            const { state } = view;
                            const { tr } = state;
                            view.dispatch(tr.setSelection(newSelection));
                            return true;
                        },
                    },
                }),
            ];
        },
    };
    ```

    ```ts
     addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("cursorControl"),
                props: {
                    handleDOMEvents: {
                        click: (view, event) => {
                            // 执行 Ctrl + 左键点击的操作
                            if ((event.ctrlKey || event.metaKey) && event.button === 0) {
                                // 获取鼠标点击的位置
                                const { clientX, clientY } = event;

                                // 根据鼠标位置获取对应的文档位置
                                const coords = view.posAtCoords({
                                    left: clientX,
                                    top: clientY,
                                });

                                if (!coords) return;

                                const { state } = view;
                                const { tr, doc } = state;
                                const $pos = doc.resolve(coords.pos);
                                const $posNode = $pos.node($pos.depth);

                                const newSelection = TextSelection.create(doc, coords.pos);
                                if ($posNode.type.name === "paragraph") {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    view.dispatch(tr.setSelection(newSelection));
                                }
                                return;
                            }
                        },
                    },
                },
            }),
        ];
    },
    ```

18. 如何获得 $pos 的父级 Node 的 pos


    $pos.depth：当前所在层级深度（例如 2 表示 doc → paragraph → text）。
    $pos.before(n)：返回第 n 层级节点在文档中的 起始位置（包含 tag、start 位置）。
    $pos.before($pos.depth) 即当前 Node 的父节点的起始位置。
    $pos.after($pos.depth) 则是当前 Node 的父节点的结束位置。

    ```ts
    const parentDepth = $pos.depth - 1;
    const parentPos = $pos.before(parentDepth + 1);
    ```

    ```ts
    const $pos = doc.resolve(targetPos);
    const parentNode = $pos.node($pos.depth - 1);
    const parentPos = $pos.before($pos.depth);
    ```

19. 判断指定元素是否可以插入目标元素


    ```ts
    const targetPosInfo = getTargetPositionInfo(editor);

    if (!targetPosInfo) return false;

    const { schema, doc } = state;

    const rawTargetPos = pos === "before" ? targetPosInfo.start : targetPosInfo.end;
    const $pos = doc.resolve(rawTargetPos);
    const paragraph = schema.nodes.paragraph.create();

    let insertPos = rawTargetPos;
    let foundValid = false;

    // 从当前 depth 向上查找可以插入 paragraph 的父节点
    for (let depth = $pos.depth; depth >= 0; depth--) {
        const parent = $pos.node(depth);
        const canInsert = parent.type.validContent(Fragment.from(paragraph));

        if (canInsert) {
            // 找到合法插入点，计算插入位置
            insertPos = pos === "before" ? $pos.before(depth + 1) : $pos.after(depth + 1);
            foundValid = true;
            break;
        }
    }
    if (foundValid) {
        commands.focus();
        commands.insertContentAt(insertPos, { type: "paragraph" });
    }

    return true;
    ```
