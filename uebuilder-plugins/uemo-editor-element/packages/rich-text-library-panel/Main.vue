<!--
 * @Description: 富文本资源库
 * @Author: F-Stone
 * @LastEditTime: 2025-04-29 19:48:37
-->
<template>
    <UeElLibraryPanel
        :cards="libraryPanelParam.cards"
        :default-card="defaultCardName"
        :class="$style['rich-text-library-panel']"
    >
        <template #richTextLib>
            <UeElLoading v-if="loading" />
            <template v-if="showList?.length">
                <div :class="$style['theme-selector']" class="w-full">
                    <div class="grid w-fit grid-flow-col-dense" :class="$style['selector-list']">
                        <div
                            v-for="item in themeOptions"
                            :key="item.value"
                            :class="$style['selector-item']"
                            :data-active="theme == item.value"
                            :data-type="item.value"
                            :label="item.lable"
                            @click="theme = item.value"
                        ></div>
                    </div>
                </div>
                <div :class="$style['rich-text-list']" class="grid grid-cols-1 gap-2">
                    <UeElSelectBox
                        v-for="(item, index) in showList"
                        :key="index"
                        :select="select === item.value"
                        :autoHeight="true"
                        @trigger="selectRichText(item.value)"
                    >
                        <img :src="item.thumb" />
                    </UeElSelectBox>
                </div>
            </template>
            <UeElEmptyPanel v-else :description="t('UNIT_SEARCH_EMPTY')" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElRichTextLibraryPanelBaseProps } from "./index";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElRichTextLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();

const _prop = withDefaults(defineProps<UeElRichTextLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: false });

const richTextLibrary = ref(instance?.proxy?.$ueElResource.richTextLibrary);

// #region panel 相关
const defaultCardName = ref<string>("richTextLib");

const libraryPanelParam = computed(() => {
    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: [{ title: t("UNIT_TEXT_LIBRARY"), name: "richTextLib", icon: "icon-app-font", iconSize: 15 }],
    };

    return param;
});

const themeOptions = [
    { lable: t("UNIT_COLOR_NORMAL"), value: "color" },
    { lable: t("UNIT_COLOR_LIGHT"), value: "lighter" },
    { lable: t("UNIT_COLOR_DARK"), value: "darker" },
] as const;

// #endregion

// #region 资源读取

const loading = ref(false);
const theme = ref<"lighter" | "darker" | "color">("color");
const list = ref<UE_EL_UTIL.ResourceRichText | null>(null);

const showList = computed(() => {
    return list.value?.filter((item) => {
        if (theme.value === "color") {
            return true;
        }
        if (item.theme === "all") {
            return true;
        }
        return item.theme === theme.value;
    });
});

const getRichTextLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.richTextLibrary.getData();

        clearTimeout(timer);

        if (res) {
            list.value = res;
        }

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    if (!richTextLibrary.value?.enable) return;
    getRichTextLibrary()
        .then(() => {
            // updateCurrentCard();
        })
        .catch((error) => {
            instance?.proxy?.$ueElError(error);
        });
});

// #endregion

