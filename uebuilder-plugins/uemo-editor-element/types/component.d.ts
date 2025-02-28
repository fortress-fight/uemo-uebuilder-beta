/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElCheckBox: typeof UeElCheckBox;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElButton: typeof UeElButton;
        UeElContextmenu: typeof UeElContextmenu;
        UeElControlGroup: typeof UeElControlGroup;
        UeElGapSetting: typeof UeElGapSetting;
        UeElIcon: typeof UeElIcon;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElOnOff: typeof UeElOnOff;
        UeElLoading: typeof UeElLoading;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElNumberInput: typeof UeElNumberInput;
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelectOption: typeof UeElSelectOption;
        UeElSelect: typeof UeElSelect;
        UeElTabCard: typeof UeElTabCard;
        UeElTextInput: typeof UeElTextInput;
        UeElTagInput: typeof UeElTagInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
