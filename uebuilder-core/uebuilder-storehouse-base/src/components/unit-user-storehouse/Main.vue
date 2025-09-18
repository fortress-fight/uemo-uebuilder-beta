<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-09-18 13:40:15
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
    <UeElPopPanel v-model:open="showConfirmPanel" v-bind="popPanelParams">
        <UeElConfirmPanel
            v-bind="confirmPanelProps"
            @close="showConfirmPanel = false"
            @cancel="showConfirmPanel = false"
            @confirm="deleteTemplate"
        />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElPopPanelBaseProps } from "@stone/uemo-editor-element/packages/pop-panel";
import type { UeElConfirmPanelBaseProps } from "@stone/uemo-editor-element/packages/confirm-panel";
import type { UnitUserTemplatePanelBaseProps, UserTemplateValue } from "../unit-user-template-panel";
import type { UnitListModuleBaseProps } from "../unit-list-module";

import type { UnitUserStorehouseBaseProps } from "./index";

import { UeBuilderStorehouseBaseKey } from "../../plugin/injection-key";
import UnitUserTemplatePanel from "../unit-user-template-panel";
import UnitListModule from "../unit-list-module";

defineOptions({ name: "UnitUserStorehouse", inheritAttrs: false });

const props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {
    sortType: "newest",
    type: "user-default",
});
const emit = defineEmits<{
    (e: "loadMore" | "refresh"): void;
    (e: "updateTemplate", param: { type: "add" | "edit"; data: UserTemplateValue & { id?: string } }): void;
    (e: "sortTrigger", type: string): void;
    (e: "deleteTemplate" | "toggleCollect" | "useTemplate", id: string): void;
}>();
const { t } = useI18n();

const UeBuilderStorehouse = inject(UeBuilderStorehouseBaseKey);

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

const showConfirmPanel = ref(false);
const confirmPanelProps = ref<UeElConfirmPanelBaseProps>({
    title: t("DELETE_PANEL_TITLE"),
    desc: t("DELETE_PANEL_DESC"),
    confirmBtn: { text: t("CONFIRM"), theme: "red" },
    cancelBtn: { text: t("CANCEL"), theme: "white" },
});

const popPanelOpen = ref(false);
const popPanelParams = ref<UeElPopPanelBaseProps>({
    autoClose: true,
    mask: { color: "rgba(0, 0, 0, 0.5)" },
});

const UnitUserTemplatePanelProps = ref<UnitUserTemplatePanelBaseProps & { id?: string }>({ type: "add" });
const handleOperTrigger = (type: string) => {
    switch (type) {
        case "add-page":
            UeBuilderStorehouse?.storehouseWorkbenchChannel?.remote
                .then((remote) => {
                    return remote.getLoginStatus().then((isLogin) => {
                        if (!isLogin) {
                            return remote.openLoginPanel();
                        }
                        UnitUserTemplatePanelProps.value = {
                            type: "add",
                        };
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

function handleItemOperTrigger(param: { type: "editor" | "delete" | "toggleCollect" | "use"; data: { id: string } }) {
    switch (param.type) {
        case "use":
            emit("useTemplate", param.data.id);
            break;

        case "editor":
            {
                UnitUserTemplatePanelProps.value = {
                    id: param.data.id.toString(),
                    type: "edit",
                    getTemplateDetail: () => {
                        return props.getUserTemplate!(param.data.id).catch(() => {
                            popPanelOpen.value = false;
                        });
                    },
                };
                popPanelOpen.value = true;
            }
            break;
        case "delete":
            UnitUserTemplatePanelProps.value = {
                id: param.data.id.toString(),
                type: "edit",
            };
            showConfirmPanel.value = true;
            break;
        case "toggleCollect":
            emit("toggleCollect", param.data.id);
            break;
    }
}

function deleteTemplate() {
    if (UnitUserTemplatePanelProps.value.id) {
        emit("deleteTemplate", UnitUserTemplatePanelProps.value.id);
    }
    showConfirmPanel.value = false;
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
    if (!UnitUserTemplatePanelProps.value.type) return;

    emit("updateTemplate", {
        type: UnitUserTemplatePanelProps.value.type,
        data: { id: UnitUserTemplatePanelProps.value.id, ...tplData },
    });

    popPanelOpen.value = false;
}
</script>
<style lang="scss" module>
.user-storehouse {
    padding: 20px 50px;
}
</style>
