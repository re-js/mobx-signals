import { autorun, observable, toJS, transaction } from "mobx";

export function mutate<T>(fn: (value: T) => void) {
    this.update(value => {
        const proxy = observable(value);
        const stop = autorun(() => {
            value = toJS(proxy);
        });
        transaction(() => {
            fn(proxy);
        });
        stop();
        return value;
    });
};