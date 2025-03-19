<!--
 * @Description: Lottie 库面板组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 13:51:52
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #LottieLibList="{ activeCategory }">
            <UeElLoading v-if="loading" />
            <div
                v-if="getLottieList(activeCategory).length > 0"
                class="grid gap-2"
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
            <UeElEmptyPanel v-else :description="t('UNIT_SEARCH_EMPTY')" />
        </template>
        <template #LottieUpload>
            <UeElFileUploadButton type="lottie" @submit="useUpload" />
        </template>
        <template #LottieLink>
            <UeElTextInput
                :value="lottieLink"
                padding-size="level4"
                theme="enterText"
                :placeholder="t('LOTTIE_LIBRARY_LINK_TIP')"
                :rules="lottieInputRules"
                @confirm="changeSelect"
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

/**
 * Lottie 库配置和状态管理
 */
const lottieLibrary = ref(instance?.proxy?.$ueElResource.lottieLibrary);
const defaultCardName = ref<string>(lottieLibrary.value?.enable ? "LottieLibList" : "LottieUpload");
const loading = ref(false);
const lottieLib = ref<UE_EL_UTIL.ResourceLottie | null>(null);
const selectCategory = ref<string>("");
const lottieLink = ref<string>("");

/**
 * 分类配置
 */
const categoryGroup: Record<UE_EL_UTIL.LottieLibraryType, string[]> = {
    icon: ["icon"],
    normal: ["icon", "figure"],
};

/**
 * 计算库面板参数
 */
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

/**
 * 计算分类列表
 */
const categoryList = computed(() => {
    const useLib = lottieLib.value;
    const name = locale.value === "zh-cn" ? "nameCN" : "name";

    return Object.keys(useLib || {})
        .filter((item) => (props.type ? categoryGroup[props.type].includes(item) : true))
        .map((item) => ({
            name: capitalizeFirstLetter(useLib?.[item]?.[name] || ""),
            value: item,
            active: selectCategory.value === item,
        }));
});

/**
 * 工具函数
 */
const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * 获取指定分类的 Lottie 列表
 */
const getLottieList = (category: string) => lottieLib.value?.[category]?.list || [];

/**
 * 选择 Lottie 动画
 */
const selectLottie = (url: string) => {
    lottieLink.value = "";
    select.value = url;
};

/**
 * 处理上传
 */
const useUpload = (url: UE_EL_UTIL.FileUploadInfo) => {
    select.value = url.url;
};

/**
 * 输入验证规则
 */
const lottieInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isLottieReg, message: t("LOTTIE_LIBRARY_LINK_TIP") }];

/**
 * 处理链接输入
 */
const changeSelect = (url: string) => {
    lottieLink.value = url;
};

/**
 * 使用链接
 */
const useLink = () => {
    if (!lottieLink.value) return;
    select.value = lottieLink.value;
    emit("close");
};

/**
 * 更新选中分类
 */
const updateSelectCategory = () => {
    if (defaultCardName.value !== "LottieLibList") {
        selectCategory.value = "";
        return;
    }

    const useLibCategory = categoryList.value.map((item) => item.value);

    if (select.value && lottieLib.value) {
        const _selectCategory =
            useLibCategory.find((key) => lottieLib.value?.[key]?.list.some((item) => item.url === select.value)) || "";
        selectCategory.value = _selectCategory;
        return;
    }

    selectCategory.value = useLibCategory[0] || "";
};

/**
 * 更新当前卡片
 */
const updateCurrentCard = () => {
    if (!select.value || !lottieLib.value) return;

    const isInLib = Object.values(lottieLib.value).some((item) => item.list.some((item) => item.url === select.value));

    defaultCardName.value = isInLib ? "LottieLibList" : "LottieUpload";
};

/**
 * 获取 Lottie 库数据
 */
const getLottieLibrary = async () => {
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.lottieLibrary.getData();
        lottieLib.value = res || null;
    } finally {
        clearTimeout(timer);
        loading.value = false;
    }
};

/**
 * 组件挂载前初始化
 */
onBeforeMount(async () => {
    if (!lottieLibrary.value?.enable) return;

    try {
        await getLottieLibrary();
        updateCurrentCard();
        updateSelectCategory();
    } catch (error: unknown) {
        instance?.proxy?.$ueElError(error instanceof Error ? error : new Error(String(error)));
    }
});
</script>

<style lang="scss" module>
.library-list {
    // 样式定义
}
</style>
