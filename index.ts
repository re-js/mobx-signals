export {
    untracked,
    batch,
    on,
    sync,
    when
} from './signal';

import { signal as signalFactory, computed as computedFactory } from './signal';
import { signalDecorator, computedDecorator } from './decorator';

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