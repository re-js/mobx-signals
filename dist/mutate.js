import { autorun, observable, toJS, transaction } from "mobx";
export function mutate(fn) {
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
}
;
