interface ButtonEvent {
    "ue.button": any;
    "ue.button.resize": never;
    "ue.button.hover": never;
    "ue.button.leave": never;
    "ue.button.play": never;
    "ue.button.destroy": never;
}

export const ButtonEventEventBus = {
    bind<T extends keyof ButtonEvent>(
        $button: JQuery<Element>,
        event: T,
        callback: (ev: JQuery.Event, param: ButtonEvent[T]) => void
    ) {
        $button.on<T>(event, callback);
    },
    emit<T extends keyof ButtonEvent>(
        $button: JQuery<Element>,
        event: T,
        ...args: ButtonEvent[T] extends never ? [] : [ButtonEvent[T]]
    ) {
        $button.trigger(event, args);
    },
    unbind<T extends keyof ButtonEvent>(
        $button: JQuery<Element>,
        event: T,
        callback?: (ev: JQuery.Event, param: ButtonEvent[T]) => void
    ) {
        $button.off(event, callback);
    },
    clear($button: JQuery<Element>) {
        $button.off("ue.button");
    },
};
