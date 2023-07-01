import { observable, untracked, transaction, computed as mobxComputed, autorun, reaction, when as mobxWhen } from 'mobx';

export {
    untracked,
    transaction as batch
}

export interface Signal<T> {
    (): T;
}

export interface WritableSignal<T> extends Signal<T> {
    (): T,
    set(value: T);
    update(fn: (value: T) => T);
}

export function signal<T>(value: T, equals?: (a: T, b: T) => boolean): WritableSignal<T> {
    const box = observable.box(value, { equals });

    const h = box.get.bind(box);
    h.set = box.set.bind(box);
    h.update = (fn: (value: T) => T) => h.set(fn(untracked(h)));

    return h;
}

export function computed<T>(fn: () => T, equals?: (a: T, b: T) => boolean): Signal<T> {
    const box = mobxComputed(fn, { equals });

    return box.get.bind(box);
}

export function effect(fn: () => void) {
    return autorun(fn);
}

export function on<T>(sender: () => T, subscriber: (value: T) => void, equals?: (a: T, b: T) => boolean) {
    return reaction(sender, subscriber, { equals });
}

export function sync<T>(sender: () => T, subscriber: (value: T) => void, equals?: (a: T, b: T) => boolean) {
    return reaction(sender, subscriber, { fireImmediately: true, equals });
}

export function when(predicate: () => boolean) {
    return mobxWhen(predicate);
}