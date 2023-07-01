import { observable, untracked, computed as mobxComputed, autorun } from 'mobx';
import { mutate } from './mutate';
export function signalFactory(value, equals) {
    const box = observable.box(value, { equals });
    const h = box.get.bind(box);
    h.set = box.set.bind(box);
    h.update = (fn) => h.set(fn(untracked(h)));
    h.mutate = mutate.bind(this);
    return h;
}
export function computedFactory(fn, equals) {
    const box = mobxComputed(fn, { equals });
    return box.get.bind(box);
}
export function effect(fn) {
    return autorun(fn);
}
