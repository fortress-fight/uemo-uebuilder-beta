interface LoopTextEvent {
    "ue.loop-text": any;
    "ue.loop-text.destroy": never;
    "ue.loop-text.resize": never;
    "ue.loop-text.window-resize": never;
    "ue.loop-text.update": never;
}

export const LoopTextEventEventBus = {
    bind<T extends keyof LoopTextEvent>(
        $button: JQuery<Element | Window>,
        event: T,
        callback: (ev: JQuery.Event, param: LoopTextEvent[T]) => void
    ) {
        $button.on<T>(event, callback);
    },
    emit<T extends keyof LoopTextEvent>(
        $button: JQuery<Element | Window>,
        event: T,
        ...args: LoopTextEvent[T] extends never ? [] : [LoopTextEvent[T]]
    ) {
        $button.trigger(event, args);
    },
    unbind($button: JQuery<Element | Window>, event: keyof LoopTextEvent, callback?: () => void) {
        $button.off(event, callback);
    },
    clear($button: JQuery<Element | Window>) {
        $button.off("ue.loop-text");
    },
};
