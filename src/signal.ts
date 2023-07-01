import { observable, untracked, computed as mobxComputed } from 'mobx';
import { mutate } from './mutate';

export interface Signal<T> {
    (): T;
}

export interface WritableSignal<T> extends Signal<T> {
    (): T,
    set(value: T);
    update(fn: (value: T) => T);
    mutate(fn: (value: T) => void);
}

export function signalFactory<T>(value: T, equals?: (a: T, b: T) => boolean): WritableSignal<T> {
    const box = observable.box(value, { equals });

    const h = box.get.bind(box);
    h.set = box.set.bind(box);
    h.update = (fn: (value: T) => T) => h.set(fn(untracked(h)));
    h.mutate = mutate.bind(h);

    return h;
}

export function computedFactory<T>(fn: () => T, equals?: (a: T, b: T) => boolean): Signal<T> {
    const box = mobxComputed(fn, { equals });

    return box.get.bind(box);
}
