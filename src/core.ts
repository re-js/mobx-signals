import { signalFactory, computedFactory, WritableSignal, Signal } from './signal';
import { signalDecorator, computedDecorator } from './decorator';
import { autorun, configure } from 'mobx';

configure({
    enforceActions: "never",
});

interface SignalFn {
    <T>(value: T, equals?: (a: T, b: T) => boolean): WritableSignal<T>;
    (target: object | void, key: PropertyKey | ClassFieldDecoratorContext): void;
}
export const signal = ((a: any, b: any, c) => {
    if (typeof b === "function" || b === void 0) {
        return signalFactory(a, b);
    } else {
        return signalDecorator(a, b, c);
    }
}) as SignalFn;

interface ComputedFn {
    <T>(fn: () => T, equals?: (a: T, b: T) => boolean): Signal<T>;
    (target: object | void, key: PropertyKey | ClassGetterDecoratorContext);
}
export const computed = ((a, b, c) => {
    return c
        ? computedDecorator(a, b, c)
        : computedFactory(a, b);
}) as ComputedFn;

export function effect(fn: () => void) {
    return autorun(fn);
}
