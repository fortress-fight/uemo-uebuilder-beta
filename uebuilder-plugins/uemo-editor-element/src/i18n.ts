import { createI18n } from "vue-i18n";
import i18nZhCn from "~/i18n/zh-cn.json";
import i18nEn from "~/i18n/en.json";

export const i18n = createI18n({
    locale: "zh-cn",
    fallbackLocale: "zh-cn",
    messages: { en: i18nEn, "zh-cn": i18nZhCn },
});