function selectRichText(value: string) {
    select.value = value;
}
</script>
<style lang="scss" module>
.rich-text-library-panel {
    //
}
.theme-selector {
    position: sticky;
    z-index: 20;
    top: 0;

    padding-bottom: 10px;

    color: color(var(--ue-font-color));
    background: #fff;
    .selector-list {
        gap: 10px;
    }
    .selector-item {
        position: relative;

        overflow: hidden;

        width: 20px;
        height: 20px;

        cursor: pointer;

        border-radius: var(--ue-border-radius--lv1);
        &[data-type="color"] {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYzY0ZGQwMi1mMTFlLWIxNDMtOWY1YS03ZmIyMDhlMzk2YzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU2RUIzRTkxMjNDMTFFRDhGRjQ4Qjg1MDM0ODE5QkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU2RUIzRTgxMjNDMTFFRDhGRjQ4Qjg1MDM0ODE5QkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njg0OTdiYzEtMTkwNC05NjQ2LWE5Y2MtN2RmYjNhNjZmM2NmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJjNjRkZDAyLWYxMWUtYjE0My05ZjVhLTdmYjIwOGUzOTZjNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtqGo8wAAAPbSURBVHjaTJWNjuwmDIVtMCSTafuq9zn7LL3906q9G8B2j83MqiMrQkz4ODYHh/3Xb2R/UmPqRELxPMg6zSY/unxI/0vO38v1na/f6PmdfvqDfv6bnh90fdJD6TQ/3Q/3Ria/eBP654NaI7YMokXExSt7YVemQm4Uv4r/EJWoGGapcIzxXiWvxSI+vQgtzHq+xzFIri8BjjRXIZjJ2bl6giqVQrUky12SVfZTaBQyz4AS4AqwfEMdhcCSCjgCXObAbVElRbFVslox1lggdL9xyMo5iPHjUAAE1m91qAAVj82EUWMXUEqULHAcEQL/p84z6RAYNH6xMliyeJW4cglWMalZfrfkahCrhrpKyzMKqUeEwJ0bFoNVgxvFbcyNVQqe1tk7WyMVNgmcRmmE/hWqRuLU/YULpUyGKKh0gHDSoUKccUTNqUEgZnbhAhQsjJHFjxqnBNx0Gk4HBoQz9RCLvJBR89Xt7KaNaifuzsB1zHNE3eVzbK+BgzqPgA5sPMLGDvctvIHSgHK4dtfTj9PlcD64HIHb5xCiUP00aTA+hfbpAycx4YMRNoutZuuwddq6bJ42TuunlW7AcUMdMraTiSxqDlxLr6Zjd6FaMeCG6C0Kyrx0PvW8dFwKXDuifEUiIy9p7Dy8DJxsS1txXiwYPo5OW1HgZl/znPe15jXHU49Lj1PbuaRrbcZVw4xYnKz8iX8+6G164LRW2GiNNmebq895zPmIuJ7z8VjjWv3Q1jRMFlfL05309r6gIhSzjN2oiJa6ikzE6vfqY573OsZ6ICY0nqcefTVZDTjsTa+6p1ETty5cHcdWGLPA24vbLO3T+tB+K57H0Me0c9mxoFebgtXKCiO+ceWNW/agKGpVQjQ1WdRHacP6HdGGnzcdg/r0rip4Qc+iGr4OX9boMLRTDnUGdTVewthleZvcb2+D2qYMbojJbbEo3kS/czYjNcLT08W81eE2KF3mdbkYpIXYdnNGarwjZdRRFmo/C3Bopsbpio2TcNxurIAitQeqph7qsP+kNkMgckxQqQPpm5jC1WnYld7kV/exNDBOcbdKZAdcVG3kc5FEdi6jyCCZkX5dVnZqptn966vw+xd90iJTbLbV1UlRFyyGLoxnzNQ9WNHv3+3VMrVF9IVLmfFRyG8EcOeKDhWLF2NxghjzYfrFrO+uui/mV/AbzZ4HQjGDZS0tkkmVknIywCJeuWS31C2N99dJ36fJrxsRzzhZTwdsLV62wGRFTpqfs/cFD9ZLl6Z792cgz3oTZWqPXl+iRso7wRIURKEvW3z9Ql18hF47cH6vsg3QUPpPgAEALUW3kWYUrC8AAAAASUVORK5CYII=");
            background-repeat: no-repeat;
            background-size: cover;
        }
        &[data-type="lighter"] {
            background: #fff;
        }
        &[data-type="darker"] {
            background: #000;
        }
        &[data-active="true"] {
            &::before {
                box-shadow:
                    inset 0 0 0 2px color(var(--ue-color--blue)),
                    inset 0 0 0 3px #fff;
            }
        }
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
.rich-text-list {
    position: relative;
    z-index: 10;
}
</style>
