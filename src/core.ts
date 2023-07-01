import { signalFactory, computedFactory } from './signal';
import { signalDecorator, computedDecorator } from './decorator';
import { autorun, configure, when as mobxWhen } from 'mobx';

configure({
    enforceActions: "never",
});

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

export function effect(fn: () => void) {
    return autorun(fn);
}

export function when(predicate: () => boolean) {
    return mobxWhen(predicate);
}

