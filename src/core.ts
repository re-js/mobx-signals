import { signalFactory, computedFactory } from './signal';
import { signalDecorator, computedDecorator } from './decorator';
import { reaction, when as mobxWhen } from 'mobx';

export const signal = ((a: any, b: any, c: any) => {
    return c
        ? signalDecorator(a, b, c)
        : signalFactory(a, b);
}) as typeof signalFactory & typeof signalDecorator;

export const computed = ((a: any, b: any, c: any) => {
    return c
        ? computedDecorator(a, b, c)
        : computedFactory(a, b);
}) as typeof computedFactory & typeof computedDecorator;

export function on<T>(sender: () => T, subscriber: (value: T) => void, equals?: (a: T, b: T) => boolean) {
    return reaction(sender, subscriber, { equals });
}

export function sync<T>(sender: () => T, subscriber: (value: T) => void, equals?: (a: T, b: T) => boolean) {
    return reaction(sender, subscriber, { fireImmediately: true, equals });
}

export function when(predicate: () => boolean) {
    return mobxWhen(predicate);
}

