import { getPopPanelParams } from "../packages/pop-panel/utils/helper";
import { settingGroupPopPanelPropsKey } from "../packages/setting-group";

export function usePopPanelParam(
    domRef: Ref<HTMLElement | undefined>,
    param?: { process?: (result: UE_EL_COMPONENT.UeElPopPanelProps) => UE_EL_COMPONENT.UeElPopPanelProps }
) {
    const injectSettingGroupPopPanelProps = inject(settingGroupPopPanelPropsKey, undefined);

    /**
     * 弹窗位置配置
     */
    return computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
        if (injectSettingGroupPopPanelProps?.value) return injectSettingGroupPopPanelProps.value;

        if (!domRef.value) return undefined;
        const result = getPopPanelParams("editorPanel", domRef.value);

        if (param?.process) {
            return param.process(result);
        }

        return result;
    });
}
