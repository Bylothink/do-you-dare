import { Store } from "pinia";
import { onScopeDispose } from "vue";

// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
type ActionsTree<T> = T extends Store<infer Id, infer S, infer G, infer A> ? A : never;
type Payload<T> = T extends (...args: infer P) => unknown ? P : never;

// eslint-disable-next-line max-len
export function onAction<T extends Store, A extends ActionsTree<T>, K extends keyof A, P extends Payload<A[K]>>(store: T, action: K, callback: (...payload: P) => unknown): void
{
    const unsubscribe = store.$onAction(({ name, store, args, after, onError }) =>
    {
        if (name === action)
        {
            const payload = args as P;

            callback(...payload);
        }
    });

    onScopeDispose(unsubscribe);
}
