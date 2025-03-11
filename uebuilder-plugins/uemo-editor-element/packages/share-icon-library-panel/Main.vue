<!--
 * @Description: 社交分享资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-11 11:25:28
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #ShareLibList>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-4 gap-2" v-if="!!list">
                <template v-for="item in list">
                    <div
                        v-for="iconClass in item.icon"
                        :key="iconClass"
                        :class="$style['library-item']"
                        class="cursor-pointer"
                        :data-select="iconClass == select"
                        @click="select = iconClass"
                    >
                        <div :class="$style['thumb-box']" class="flex justify-center items-center">
                            <i class="ue-share" :class="item.icon"></i>
                        </div>
                        <div :class="$style['icon-name']" class="text-center">{{ item.name }}</div>
                    </div>
                </template>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('SHARE_ICON_LIBRARY_TIP_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElShareIconLibraryPanelBaseProps } from "./index";

defineOptions({ name: "UeElShareIconLibraryPanel" });

const { t } = useI18n();

const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElShareIconLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: true });

const loading = ref(false);
const list = ref<UE_EL_UTIL.ResourceShareIcon | null>(null);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [{ title: t("SHARE_ICON_LIBRARY_TITLE"), icon: "icon-app-share", name: "ShareLibList", iconSize: 15 }],
}));

const getShareIconLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.getShareIconLibrary();

        clearTimeout(timer);

        list.value = res || null;
        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    getShareIconLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});
</script>
<style lang="scss" module>
.share-library-panel {
    //
}
.library-list {
    //
}
.library-item {
    position: relative;

    overflow: hidden;

    padding-bottom: 10px;

    border-radius: var(--ue-border-radius--lv1);
    &:hover {
        background-color: color(var(--ue-background-color));
    }
    &[data-select="true"] {
        background-color: transparent;
        &::before {
            box-shadow: inset 0 0 0 4px color(var(--ue-border-color--deeper)), inset 0 0 0 7px #fff;
        }
    }
    .thumb-box {
        @include space-placeholder(100, 80, 100%);
        font-size: 28px;

        position: relative;

        overflow: hidden;

        max-width: 100%;

        border-radius: var(--ue-border-radius--lv1);
    }
    &::before {
        @include ab-cover;
        z-index: 10;

        content: "";
        pointer-events: none;

        border-radius: var(--ue-border-radius--lv1);
        box-shadow: inset 0 0 0 0 color(var(--ue-border-color));
    }
}
</style>
