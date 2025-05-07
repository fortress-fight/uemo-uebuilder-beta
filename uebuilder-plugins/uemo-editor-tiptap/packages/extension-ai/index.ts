import { Extension, findParentNodeClosestToPos } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

/**
 * AI 处理器的回调函数类型
 */
interface AIHandlerCallbacks {
    /** AI 处理开始时的回调 */
    onStart?: () => void;
    /** AI 处理成功时的回调 */
    onSuccess?: (text: string) => void;
    /** AI 处理失败时的回调 */
    onError?: (error: Error) => void;
    /** AI 处理完成时的回调 */
    onComplete?: () => void;
}

/**
 * AI 扩展配置选项
 */
export interface AIExtensionOptions {
    /** AI 处理器配置 */
    AIHandler: {
        /** 触发 AI 处理 */
        fire: (type: string, text: string, callbacks: AIHandlerCallbacks) => Promise<void>;
        /** 取消 AI 处理 */
        cancel: () => void;
    };
}

/**
 * AI 扩展的存储状态
 */
export interface AIStorage {
    /** 当前 AI 加载状态 */
    AIEditing: boolean;
}

/**
 * AI 扩展的命令类型声明
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        AIExtension: {
            /** 更新加载状态 */
            updateLoadingState: (loading: boolean) => ReturnType;
            /** 触发 AI 编辑 */
            triggerAIEditing: (type: string) => ReturnType;
            /** 取消 AI 编辑 */
            cancelAIEditing: () => ReturnType;
        };
    }
}

/**
 * AI 扩展
 * 用于管理编辑器的 AI 相关功能
 */
export const AIExtension = Extension.create<AIExtensionOptions, AIStorage>({
    name: "AIExtension",

    /**
     * 添加扩展选项
     * @returns {AIExtensionOptions} 扩展选项
     */
    addOptions() {
        return {
            AIHandler: {
                fire: () => Promise.reject(new Error("缺少 AI 处理函数")),
                cancel: () => console.error("缺少 AI 取消函数"),
            },
        };
    },

    /**
     * 添加存储
     * @returns {AIStorage} 存储对象
     */
    addStorage() {
        return {
            AIEditing: false,
        };
    },

    /**
     * 添加命令
     * @returns {Object} 命令对象
     */
    addCommands() {
        return {
            /**
             * 更新加载状态
             * @param {boolean} loading - 加载状态
             */
            updateLoadingState: (loading) => () => {
                this.storage.AIEditing = loading;
                return true;
            },

            /**
             * 触发 AI 编辑
             * @param {string} type - AI 处理类型
             */
            triggerAIEditing:
                (type: string) =>
                ({ view, state, tr, editor }) => {
                    const selection = state.selection;
                    const { $from, $to } = selection;

                    // 查找选中范围所在的段落节点
                    const fromParagraphRange = findParentNodeClosestToPos(
                        $from,
                        (node) => node.type.name === "paragraph"
                    );
                    const toParagraphRange = findParentNodeClosestToPos($to, (node) => node.type.name === "paragraph");

                    if (!fromParagraphRange || !toParagraphRange) {
                        return false;
                    }

                    // 计算段落范围
                    const paragraphRange = {
                        from: fromParagraphRange.start,
                        to: toParagraphRange.start + toParagraphRange.node.nodeSize - 2,
                    };

                    // 创建新的文本选择
                    const newSelection = TextSelection.create(view.state.doc, paragraphRange.from, paragraphRange.to);

                    // 应用新的选择范围
                    tr.setSelection(newSelection);
                    view.dispatch(tr);

                    // 获取选中文本
                    const editorText = state.doc.textBetween(paragraphRange.from, paragraphRange.to);

                    // 触发 AI 处理
                    const { fire } = this.options.AIHandler;
                    fire(type, editorText, {
                        onStart: () => editor.chain().updateLoadingState(true).run(),
                        onSuccess: (text: string) => editor.chain().insertContent(text).run(),
                        onError: (error: Error) => console.error("AI 处理失败:", error),
                        onComplete: () => editor.chain().updateLoadingState(false).run(),
                    }).catch((error) => {
                        console.error("AI 处理异常:", error);
                        editor.chain().updateLoadingState(false).run();
                    });

                    return true;
                },

            /**
             * 取消 AI 编辑
             */
            cancelAIEditing: () => () => {
                const { cancel } = this.options.AIHandler;
                cancel();
                return true;
            },
        };
    },
});
