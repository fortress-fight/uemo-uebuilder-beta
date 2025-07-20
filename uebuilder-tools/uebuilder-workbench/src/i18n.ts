import { i18n as i18nGlobal } from "@stone/uemo-editor-i18n";
import { i18n as i18nEditorPanel } from "@stone/uemo-editor-panel/src/i18n";

import zhCn from "@stone/uebuilder-workbench-base/i18n/zh-cn.json";
import en from "@stone/uebuilder-workbench-base/i18n/en.json";

i18nGlobal.global.mergeLocaleMessage("zh-cn", zhCn);
i18nGlobal.global.mergeLocaleMessage("en", en);

i18nEditorPanel.global.mergeLocaleMessage("zh-cn", zhCn);
i18nEditorPanel.global.mergeLocaleMessage("en", en);

export const i18n = i18nGlobal;
