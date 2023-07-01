import { computedFactory, signalFactory } from './signal';
function defineSignalProperty(obj, key, initializer) {
    const box = initializer
        ? signalFactory(initializer())
        : signalFactory(undefined);
    Object.defineProperty(obj, key, {
        get: box,
        set: box.set
    });
}
export function signalDecorator(_target, key, descriptor) {
    const initializer = descriptor.initializer;
    return {
        get() {
            defineSignalProperty(this, key, initializer && initializer.bind(this));
            return this[key];
        },
        set(value) {
            defineSignalProperty(this, key, initializer && initializer.bind(this));
            this[key] = value;
        },
    };
}
export function computedDecorator(_target, key, descriptor) {
    return {
        get() {
            const box = computedFactory(descriptor.get);
            Object.defineProperty(this, key, { get: box });
            return this[key];
        }
    };
}
