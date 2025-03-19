<!--
 * @Description: Lottie 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 13:48:09
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #LottieLibList="{ activeCategory }">
            <UeElLoading v-if="loading" />
            <div
                class="grid gap-2"
                v-if="getLottieList(activeCategory).length > 0"
                :class="[$style['library-list'], activeCategory === 'icon' ? 'grid-cols-3' : 'grid-cols-2']"
            >
                <UeElSelectBox
                    v-for="item in getLottieList(activeCategory)"
                    :key="item.url"
                    :select="select === item.url"
                    @trigger="selectLottie(item.url)"
                >
                    <LottiePreview :size="lottieLib?.[activeCategory].size" :url="item.url" />
                </UeElSelectBox>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('UNIT_SEARCH_EMPTY')" />
            </div>
        </template>
        <template #LottieUpload="">
            <UeElFileUploadButton type="lottie" @submit="useUpload" />
        </template>
        <template #LottieLink="">
            <UeElTextInput
                padding-size="level4"
                theme="enterText"
                :placeholder="t('LOTTIE_LIBRARY_LINK_TIP')"
                :rules="lottieInputRules"
                :value="lottieLink"
                @confirm="changeSelect($event)"
            />
            <UeElButton size="large" theme="fillText" :text="t('UNIT_SUBMIT')" @trigger="useLink" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElLottieLibraryPanelBaseProps } from "./index";

import { isLottieReg } from "@stone/uemo-editor-utils/lib/utils";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";
import LottiePreview from "./sub-components/LottiePreview.vue";

defineOptions({ name: "UeElLottieLibraryPanel" });

const { t, locale } = useI18n();
const instance = getCurrentInstance();
const props = withDefaults(defineProps<UeElLottieLibraryPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "close"): void }>();
const select = defineModel<string>("select", { required: false });

const lottieLibrary = ref(instance?.proxy?.$ueElResource.lottieLibrary);
const defaultCardName = ref<string>(lottieLibrary.value?.enable ? "LottieLibList" : "LottieUpload");
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => {
    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: [
            { title: t("UNIT_UPLOAD"), name: "LottieUpload" },
            { title: t("UNIT_LINK"), name: "LottieLink" },
        ],
    };
    if (lottieLibrary.value?.enable) {
        param.cards.unshift({
            title: t("LOTTIE_LIBRARY_TITLE"),
            name: "LottieLibList",
            icon: "icon-app-lottie",
            iconSize: 15,
            category: categoryList.value,
        });
    }
    return param;
});

const loading = ref(false);
const lottieLib = ref<UE_EL_UTIL.ResourceLottie | null>(null);

const selectCategory = ref<string>("");
function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 分类列表
const categoryGroup: Record<UE_EL_UTIL.LottieLibraryType, string[]> = {
    icon: ["icon"],
    normal: ["icon", "figure"],
};
const categoryList = computed(() => {
    const useLib = lottieLib.value;
    const name = locale.value === "zh-cn" ? "nameCN" : "name";
    return Object.keys(useLib || {})
        .filter((item) => {
            if (props.type) {
                return categoryGroup[props.type].includes(item);
            }
            return true;
        })
        .map((item) => ({
            name: capitalizeFirstLetter(useLib?.[item]?.[name] || ""),
            value: item,
            active: selectCategory.value === item,
        }));
});

// 获取 Lottie 列表
function getLottieList(category: string) {
    return lottieLib.value?.[category]?.list || [];
}

// 选择 Lottie
function selectLottie(url: string) {
    lottieLink.value = "";
    select.value = url;
}

// 上传 Lottie
function useUpload(url: UE_EL_UTIL.FileUploadInfo) {
    select.value = url.url;
}

// #region Lottie Link

const lottieLink = ref<string>("");

const lottieInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isLottieReg, message: t("LOTTIE_LIBRARY_LINK_TIP") }];

function changeSelect(url: string) {
    lottieLink.value = url;
}

function useLink() {
    if (lottieLink.value.length === 0) return;
    select.value = lottieLink.value;

    emit("close");
}

// #endregion

function updateSelectCategory() {
    if (defaultCardName.value !== "LottieLibList") {
        selectCategory.value = "";
        return;
    }
    const useLibCategory = categoryList.value.map((item) => item.value);

    if (select.value && lottieLib.value) {
        let _selectCategory = "";
        useLibCategory.some((key) => {
            if (lottieLib.value?.[key]?.list.find((item) => item.url === select.value)) {
                _selectCategory = key;
                return true;
            }
            return false;
        });

        selectCategory.value = _selectCategory;
        return;
    }
    selectCategory.value = useLibCategory[0] || "";
}

function updateCurrentCard() {
    if (select.value && lottieLib.value) {
        const isInLib = Object.values(lottieLib.value).some((item) =>
            item.list.find((item) => item.url === select.value)
        );

        if (isInLib) {
            defaultCardName.value = "LottieLibList";
        } else {
            defaultCardName.value = "LottieUpload";
        }
    }
}

const getLottieLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.lottieLibrary.getData();

        lottieLib.value = res || null;

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    if (!lottieLibrary.value?.enable) return;
    getLottieLibrary()
        .then(() => {
            updateCurrentCard();
            updateSelectCategory();
        })
        .catch((error) => {
            instance?.proxy?.$ueElError(error);
        });
});
</script>
<style lang="scss" module>
.lottie-library-panel {
    //
}
</style>
