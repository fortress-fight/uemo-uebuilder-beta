interface ScrollEffectEvent {
    "ue.scroll-effect": any;
    "ue.scroll-effect.destroy": never;
    "ue.scroll-effect.resize": never;
    "ue.scroll-effect.window-resize": never;
    "ue.scroll-effect.visible": never;
    "ue.scroll-effect.update": never;
}

export const ScrollEffectEventEventBus = {
    bind<T extends keyof ScrollEffectEvent>(
        $button: JQuery<Element | Window>,
        event: T,
        callback: (ev: JQuery.Event, param: ScrollEffectEvent[T]) => void
    ) {
        $button.on<T>(event, callback);
    },
    emit<T extends keyof ScrollEffectEvent>(
        $button: JQuery<Element | Window>,
        event: T,
        ...args: ScrollEffectEvent[T] extends never ? [] : [ScrollEffectEvent[T]]
    ) {
        $button.trigger(event, args);
    },
    unbind($button: JQuery<Element | Window>, event: keyof ScrollEffectEvent, callback?: () => void) {
        $button.off(event, callback);
    },
    clear($button: JQuery<Element | Window>) {
        $button.off("ue.scroll-effect");
    },
};
