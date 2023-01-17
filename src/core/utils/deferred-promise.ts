import type { PromiseExecutor, PromiseResolver, PromiseRejecter } from "../types.js";

export default class DeferredPromise<T, E = unknown>
{
    protected _promise: Promise<T>;

    protected _executor: PromiseExecutor<T>;

    protected _resolve!: PromiseResolver<T>;
    protected _reject!: PromiseRejecter<E>;

    public get promise(): Promise<T>
    {
        return this._promise;
    }

    public get resolve(): PromiseResolver<T>
    {
        return this._resolve;
    }
    public get reject(): PromiseRejecter<E>
    {
        return this._reject;
    }

    public constructor(executor: PromiseExecutor<T>)
    {
        this._executor = executor;

        this._promise = new Promise<T>((resolve, reject) =>
        {
            this._resolve = resolve;
            this._reject = reject;

            executor(resolve, reject);
        });
    }
}
