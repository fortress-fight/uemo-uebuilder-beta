<!--
 * @Description: 字体库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 02:14:59
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #FontsPanel>
            <UeElLoading v-if="loading" />
            <LibraryList v-model:select="select" :list="usedFontFamily" />
        </template>
        <template #EnFontsPanel>
            <UeElLoading v-if="loading" />
            <LibraryList v-model:select="select" :list="enFontFamily" />
        </template>
        <template #CnFontsPanel>
            <UeElLoading v-if="loading" />
            <LibraryList v-model:select="select" :list="zhFontFamily" />
        </template>
        <template #panelFooter>
            <UeElButton
                theme="fillText"
                size="large"
                :text="t('FONT_LIBRARY_USE_DEFAULT')"
                @click="useFontFamily('')"
            />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElFontFamilyLibraryPanelBaseProps } from "./index";
import type { FontFace } from "./utils/helper";

import { addPreviewFont } from "./utils/helper";
import LibraryList from "./sub-components/LibraryList.vue";

const { t } = useI18n();
const instance = getCurrentInstance();
defineOptions({ name: "UeElFontFamilyLibraryPanel" });
const _prop = withDefaults(defineProps<UeElFontFamilyLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: false });

const fontFamilyLibrary = ref(instance?.proxy?.$ueElResource.fontFamilyLibrary);

const defaultCardName = ref<string>("FontsPanel");
const libraryPanelParam = computed(() => {
    return {
        cards: [
            { title: t("FONT_LIBRARY_USED_FONT_TITLE"), name: "FontsPanel" },
            { title: t("FONT_LIBRARY_EN_FONT_TITLE"), name: "EnFontsPanel" },
            { title: t("FONT_LIBRARY_ZH_FONT_TITLE"), name: "CnFontsPanel" },
        ],
    } as UE_EL_COMPONENT.UeElLibraryPanelProps;
});

const loading = ref(false);

const usedFontFamily = shallowRef<UE_EL_UTIL.ResourceFontFamilyItem[]>([
    { label: "微软雅黑", name: "微软雅黑", lang: "zh", src: "", subList: [] },
    { label: "宋体", name: "宋体", lang: "zh", src: "", subList: [] },
    { label: "Arial", name: "Arial", lang: "zh", src: "", subList: [] },
]);

onBeforeMount(() => {
    let pageUsedFontFamily: UE_EL_UTIL.ResourceFontFamilyItem[] = [];
    if (fontFamilyLibrary.value?.getUsedFontFamily) {
        fontFamilyLibrary.value
            .getUsedFontFamily()
            .then((res) => {
                pageUsedFontFamily = res.map((item) => ({
                    label: item.name,
                    name: item.name,
                    lang: "",
                    src: item.src,
                    subList: [],
                }));
                usedFontFamily.value = [...usedFontFamily.value, ...pageUsedFontFamily];
            })
            .catch((error) => {
                instance?.proxy?.$ueElError(error);
            });
    }
});

const zhFontFamily = shallowRef<UE_EL_UTIL.ResourceFontFamilyItem[]>([]);
const enFontFamily = shallowRef<UE_EL_UTIL.ResourceFontFamilyItem[]>([]);

function useFontFamily(fontFamily: string) {
    select.value = fontFamily;
}

const getFontFamilyLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.fontFamilyLibrary.getData();

        if (res) {
            zhFontFamily.value = res.group.zh;
            enFontFamily.value = res.group.en;

            const result: FontFace[] = Object.entries(res.detail).map(([name, link]) => {
                return { name, link };
            });

            addPreviewFont(result);
        }

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    if (!fontFamilyLibrary.value?.enable) return;
    getFontFamilyLibrary()
        .then(() => {
            //
        })
        .catch((error) => {
            instance?.proxy?.$ueElError(error);
        });
});
</script>
<style lang="scss" module>
.font-family-library-panel {
    //
}
</style>
