<!--
 * @Description: spline资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 00:29:48
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #splineLibList>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-2 gap-2" v-if="!!list">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    :class="$style['library-item']"
                    class="cursor-pointer"
                    :data-select="select === item.url"
                    @click="selectSpline(item.url)"
                >
                    <div :class="$style['thumb-box']">
                        <img :src="item.poster" />
                    </div>
                </div>
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
            <UeElButton theme="fillText" size="large" text="确认" @trigger="useLink" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElSplineLibraryPanelBaseProps } from "./index";
import { isSplineReg } from "@stone/uemo-editor-utils/lib/utils";

defineOptions({ name: "UeElSplineLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const prop = withDefaults(defineProps<UeElSplineLibraryPanelBaseProps>(), {});
const emit = defineEmits<{
    (e: "close"): void;
}>();

const loading = ref(false);
const list = ref<UE_EL_UTIL.ResourceSpline["list"] | null>(null);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [
        { title: t("SPLINE_LIBRARY_TITLE"), name: "splineLibList", icon: "icon-app-spline", iconSize: 15 },
        { title: t("UNIT_LINK"), name: "splineLink" },
    ],
}));

const select = defineModel<string>("select", { required: false });

const defaultCardName = ref<string>("splineLibList");
function updateCurrentCard() {
    if (select.value && !list.value?.find((item) => item.url === select.value)) {
        defaultCardName.value = "splineLink";
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

function sortList(libList: UE_EL_UTIL.ResourceSpline) {
    return libList.list.filter((item) => (prop.type ? item.type === prop.type : true));
}

const getShapeLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.getSplineLibrary();

        clearTimeout(timer);

        list.value = res ? sortList(res) : null;
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
    getShapeLibrary()
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
