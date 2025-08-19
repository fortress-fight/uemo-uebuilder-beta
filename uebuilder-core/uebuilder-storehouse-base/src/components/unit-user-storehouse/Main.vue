<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-08-18 17:18:08
-->
<template>
    <UnitListModule
        :class="$style['user-storehouse']"
        v-bind="listModuleProps"
        :list="list"
        :type="type"
        :loading="loading"
        :sortType="sortType"
        @refresh="handleRefresh"
        @loadMore="handleLoadMore"
        @sortTrigger="handleSortTrigger"
        @operTrigger="handleOperTrigger"
        @itemOperTrigger="handleItemOperTrigger"
    />
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <UnitUserTemplatePanel
            v-bind="UnitUserTemplatePanelProps"
            @close="popPanelOpen = false"
            @submit="saveTemplate"
        />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElPopPanelBaseProps } from "@stone/uemo-editor-element/packages/pop-panel";
import type { UnitUserTemplatePanelBaseProps, UserTemplateValue } from "../unit-user-template-panel";
import type { UnitListModuleBaseProps } from "../unit-list-module";

import type { UnitUserStorehouseBaseProps } from "./index";

import { UeBuilderStorehouseKey } from "../../plugin/injection-key";
import UnitUserTemplatePanel from "../unit-user-template-panel";
import UnitListModule from "../unit-list-module";

defineOptions({ name: "UnitUserStorehouse", inheritAttrs: false });

const props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {
    sortType: "newest",
    type: "user-default",
});
const emit = defineEmits<{
    (e: "sortTrigger", type: string): void;
    (e: "loadMore" | "refresh"): void;
    (e: "saveTemplate", param: { type: "add" | "edit"; data: UserTemplateValue }): void;
}>();
const { t } = useI18n();

const UeBuilderStorehouse = inject(UeBuilderStorehouseKey);

const router = useRouter();

const listModuleProps = computed<UnitListModuleBaseProps>(() => {
    if (props.type === "user-recent") {
        return {
            title: t("UEBUILDER_USER_STOREHOUSE_RECENT"),
            placeholder: {
                title: t("UEBUILDER_USER_STOREHOUSE_RECENT_PLACEHOLDER"),
                desc: t("UEBUILDER_USER_STOREHOUSE_RECENT_DESC"),
            },
            operList: [
                { type: "add-page", label: t("UEBUILDER_USER_STOREHOUSE_OPER_ADD_PAGE") },
                { type: "more", label: t("UEBUILDER_USER_STOREHOUSE_OPER_MORE"), arrow: true },
            ],
        };
    }
    if (props.type === "user-collect") {
        return {
            title: t("UEBUILDER_USER_STOREHOUSE_TITLE_COLLECT"),
            pages: props.pages,
            allowRefresh: true,
            placeholder: {
                title: t("UEBUILDER_USER_STOREHOUSE_PLACEHOLDER"),
                desc: t("UEBUILDER_USER_STOREHOUSE_DESC"),
            },
        };
    }
    return {
        title: t("UEBUILDER_USER_STOREHOUSE_TITLE"),
        placeholder: { title: t("UEBUILDER_USER_STOREHOUSE_PLACEHOLDER"), desc: t("UEBUILDER_USER_STOREHOUSE_DESC") },
        operList: [{ type: "add-page", label: t("UEBUILDER_USER_STOREHOUSE_OPER_ADD_PAGE") }],
        sortCondition: {
            value: "newest",
            list: [
                { type: "newest", label: t("UEBUILDER_USER_STOREHOUSE_RECENT") },
                { type: "created", label: t("UEBUILDER_USER_STOREHOUSE_SORT_CREATED") },
            ],
        },
        pages: props.pages,
    };
});

const popPanelOpen = ref(false);
const popPanelParams = ref<UeElPopPanelBaseProps>({
    autoClose: true,
    mask: { color: "rgba(0, 0, 0, 0.5)" },
});

const UnitUserTemplatePanelProps = ref<UnitUserTemplatePanelBaseProps>({});
const handleOperTrigger = (type: string) => {
    switch (type) {
        case "add-page":
            UeBuilderStorehouse?.storehouseWorkbenchChannel?.remote
                .then((remote) => {
                    return remote.getLoginStatus().then((isLogin) => {
                        if (!isLogin) {
                            return remote.openLoginPanel();
                        }
                        popPanelOpen.value = true;
                    });
                })
                .catch(() => {
                    console.error("getLoginStatus error");
                });
            break;
        case "more":
            router.push("/my-pages").catch((err) => {
                console.error(err);
            });
            break;

        default:
            break;
    }
};

function handleItemOperTrigger(param: { type: "editor" | "delete" | "toggleCollect"; data: { id: string } }) {
    switch (param.type) {
        case "editor":
            {
                UnitUserTemplatePanelProps.value = {
                    type: "edit",
                    getTemplateDetail: () => props.getUserTemplate!(param.data.id),
                };
                popPanelOpen.value = true;
            }
            break;
        case "delete":
            break;
        case "toggleCollect":
            break;
    }
}

const handleSortTrigger = (type: string) => {
    emit("sortTrigger", type);
};

const handleLoadMore = () => {
    emit("loadMore");
};

const handleRefresh = () => {
    emit("refresh");
};

function saveTemplate(tplData: UserTemplateValue) {
    emit("saveTemplate", { type: "add", data: tplData });
}
</script>
<style lang="scss" module>
.user-storehouse {
    padding: 20px 50px;
}
</style>
