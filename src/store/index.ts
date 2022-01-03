// import { onScopeDispose } from "vue";
import { createStore, useStore as useVuexStore, Store as VuexStore, StoreOptions } from "vuex";

import store from "./defs";

type IndexState = ReturnType<typeof store.state>;
type GameState = ReturnType<typeof store.modules.game.state>;
type UserState = ReturnType<typeof store.modules.user.state>;
type State =
    { readonly [S in keyof IndexState]: IndexState[S]; } &
    { readonly game: { readonly [S in keyof GameState]: GameState[S]; }; } &
    { readonly user: { readonly [S in keyof UserState]: UserState[S]; }; };

type IndexGetters = typeof store.getters;
type GameGetters = typeof store.modules.game.getters;
type UserGetters = typeof store.modules.user.getters;
type Getters =
    { readonly [G in keyof IndexGetters]: ReturnType<IndexGetters[G]>; } &
    { readonly [G in keyof GameGetters as `game/${G}`]: ReturnType<GameGetters[G]>; } &
    { readonly [G in keyof UserGetters as `user/${G}`]: ReturnType<UserGetters[G]>; };

type IndexMutations = typeof store.mutations;
type GameMutations = typeof store.modules.game.mutations;
type UserMutations = typeof store.modules.user.mutations;
type Mutations =
    { [M in keyof IndexMutations]: IndexMutations[M]; } &
    { [M in keyof GameMutations as `game/${M}`]: GameMutations[M]; } &
    { [M in keyof UserMutations as `user/${M}`]: UserMutations[M]; };

type IndexActions = typeof store.actions;
type GameActions = typeof store.modules.game.actions;
type UserActions = typeof store.modules.user.actions;
type Actions =
    { [A in keyof IndexActions]: IndexActions[A]; } &
    { [A in keyof GameActions as `game/${A}`]: GameActions[A]; } &
    { [A in keyof UserActions as `user/${A}`]: UserActions[A]; };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Payload<T> = T extends (_: any, ...payload: infer P) => void ? P : never;

export interface Store extends VuexStore<State>
{
    readonly state: { [S in keyof State]: State[S] };
    readonly getters: { [G in keyof Getters]: Getters[G] };
    commit<M extends keyof Mutations>(type: M, ...payload: Payload<Mutations[M]>): ReturnType<Mutations[M]>;
    dispatch<A extends keyof Actions>(type: A, ...payload: Payload<Actions[A]>): ReturnType<Actions[A]>;

    // onMutation<M extends keyof Mutations>(type: M, callback: (...payload: Payload<Mutations[M]>) => void): void;
    // onAction<A extends keyof Actions>(type: A, callback: (...payload: Payload<Actions[A]>) => void): void;
}

export default createStore((store as unknown) as StoreOptions<State>);
export const useStore = (): Store => useVuexStore();

// {
//     const store = useVuexStore() as Store;

//     store.onMutation = function<M extends keyof Mutations>(
//         type: M,
//         callback: (...payload: Payload<Mutations[M]>) => void
//     ): void
//     {
//         const unsubscribe = store.subscribe((mutation, state) =>
//         {
//             if (mutation.type === type)
//             {
//                 const payload = mutation.payload as Payload<Mutations[M]>;

//                 callback(...payload);
//             }
//         });

//         onScopeDispose(unsubscribe);
//     };

//     store.onAction = function<A extends keyof Actions>(
//         type: A,
//         callback: (...payload: Payload<Actions[A]>) => void
//     ): void
//     {
//         const unsubscribe = store.subscribeAction((mutation, state) =>
//         {
//             if (mutation.type === type)
//             {
//                 const payload = mutation.payload as Payload<Actions[A]>;

//                 callback(...payload);
//             }
//         });

//         onScopeDispose(unsubscribe);
//     };

//     return store;
// };
