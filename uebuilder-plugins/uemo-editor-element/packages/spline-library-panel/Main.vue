<!--
 * @Description: spline资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 19:19:34
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #splineLibList>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-2 gap-2" v-if="!!list">
                <UeElSelectBox
                    v-for="(item, index) in list"
                    :key="index"
                    :select="select === item.url"
                    @trigger="selectSpline(item.url)"
                >
                    <img :src="item.poster" />
                </UeElSelectBox>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('SPLINE_LIBRARY_TIP_EMPTY')" />
            </div>
        </template>
        <template #splineLink>
            <UeElTextInput
                :value="splineLink"
                padding-size="level4"
                theme="enterText"
                :placeholder="t('SPLINE_LIBRARY_LINK_TIP')"
                :rules="splineInputRules"
                @confirm="changeSelect($event)"
            />
            <UeElButton theme="fillText" size="large" :text="t('UNIT_SUBMIT')" @trigger="useLink" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElSplineLibraryPanelBaseProps } from "./index";
import { isSplineReg } from "@stone/uemo-editor-utils/lib/utils";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElSplineLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const prop = withDefaults(defineProps<UeElSplineLibraryPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "close"): void }>();
const select = defineModel<string>("select", { required: false });

const splineLibrary = ref(instance?.proxy?.$ueElResource.lottieLibrary);
const defaultCardName = ref<string>(splineLibrary.value?.enable ? "splineLibList" : "splineLink");
const libraryPanelParam = computed(() => {
    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: [{ title: t("UNIT_LINK"), name: "splineLink" }],
    };

    if (splineLibrary.value?.enable) {
        param.cards.unshift({
            title: t("SPLINE_LIBRARY_TITLE"),
            name: "splineLibList",
            icon: "icon-app-spline",
            iconSize: 15,
        });
    }

    return param;
});

const loading = ref(false);
const list = ref<UE_EL_UTIL.ResourceSpline["list"] | null>(null);

function updateCurrentCard() {
    if (select.value && !list.value?.find((item) => item.url === select.value)) {
        defaultCardName.value = "splineLink";
    } else {
        defaultCardName.value = "splineLibList";
    }
}

// #region Spline Link

const splineLink = ref<string>("");

const splineInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isSplineReg, message: t("SPLINE_LIBRARY_LINK_TIP") }];

function changeSelect(url: string) {
    splineLink.value = url;
}

function useLink() {
    if (splineLink.value.length === 0) return;
    select.value = splineLink.value;

    emit("close");
}

// #endregion

// #region 获取spline库

function filterList(libList: UE_EL_UTIL.ResourceSpline) {
    return libList.list.filter((item) => (prop.type ? item.type === prop.type : true));
}

const getSplineLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.splineLibrary.getData();

        clearTimeout(timer);

        list.value = res ? filterList(res) : null;
        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

function selectSpline(url: string) {
    splineLink.value = "";
    select.value = url;
}

onBeforeMount(() => {
    if (!splineLibrary.value?.enable) return;
    getSplineLibrary()
        .then(() => {
            updateCurrentCard();
        })
        .catch((error) => {
            instance?.proxy?.$ueElError(error);
        });
});

// #endregion
</script>
<style lang="scss" module>
.library-list {
    //
}
</style>
