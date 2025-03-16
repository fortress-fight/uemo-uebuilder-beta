<!--
 * @Description: 按钮库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 23:41:57
-->
<template>
    <UeElLibraryPanel :class="$style['button-library-panel']" :cards="libraryPanelParam.cards">
        <template #ButtonLibList="{ activeCategory }">
            <UeElLoading v-if="loading" />
            <div
                class="grid grid-cols-2 gap-2"
                v-if="getButtonList(activeCategory).length > 0"
                :class="$style['library-list']"
            >
                <UeElSelectBox
                    v-for="item in getButtonList(activeCategory)"
                    :height="50"
                    :key="item.id"
                    :select="selectButtonId === item.id"
                    :width="100"
                    @trigger="useButton(item)"
                >
                    <PreviewButton :key="item.id" :data="item.attrs" />
                </UeElSelectBox>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('UNIT_SEARCH_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonLibraryPanelBaseProps } from "./index";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";
import PreviewButton from "./sub-components/PreviewButton.vue";

const { t } = useI18n();
const instance = getCurrentInstance();
defineOptions({ name: "UeElButtonLibraryPanel" });
const _prop = withDefaults(defineProps<UeElButtonLibraryPanelBaseProps>(), {});
const select = defineModel<UE_EL_UTIL.ResourceButtonItem["attrs"]>("select", { required: false });

const loading = ref(false);
const buttonLib = ref<UE_EL_UTIL.ResourceButton | null>(null);
const buttonLibrary = ref(instance?.proxy?.$ueElResource.buttonLibrary);

function getButtonList(category: string) {
    return buttonLib.value?.[category]?.options || [];
}

const libraryPanelParam = computed(() => {
    const category = buttonLib.value
        ? Object.entries(buttonLib.value).map(([key, value]) => {
              return { name: value.name, value: key, active: key === "normal" };
          })
        : [];

    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: [
            {
                title: t("BUTTON_LIBRARY_TITLE"),
                name: "ButtonLibList",
                icon: "icon-button-normal",
                iconSize: 15,
                category,
            },
        ],
    };
    return param;
});

const getButtonLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.buttonLibrary.getData();
        buttonLib.value = res || null;

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

const selectButtonId = ref<string>("");
function useButton(item: UE_EL_UTIL.ResourceButtonItem) {
    selectButtonId.value = item.id;
    select.value = toRaw(item.attrs);
}

onBeforeMount(() => {
    if (!buttonLibrary.value?.enable) return;
    getButtonLibrary()
        .then(() => {
            // updateSelectCategory();
        })
        .catch((error) => {
            instance?.proxy?.$ueElError(error);
        });
});
</script>
<style lang="scss" module>
.button-library-panel {
    width: 500px !important;
}
</style>
