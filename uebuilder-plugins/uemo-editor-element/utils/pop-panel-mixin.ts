import type { EnhancedComputePositionConfig } from "@stone/uemo-editor-utils/lib/floating-ui";

import { getPopPanelParams } from "../packages/pop-panel/utils/helper";
import { settingGroupPopPanelPropsKey } from "../packages/setting-group";

export function usePopPanelParam(domRef: Ref<HTMLElement | undefined>, options: EnhancedComputePositionConfig = {}) {
    const injectSettingGroupPopPanelProps = inject(settingGroupPopPanelPropsKey, undefined);

    /**
     * 弹窗位置配置
     */
    return computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
        if (injectSettingGroupPopPanelProps?.value) return injectSettingGroupPopPanelProps.value;

        if (!domRef.value) return undefined;
        return getPopPanelParams("editorPanel", domRef.value, options);
    });
}
