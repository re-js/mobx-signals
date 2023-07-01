export declare function signalDecorator(_target: object, key: PropertyKey, descriptor: any): {
    get(): any;
    set(value: any): void;
};
export declare function computedDecorator(_target: object, key: PropertyKey, descriptor: any): {
    get(): any;
};
