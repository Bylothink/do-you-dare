import { onScopeDispose } from "vue";

import JsonStorage from "./json-storage";

export const jsonStorage = new JsonStorage();

export function nextFrame(): Promise<void>
{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Promise<void>((resolve, reject) => requestAnimationFrame(resolve));
}
export function withFrame<T extends Array<unknown>>(callback: (...args: T) => void): (...args: T) => void
{
    let _args: T;
    let _requestId: number | null = null;

    const _requestCallback = () =>
    {
        if (_requestId)
        {
            callback(... _args);
            _requestId = null;
        }
    };

    onScopeDispose(() =>
    {
        if (_requestId)
        {
            cancelAnimationFrame(_requestId);
            _requestId = null;
        }
    });

    return (...args: T) =>
    {
        if (!_requestId)
        {
            _args = args;
            _requestId = requestAnimationFrame(_requestCallback);
        }
    };
}

export function sleep(timeout: number): Promise<void>
{
    return new Promise<void>((resolve, reject) => setTimeout(resolve, timeout));
}
