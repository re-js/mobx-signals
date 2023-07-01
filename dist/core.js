import { signalFactory, computedFactory } from './signal';
import { signalDecorator, computedDecorator } from './decorator';
import { reaction, when as mobxWhen } from 'mobx';
export function signal(a, b, c) {
    return c
        ? signalDecorator(a, b, c)
        : signalFactory(a, b);
}
export function computed(a, b, c) {
    return c
        ? computedDecorator(a, b, c)
        : computedFactory(a, b);
}
export function on(sender, subscriber, equals) {
    return reaction(sender, subscriber, { equals });
}
export function sync(sender, subscriber, equals) {
    return reaction(sender, subscriber, { fireImmediately: true, equals });
}
export function when(predicate) {
    return mobxWhen(predicate);
}
