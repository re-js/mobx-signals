export declare function signal(a: any, b: any, c: any): import("./signal").WritableSignal<any> | {
    get(): any;
    set(value: any): void;
};
export declare function computed(a: any, b: any, c: any): import("./signal").Signal<unknown> | {
    get(): any;
};
export declare function on<T>(sender: () => T, subscriber: (value: T) => void, equals?: (a: T, b: T) => boolean): import("mobx").IReactionDisposer;
export declare function sync<T>(sender: () => T, subscriber: (value: T) => void, equals?: (a: T, b: T) => boolean): import("mobx").IReactionDisposer;
export declare function when(predicate: () => boolean): Promise<void> & {
    cancel(): void;
};
