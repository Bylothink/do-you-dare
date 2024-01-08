import { onScopeDispose } from "vue";
import type { Store } from "pinia";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ActionsTree<T> = T extends Store<infer Id, infer S, infer G, infer A> ? A : never;
type Payload<T> = T extends (...args: infer P) => unknown ? P : never;

// eslint-disable-next-line max-len
export function onAction<S extends Store, A extends ActionsTree<S>, K extends keyof A, P extends Payload<A[K]>>(store: S, action: K, callback: (...payload: P) => unknown): void
{
    const unsubscribe = store.$onAction(({ name, store: _store, args, after, onError }) =>
    {
        if (name === action)
        {
            const payload = args as P;

            callback(...payload);
        }
    });

    onScopeDispose(unsubscribe);
}
