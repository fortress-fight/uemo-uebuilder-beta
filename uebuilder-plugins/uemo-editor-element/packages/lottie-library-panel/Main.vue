<!--
 * @Description: Lottie 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 17:02:51
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
                <div
                    class="cursor-pointer"
                    v-for="item in getLottieList(activeCategory)"
                    :class="$style['library-item']"
                    :data-select="select === item.url"
                    :key="item.url"
                    @click="selectLottie(item.url)"
                >
                    <div :class="$style['thumb-box']">
                        <LottiePreview :size="lottieLib?.[activeCategory].size" :url="item.url" />
                    </div>
                </div>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('LOTTIE_LIBRARY_TIP_EMPTY')" />
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
import LottiePreview from "./sub-components/LottiePreview.vue";

defineOptions({ name: "UeElLottieLibraryPanel" });

const { t, locale } = useI18n();
const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElLottieLibraryPanelBaseProps>(), {});
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
const categoryList = computed(() => {
    const useLib = lottieLib.value;
    const name = locale.value === "zh-cn" ? "nameCN" : "name";
    return Object.keys(useLib || {}).map((item) => ({
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
    if (select.value && lottieLib.value) {
        let _selectCategory = "";
        Object.entries(lottieLib.value).some(([key, value]) => {
            if (value.list.find((item) => item.url === select.value)) {
                _selectCategory = key;
                return true;
            }
            return false;
        });
        selectCategory.value = _selectCategory;
        return;
    }
    selectCategory.value = Object.keys(lottieLib.value || {})[0] || "";
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
.library-item {
    width: 100%;

    border-radius: var(--ue-border-radius--lv1);
    &[data-select="true"] {
        .thumb-box {
            &::before {
                box-shadow: inset 0 0 0 4px color(var(--ue-border-color--deeper)), inset 0 0 0 7px #fff;
            }
        }
    }
    .thumb-box {
        @include image-placeholder-v4(300, 300);
        position: relative;

        overflow: hidden;

        max-width: 100%;

        border-radius: var(--ue-border-radius--lv1);
        &::before {
            @include ab-cover;
            z-index: 10;

            content: "";
            pointer-events: none;

            border-radius: var(--ue-border-radius--lv1);
            box-shadow: inset 0 0 0 1px color(var(--ue-border-color));
        }
    }
}
</style>
