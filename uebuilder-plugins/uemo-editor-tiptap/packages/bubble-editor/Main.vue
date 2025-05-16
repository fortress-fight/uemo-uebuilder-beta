<!--
 * @Description: 气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-05-16 14:56:57
-->
<template>
    <div :class="$style['bubble-editor']" v-bind="$attrs">
        <TiptapEditorContent v-if="tiptapEditor" :editor="tiptapEditor" />
    </div>
    <UeTiptapEditorPanel ref="attrEditorPanel" />
</template>

<script lang="ts" setup>
import type { UeTiptapBubbleEditorBaseProps } from "./index";

import { Editor } from "@tiptap/vue-3";
import { UE_ENGINE } from "@stone/uemo-editor-utils/lib/ue-ai";

import { linkRegex } from "./utils/helper";
import { useProvideTiptapEditor } from "../../utils/mixin-tiptap-editor";
import { createBubbleEditorExtension } from "../../utils/tiptap-bubble-extension";
import { UeTipTapError, UeTipTapErrorCode } from "../../utils/error";
import TiptapEditorContent from "./sub-components/TiptapEditorContent.vue";
import $pageStyle from "../../src/app.module.scss";

defineOptions({
    name: "UeTiptapBubbleEditor",
});

const { t } = useI18n();

const instance = getCurrentInstance();
const props = withDefaults(defineProps<UeTiptapBubbleEditorBaseProps>(), {
    device: "pc",
});

const emit = defineEmits<{
    (e: "ready" | "update" | "create" | "destroy" | "blur" | "focus" | "selectionUpdate", editor: Editor): void;
}>();

const tiptapEditor = shallowRef<Editor | undefined>();
const attrEditorPanel = useTemplateRef("attrEditorPanel");
const loading = ref<boolean>(false);
const cancelTask = ref<(() => void) | null>(null);

useProvideTiptapEditor(tiptapEditor);

/**
 * 初始化编辑器事件监听
 * @param {Editor} editor - Tiptap 编辑器实例
 */
const initEditorEvents = (editor: Editor): void => {
    const events = ["selectionUpdate", "blur", "focus", "update", "create", "destroy"] as const;
    events.forEach((event) => {
        editor.on(event, () => emit(event, editor));
    });
};

/**
 * 清理取消任务
 */
const cleanupCancelTask = (): void => {
    cancelTask.value = null;
};

/**
 * 执行取消操作
 */
const executeCancel = (): void => {
    cancelTask.value?.();
    cleanupCancelTask();
    loading.value = false;
};

const ueEngine = new UE_ENGINE();

/**
 * 处理 AI 请求
 * @param {string} type - AI 处理类型
 * @param {string} text - 待处理的文本
 * @param {Object} param - 回调参数
 */
const handleAIRequest = async (type: string, text: string, param: any): Promise<void> => {
    if (loading.value) return;

    // 如果已有请求在进行，先取消
    if (cancelTask.value) {
        executeCancel();
    }

    const pluginConfig = instance?.proxy?.$ueElTextAI?.(type);

    if (!pluginConfig) {
        instance?.proxy?.$ueElToast.error(t("AI_EDITING_NO_CONFIG_ERROR"));
        return;
    }
    if (!text) {
        instance?.proxy?.$ueElToast.error(t("AI_EDITING_NO_TEXT_ERROR"));
        return;
    }

    loading.value = true;
    param.onStart?.();

    const { fire, cancel } = ueEngine.submitAiApi(pluginConfig.url, pluginConfig.type, pluginConfig.key, { text });

    // 保存取消函数
    cancelTask.value = cancel;

    try {
        const res = await fire<string>();

        // 请求成功后清理取消函数
        cleanupCancelTask();

        if (res.statusCode !== 0) {
            throw new UeTipTapError(UeTipTapErrorCode.AI_EDITING_REQUEST_ERROR, {
                message: res.message || t("UNIT_UNKNOWN_ERROR"),
            });
        }
        if (typeof res.statusCode === "undefined") {
            throw new UeTipTapError(UeTipTapErrorCode.AI_EDITING_REQUEST_ERROR, {
                message: t("UNIT_UNKNOWN_ERROR"),
            });
        }

        const processedText = res.data.replace(/(?:\r\n|\r|\n)/g, "");
        param.onSuccess?.(processedText);
    } catch (error: any) {
        if (error?.code !== "ERR_CANCELED") {
            instance?.proxy?.$ueElError(error);
        }
    } finally {
        loading.value = false;
        param.onComplete?.();
    }
};

/**
 * 创建编辑器实例
 * @returns {Editor} Tiptap 编辑器实例
 */
const uploadImageHandler = instance?.proxy?.$ueFileUpload({ uploadConfig: undefined });
const createEditor = (): Editor | undefined => {
    if (!attrEditorPanel.value) return;

    const { openAttrEditorPanel, closeAttrEditorPanel } = attrEditorPanel.value;

    const editor = new Editor({
        injectCSS: true,
        content: props.content.replace(linkRegex, ""),
        extensions: createBubbleEditorExtension({
            showToast: (type: "success" | "error", message: string) => {
                instance?.proxy?.$ueElToast[type](message);
            },
            openAttrEditorPanel,
            closeAttrEditorPanel,
            createUploadHandler: () => uploadImageHandler,
            AIExtension: {
                AIHandler: {
                    fire: handleAIRequest,
                    cancel: executeCancel,
                },
            },
        }),
        editorProps: {
            attributes: {
                class: $pageStyle["ue-richtext-editor"],
            },
        },
    });

    initEditorEvents(editor);
    emit("ready", editor);
    return editor;
};

// 监听设备类型变化
watch(
    () => props.device,
    (value) => tiptapEditor.value?.commands.updateDevice(value)
);

onMounted(() => {
    tiptapEditor.value = createEditor();
});

onBeforeUnmount(() => {
    executeCancel();

    if (!tiptapEditor.value?.isDestroyed) {
        tiptapEditor.value?.destroy();
    }
});
</script>

<style lang="scss" module>
.bubble-editor {
    // 添加必要的样式
}
</style>
