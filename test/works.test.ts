import { computed, reaction, signal, transaction } from "../src";

it('signal works', () => {
    const spy = jest.fn();
    const s = signal(0);
    reaction(s, (v) => spy(v), { fireImmediately: true });
    s.set(1);
    s.update(n => n + 1);

    expect(spy).nthCalledWith(1, 0);
    expect(spy).nthCalledWith(2, 1);
    expect(spy).nthCalledWith(3, 2);
    expect(spy).toBeCalledTimes(3);
});

it('computed works', () => {
    const spy = jest.fn();
    const a = signal(0);
    const b = signal(0);
    const c = computed(() => a() + b());
    reaction(c, (v) => spy(v), { fireImmediately: true });
    a.set(1);

    transaction(() => {
        a.update(n => n + 1);
        b.update(n => n + 2);
    });

    expect(spy).nthCalledWith(1, 0);
    expect(spy).nthCalledWith(2, 1);
    expect(spy).nthCalledWith(3, 4);
    expect(spy).toBeCalledTimes(3);
});

it('mutate works', () => {
    const spy = jest.fn();
    const a = signal({ a: 0 }); 
    reaction(a, (v) => spy(v));

    a.mutate(h => {
        h.a = 1;
        h.a = 2;
    });

    expect(a()).toStrictEqual({ a: 2 });
    expect(spy).toBeCalledWith({ a: 2 });
});