import { onScopeDispose } from "vue";

import JsonStorage from "./json-storage";

export const jsonLocalStorage = new JsonStorage(window.localStorage);
export const jsonSessionStorage = new JsonStorage(window.sessionStorage);

export function nextFrame(): Promise<void>
{
    return new Promise<void>((resolve, reject) =>
    {
        requestAnimationFrame(() => resolve());
    });
}

export function syncWithFrame<T extends Array<unknown>>(callback: (...args: T) => void): (...args: T) => void
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
        }

        _requestId = null;
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
