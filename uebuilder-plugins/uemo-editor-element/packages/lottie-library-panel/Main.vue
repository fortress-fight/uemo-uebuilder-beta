<!--
 * @Description: Lottie 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-11 19:28:17
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #LottieLibList="{ activeCategory }">
            <UeElLoading v-if="loading" />
            <div
                :class="[$style['library-list'], activeCategory === 'icon' ? 'grid-cols-3' : 'grid-cols-2']"
                class="grid gap-2"
                v-if="getLottieList(activeCategory).length > 0"
            >
                <div
                    v-for="item in getLottieList(activeCategory)"
                    :key="item.url"
                    :class="$style['library-item']"
                    class="cursor-pointer"
                    :data-select="select === item.url"
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
        <template #LottieUpload>
            <UeElFileUploadButton type="lottie" @submit="useUpload" />
        </template>
        <template #lottieLink>
            <UeElTextInput
                :value="lottieLink"
                padding-size="level4"
                theme="enterText"
                :placeholder="t('LOTTIE_LIBRARY_LINK_TIP')"
                :rules="lottieInputRules"
                @confirm="changeSelect($event)"
            />
            <UeElButton theme="fillText" size="large" :text="t('UNIT_SUBMIT')" @trigger="useLink" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElLottieLibraryPanelBaseProps } from "./index";

import { isLottieReg } from "@stone/uemo-editor-utils/lib/utils";
import LottiePreview from "./sub-components/LottiePreview.vue";

defineOptions({ name: "UeElLottieLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElLottieLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: false });
const emit = defineEmits<{ (e: "close"): void }>();

const defaultCardName = ref<string>("LottieLibList");
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [
        {
            title: t("LOTTIE_LIBRARY_TITLE"),
            name: "LottieLibList",
            icon: "icon-app-lottie",
            iconSize: 15,
            category: categoryList.value,
        },
        { title: t("UNIT_UPLOAD"), name: "LottieUpload" },
        { title: t("UNIT_LINK"), name: "lottieLink" },
    ],
}));

const loading = ref(false);
const lottieLib = ref<UE_EL_UTIL.ResourceLottie | null>(null);

const selectCategory = ref<string>("");
function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const categoryList = computed(() => {
    return Object.keys(lottieLib.value || {}).map((item) => ({
        name: capitalizeFirstLetter(item),
        value: item,
        active: selectCategory.value === item,
    }));
});

function getLottieList(category: string) {
    return lottieLib.value?.[category]?.list || [];
}

function selectLottie(url: string) {
    lottieLink.value = "";
    select.value = url;
}

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

        if (!isInLib) {
            defaultCardName.value = "lottieLink";
        }
    }
}

const getLottieLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.getLottieLibrary();

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
