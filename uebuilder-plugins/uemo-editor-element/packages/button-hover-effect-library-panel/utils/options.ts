type ResourceButtonHoverEffectItem = {
    value: string;
    name: string;
    beforeIcon?: string;
    afterIcon?: string;
};

export function mixOptions() {
    const { t } = useI18n();
    const buttonHoverEffectOptions = computed<ResourceButtonHoverEffectItem[]>(() => {
        return [
            { value: "moveUp", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_MOVE_UP") },
            { value: "shakeX", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_SHAKE_X") },
            { value: "rubberBand", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_RUBBER_BAND") },
            { value: "scale", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_SCALE") },
            { value: "moveLeft", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_MOVE_LEFT"), beforeIcon: "icon-app-play" },
            { value: "moveRight", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_MOVE_RIGHT"), afterIcon: "icon-app-play" },
        ];
    });

    return buttonHoverEffectOptions;
}
