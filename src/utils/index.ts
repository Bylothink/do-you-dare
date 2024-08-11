import { onScopeDispose } from "vue";
import { JsonStorage } from "@byloth/core";

export const jsonStorage = new JsonStorage();

export function withFrame<T extends unknown[]>(callback: (...args: T) => void): (...args: T) => void
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
        if (!(_requestId))
        {
            _args = args;
            _requestId = requestAnimationFrame(_requestCallback);
        }
    };
}
