import { observable, untracked, computed as mobxComputed, autorun } from 'mobx';
import { mutate } from './mutate';

export interface Signal<T> {
    (): T;
}

export interface WritableSignal<T> extends Signal<T> {
    (): T,
    set(value: T);
    update(fn: (value: T) => T);
}

export function signalFactory<T>(value: T, equals?: (a: T, b: T) => boolean): WritableSignal<T> {
    const box = observable.box(value, { equals });

    const h = box.get.bind(box);
    h.set = box.set.bind(box);
    h.update = (fn: (value: T) => T) => h.set(fn(untracked(h)));
    h.mutate = mutate.bind(this);

    return h;
}

export function computedFactory<T>(fn: () => T, equals?: (a: T, b: T) => boolean): Signal<T> {
    const box = mobxComputed(fn, { equals });

    return box.get.bind(box);
}

export function effect(fn: () => void) {
    return autorun(fn);
}
