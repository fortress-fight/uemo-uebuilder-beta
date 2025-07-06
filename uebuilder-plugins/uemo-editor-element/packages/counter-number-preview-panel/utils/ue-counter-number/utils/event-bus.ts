interface CounterNumberEvent {
    "ue.counter-number": any;
    "ue.counter-number.destroy": never;
    "ue.counter-number.resize": never;
    "ue.counter-number.window-resize": never;
    "ue.counter-number.update": never;
}

export const CounterNumberEventEventBus = {
    bind<T extends keyof CounterNumberEvent>(
        $button: JQuery<Element | Window>,
        event: T,
        callback: (ev: JQuery.Event, param: CounterNumberEvent[T]) => void
    ) {
        $button.on<T>(event, callback);
    },
    emit<T extends keyof CounterNumberEvent>(
        $button: JQuery<Element | Window>,
        event: T,
        ...args: CounterNumberEvent[T] extends never ? [] : [CounterNumberEvent[T]]
    ) {
        $button.trigger(event, args);
    },
    unbind($button: JQuery<Element | Window>, event: keyof CounterNumberEvent, callback?: () => void) {
        $button.off(event, callback);
    },
    clear($button: JQuery<Element | Window>) {
        $button.off("ue.counter-number");
    },
};
