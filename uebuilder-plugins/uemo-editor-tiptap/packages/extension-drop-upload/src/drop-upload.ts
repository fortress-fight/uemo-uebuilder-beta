/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-05-13 16:34:58
 */
import type { EditorView } from "@tiptap/pm/view";

import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { guid } from "@stone/uemo-editor-utils/lib/guid";

import { i18n } from "../../../src/i18n";

export const DropUpload = Extension.create<{
    /**
     * 获取上传图片的回调函数
     */
    createUploadHandler?: () => ReturnType<UE_EL_UTIL.UploadHandler> | undefined;
}>({
    name: "dropUpload",

    addOptions() {
        return {};
    },

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [
            new Plugin({
                key: new PluginKey("dropImage"),
                props: {
                    handleDrop: (view: EditorView, event: Event) => {
                        if (!(event instanceof DragEvent) || !this.options.createUploadHandler || !event.dataTransfer) {
                            return;
                        }

                        const { schema, tr } = view.state;
                        const coords = view.posAtCoords({
                            left: event.clientX,
                            top: event.clientY,
                        });

                        if (!coords) return;

                        const currentNode = view.state.doc.nodeAt(coords.pos);

                        const imageFiles = Array.from(event.dataTransfer.files).filter((file) => {
                            return file.type.startsWith("image/");
                        });

                        if (imageFiles.length <= 0) {
                            return;
                        }
                        if (imageFiles.length > 6) {
                            this.editor.commands.showToast(
                                "error",
                                i18n.global.t("TIP_MAX_UPLOAD_IMAGE_COUNT", { count: 6 })
                            );
                            return true;
                        }

                        event.preventDefault();

                        const uploadImageHandler = this.options.createUploadHandler();

                        let insertPos = !currentNode ? coords.pos + 1 : coords.pos;

                        const newNodeArr: { file: File; pos: number; name: string; nodeId: string }[] = [];
                        imageFiles.forEach((file, index) => {
                            const nodeId = guid();
                            const node = schema.nodes.nodePlaceholder.create({
                                nodeId,
                                nodeName: "ImagePlaceholder",
                                nodeLoading: true,
                            });

                            tr.insert(insertPos, node);

                            newNodeArr.push({ file: file, pos: insertPos, name: this.name, nodeId });

                            insertPos += index + node.nodeSize;
                        });

                        view.dispatch(tr);

                        newNodeArr.forEach((param) => {
                            uploadImageHandler
                                ?.fire(param.file, {})
                                .then((path) => {
                                    const nodeAtPos = view.state.doc.nodeAt(param.pos);
                                    if (
                                        nodeAtPos?.type.name !== "nodePlaceholder" ||
                                        nodeAtPos?.attrs.nodeName !== "ImagePlaceholder" ||
                                        nodeAtPos?.attrs.nodeId !== param.nodeId
                                    ) {
                                        return;
                                    }

                                    const tr = view.state.tr;
                                    tr.setNodeMarkup(param.pos, view.state.schema.nodes.image, {
                                        src: path,
                                    });
                                    view.dispatch(tr);
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        });

                        return true;
                    },
                },
            }),
        ];

        return plugins;
    },
});
