import { createI18n, useI18n } from "vue-i18n";
import i18nZhCn from "../i18n/zh-cn.json";
import i18nEn from "../i18n/en.json";

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("lang") || "zh-cn",
    globalInstall: true,
    fallbackLocale: "zh-cn",
    messages: { en: i18nEn, "zh-cn": i18nZhCn },
});

export { i18n, useI18n };
