export interface Signal<T> {
    (): T;
}
export interface WritableSignal<T> extends Signal<T> {
    (): T;
    set(value: T): any;
    update(fn: (value: T) => T): any;
}
export declare function signalFactory<T>(value: T, equals?: (a: T, b: T) => boolean): WritableSignal<T>;
export declare function computedFactory<T>(fn: () => T, equals?: (a: T, b: T) => boolean): Signal<T>;
export declare function effect(fn: () => void): import("mobx").IReactionDisposer;
