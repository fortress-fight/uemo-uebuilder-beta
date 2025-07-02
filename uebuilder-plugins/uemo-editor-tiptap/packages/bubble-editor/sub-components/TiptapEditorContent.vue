<template>
    <UeTiptapEditorMenu />
    <EditorContent :editor="editor" />
    <LinkPanel />
    <AILoadingPanel />
    <AddNodePanel />

    <UeTiptapButtonRowMenu />
    <UeTiptapButtonItemMenu />
    <UeTiptapImageMenu />
    <UeTiptapSvgIconMenu />
    <UeTiptapFrameMenu />
    <UeTiptapSvgViewMenu />
    <UeTiptapSplineMenu />
    <UeTiptapLottieMenu />
    <UeTiptapGridGroupMenu />
    <UeTiptapGridItemMenu />
    <UeTiptapDividerBlockMenu />
    <UeTiptapHrRuleMenu />
    <UeTiptapShareRowMenu />
    <UeTiptapShareItemMenu />
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";

import { EditorContent } from "@tiptap/vue-3";
import LinkPanel from "../../extension-link/panel/LinkPanel.vue";
import AILoadingPanel from "../../extension-ai/panel/AILoadingPanel.vue";
import AddNodePanel from "../../extension-node-placeholder/panel/AddNodePanel.vue";
import UeTiptapButtonRowMenu from "../../extension-button/menu/ButtonRowMenu.vue";
import UeTiptapButtonItemMenu from "../../extension-button/menu/ButtonItemMenu.vue";
import UeTiptapImageMenu from "../../extension-image/menu/ImageMenu.vue";
import UeTiptapSvgIconMenu from "../../extension-svg-icon/menu/SvgIconMenu.vue";
import UeTiptapFrameMenu from "../../extension-frame/menu/FrameMenu.vue";
import UeTiptapSvgViewMenu from "../../extension-svg-view/menu/SvgViewMenu.vue";
import UeTiptapSplineMenu from "../../extension-spline/menu/SplineMenu.vue";
import UeTiptapLottieMenu from "../../extension-lottie/menu/LottieMenu.vue";
import UeTiptapGridGroupMenu from "../../extension-grid/menu/GridGroupMenu.vue";
import UeTiptapGridItemMenu from "../../extension-grid/menu/GridItemMenu.vue";
import UeTiptapDividerBlockMenu from "../../extension-divider-block/menu/DividerBlockMenu.vue";
import UeTiptapHrRuleMenu from "../../extension-hr-rule/menu/HrRuleMenu.vue";
import UeTiptapShareRowMenu from "../../extension-share/menu/ShareRowMenu.vue";
import UeTiptapShareItemMenu from "../../extension-share/menu/ShareItemMenu.vue";

const props = defineProps<{ editor: Editor }>();

// 定义收集字体和字号的方法
const collectTextStyles = () => {
    const fontFamilyList: string[] = [];
    const fontSizeList: string[] = ["default"];

    // 遍历文档中的所有文本节点
    props.editor?.state.doc.descendants((node) => {
        if (!node.isText) return;

        // 检查节点的文本样式标记
        node.marks.forEach((mark) => {
            if (mark.type.name !== "textStyle") return;

            const { fontFamily, fontSize } = mark.attrs;

            // 收集字体
            if (fontFamily && !fontFamilyList.includes(fontFamily)) {
                fontFamilyList.push(fontFamily);
            }

            // 收集字号
            if (fontSize && !fontSizeList.includes(fontSize)) {
                fontSizeList.push(fontSize);
            }
        });
    });

    // 输出收集到的字体列表
    // console.log("fontFamilyList", fontFamilyList);
};

onMounted(() => {
    // 监听编辑器更新事件
    props.editor.on("update", collectTextStyles);
});
</script>
<style lang="scss" module>
//
</style>
