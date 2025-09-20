<!--
 * @Description: 客户模版库操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-21 00:38:47
-->
<template>
    <div :class="$style['unit-user-template-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">{{ panelTitle }}</h2>
            <button class="flex items-center justify-center" :class="$style['btn--close']" @click="emit('close')">
                <UeElIcon name="icon-remove" :size="15" />
            </button>
        </div>
        <div class="relative" :class="$style['panel-body']">
            <UeElLoading v-if="loading" />

            <!-- JSMO 页面文件上传 -->
            <FormField v-if="!disableJSMO" :error-msg="formError.json" :class="$style['row']">
                <JsmoUploader v-model:value="formData.json" :theme="!!formError.json ? 'error' : 'default'" />
            </FormField>

            <!-- 页面封面上传 -->
            <FormField :error-msg="formError.thumb" :class="$style['row']">
                <ThumbUploader v-model:value="formData.thumb" :theme="!!formError.thumb ? 'error' : 'default'" />
            </FormField>

            <!-- 页面标题 -->
            <FormField :error-msg="formError.title" :class="$style['row']">
                <div :class="$style['input-wrapper']" :data-error="!!formError.title">
                    <input
                        required
                        type="text"
                        v-model="formData.title"
                        :placeholder="t('UEBUILDER_TEMPLATE_FORM_TITLE_PLACEHOLDER')"
                    />
                </div>
            </FormField>

            <div :class="[$style['row']]">
                <button :class="$style['btn--submit']" :data-active="canSubmit" @click="handleSubmit">
                    {{ t("UNIT_SAVE") }}
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UnitUserTemplatePanelBaseProps, UserTemplateValue } from "./index";

import { DEFAULT_THUMB } from "./index";
import FormField from "./components/FormField.vue";
import ThumbUploader from "./components/ThumbUploader.vue";
import JsmoUploader from "./components/JsmoUploader.vue";

const { t } = useI18n();

const instance = getCurrentInstance();
defineOptions({ name: "UnitUserTemplatePanel" });
const props = defineProps<UnitUserTemplatePanelBaseProps>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "submit", formData: UserTemplateValue): void;
}>();

const panelTitle = computed(() => {
    return props.type === "add" ? t("UEBUILDER_TEMPLATE_FORM_TITLE") : t("UEBUILDER_TEMPLATE_FORM_TITLE_EDIT");
});

// 表单数据
const formData = reactive({ json: "", thumb: "", title: "" });
const formError = reactive<Record<keyof UserTemplateValue, string>>({ json: "", thumb: "", title: "" });

/**
 * 校验表单数据
 * @returns {boolean} 校验结果
 */
function validateFormData(): boolean {
    // 重置错误信息
    Object.keys(formError).forEach((key) => {
        formError[key as keyof UserTemplateValue] = "";
    });

    // 校验必填项
    if (!formData.json && !props.disableJSMO) {
        formError.json = t("UEBUILDER_TEMPLATE_FORM_JSON_ERROR");
        return false;
    }
    if (!formData.thumb) {
        formError.thumb = t("UEBUILDER_TEMPLATE_FORM_THUMB_ERROR");
        return false;
    }
    if (!formData.title) {
        formError.title = t("UEBUILDER_TEMPLATE_FORM_TITLE_ERROR");
        return false;
    }

    return true;
}

/**
 * 计算表单是否可提交
 */
const canSubmit = computed(() => {
    return Object.values(formData).every(Boolean);
});

/**
 * 处理表单提交
 */
function handleSubmit() {
    if (validateFormData()) {
        emit("submit", toRaw(formData));
    } else {
        instance?.proxy?.$ueElToast.error(t("UEBUILDER_TEMPLATE_FORM_ERROR"));
    }
}

const loading = ref(false);
onBeforeMount(() => {
    if (props.type === "add") {
        const defaultThumb = props.defaultThumb || DEFAULT_THUMB;
        const randomThumbIndex = Math.floor(Math.random() * defaultThumb.length);
        formData.thumb = defaultThumb[randomThumbIndex];
    } else if (props.type === "edit") {
        if (props.getTemplateDetail) {
            loading.value = true;
            props
                .getTemplateDetail()
                .then((res) => {
                    formData.json = res.json;
                    formData.thumb = res.thumb;
                    formData.title = res.title;
                    loading.value = false;
                })
                .catch((error) => {
                    instance?.proxy?.$ueElError(error);
                });
        } else {
            instance?.proxy?.$ueElToast.error(t("UEBUILDER_TEMPLATE_FORM_DETAIL_ERROR"));
        }
    }
});
</script>
<style lang="scss" module>
.unit-user-template-panel {
    position: relative;

    width: 360px;
    padding: 22px 20px 31px;

    border-radius: 10px;
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv2);
    .icon-box {
        @include circle(28px);
    }
    .panel-head {
        font-size: 16px;
        line-height: 24px;

        position: relative;

        margin-bottom: 22px;

        color: var(--editor-color-text);
        .btn--close {
            position: absolute;
            top: -8px;
            right: -5px;

            width: 30px;
            height: 30px;

            color: var(--editor-c-gray);
            &:hover {
                color: var(--editor-color-text);
            }
        }
    }
    .panel-title {
        font-size: 16px;
        font-weight: 400;
        line-height: 100%;

        color: #000;
    }
    .panel-body {
        .row {
            margin-bottom: 26px;
            &:last-child {
                margin-bottom: 0;
            }
            &[data-error] {
                margin-bottom: 2px;
            }
            .error-tip {
                font-size: 12px;

                color: var(--c-red-40);
            }
        }
    }
    .input-wrapper {
        input {
            font-size: 12px;
            font-weight: 400;
            line-height: 100%;

            width: 100%;
            padding: 14px 17px;

            color: var(--editor-color-text);
            border-width: 0;
            border-radius: 5px;
            box-shadow: inset 0 0 0 1px color(var(--ue-border-color));
            &:focus {
                box-shadow: inset 0 0 0 1px color(var(--ue-border-color--deeper));
            }
        }
        &[data-error="true"] input {
            box-shadow: inset 0 0 0 1px var(--c-red-40);
        }
    }
    .btn--submit {
        font-size: 14px;
        font-weight: 400;
        line-height: 100%;

        width: 100%;
        padding: 13px;

        transition: 0.26s ease;
        text-align: center;

        color: var(--editor-c-gray);
        border-radius: 5px;
        background: color(var(--ue-background-color));
        &[data-active="true"] {
            color: #fff;
            background: #2c48ff;
        }
    }
}
</style>
