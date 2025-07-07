<!--
 * @Description: 背景属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 11:05:25
-->
<template>
    <UeElSettingGroup
        :class="$style['background-setting-group']"
        v-bind="settingGroupParams"
        @trigger="settingGroupTrigger"
    >
        <template v-if="sortBgList.length" #body>
            <UeElDraggable v-model:value="sortBgList" class="grid gap-1" ref="draggerListGroupRef">
                <DraggerItem v-for="item in sortBgList" :key="item.id" @remove="removeBackground(item.id)">
                    <BackgroundColor v-if="isColorItem(item)" v-model:value="item.value" />
                    <BackgroundImage v-else-if="isImageItem(item)" v-model:value="item.value" />
                    <BackgroundShape v-else-if="isShapeItem(item)" v-model:value="item.value" />
                    <BackgroundSpline v-else-if="isSplineItem(item)" v-model:value="item.value" />
                    <BackgroundVideo v-else-if="isVideoItem(item)" v-model:value="item.value" />
                    <BackgroundBlur v-else-if="isBlurItem(item)" v-model:value="item.value" />
                    <BackgroundSvg v-else-if="isSvgItem(item)" v-model:value="item.value" />
                </DraggerItem>
            </UeElDraggable>
        </template>
    </UeElSettingGroup>
</template>

<script lang="ts" setup>
import type {
    UeElBackgroundSettingGroupBaseProps,
    UeElBackgroundSettingGroupValue,
    BACKGROUND_VALUE,
    TYPE_BG_TYPE,
} from "./index";

import { guid } from "@stone/uemo-editor-utils/lib/guid";
import DraggerItem from "../draggable/sub-components/DraggerItem.vue";

import BackgroundColor from "./sub-components/BackgroundColor.vue";
import BackgroundImage from "./sub-components/BackgroundImage.vue";
import BackgroundShape from "./sub-components/BackgroundShape.vue";
import BackgroundSpline from "./sub-components/BackgroundSpline.vue";
import BackgroundVideo from "./sub-components/BackgroundVideo.vue";
import BackgroundBlur from "./sub-components/BackgroundBlur.vue";
import BackgroundSvg from "./sub-components/BackgroundSvg.vue";
import { useBackgroundData } from "./utils/helper";
import UeElSettingGroup from "../setting-group";

const instance = getCurrentInstance();

defineOptions({ name: "UeElBackgroundSettingGroup" });

const { t } = useI18n();

function isColorItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"color"> {
    return item.type === "color";
}

function isImageItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"image"> {
    return item.type === "image";
}

function isShapeItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"shape"> {
    return item.type === "shape";
}

function isSplineItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"spline"> {
    return item.type === "spline";
}

function isVideoItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"video"> {
    return item.type === "video";
}

function isBlurItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"blur"> {
    return item.type === "blur";
}

function isSvgItem(item: BACKGROUND_VALUE<TYPE_BG_TYPE>): item is BACKGROUND_VALUE<"svg"> {
    return item.type === "svg";
}

/**
 * @description 组件属性定义
 */
const props = withDefaults(defineProps<UeElBackgroundSettingGroupBaseProps>(), {
    enableType: () => ["color", "image", "shape", "video", "blur", "spline", "svg"],
});
const valueRef = defineModel<UeElBackgroundSettingGroupValue>("value", { required: false, default: () => [] });

/**
 * @description 排序后的背景列表
 */
const sortBgList = computed({
    get() {
        return [...valueRef.value].reverse();
    },
    set(value) {
        valueRef.value = [...value].reverse();
    },
});

/**
 * @description 背景数据
 */
const { backgroundTypeInfo, backgroundTypeParam } = useBackgroundData();

/**
 * @description 背景图层数量映射
 * @returns {Partial<Record<TYPE_BG_TYPE, number>>} 类型数量映射对象
 */
const bgLayerCountMap = computed(() => {
    return (valueRef.value || []).reduce(
        (acc, item) => {
            const type = item.type;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        },
        {} as Partial<Record<TYPE_BG_TYPE, number>>
    );
});

/**
 * @description 可用的背景类型选项
 * @returns {Array} 过滤后的背景类型选项
 */
const typeOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => {
    const bgTypeParam = backgroundTypeParam.value;
    const bgTypeInfo = backgroundTypeInfo.value;

    return props.enableType
        .filter((type) => {
            if (!bgTypeParam) return false;
            if (!bgTypeParam[type]) return false;

            const currentTypeCount = bgLayerCountMap.value[type] || 0;
            return bgTypeParam[type].limit > currentTypeCount;
        })
        .map((type) => ({
            value: type,
            text: bgTypeInfo[type].text,
            icon: bgTypeInfo[type].icon,
        }));
});

/**
 * @description 设置组参数
 */
const settingGroupParams = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => ({
    title: t("UNIT_BACKGROUND"),
    oper: [
        {
            id: "addBackground",
            type: "addSelect",
            param: { options: typeOptions.value, iconSize: 16 },
        },
    ],
}));

/**
 * @description 删除背景
 * @param {string} id 背景ID
 */
function removeBackground(id: string) {
    valueRef.value = valueRef.value?.filter((item) => item.id !== id);
}

function settingGroupTrigger(type: string, param: string) {
    switch (type) {
        case "addBackground":
            const addBgData = backgroundTypeParam.value?.[param as TYPE_BG_TYPE]?.data;

            if (!addBgData) {
                instance?.proxy?.$ueElToast.error(`【${param}】背景类型不存在默认数据`);
                return;
            }

            valueRef.value?.push({ id: guid(5), type: param as TYPE_BG_TYPE, value: addBgData });
            break;

        default:
            break;
    }
}
</script>

<style lang="scss" module>
.background-setting-group {
    // 样式定义
}
</style>
