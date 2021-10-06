import { createStore, useStore as useVuexStore, Store as VuexStore, StoreOptions } from "vuex";

import store from "./defs";

type IndexState = ReturnType<typeof store.state>;
type CardsState = ReturnType<typeof store.modules.cards.state>;
type UserState = ReturnType<typeof store.modules.user.state>;
type State =
    { readonly [S in keyof IndexState]: IndexState[S]; } &
    { readonly cards: { readonly [S in keyof CardsState]: CardsState[S]; }; } &
    { readonly user: { readonly [S in keyof UserState]: UserState[S]; }; };

type IndexGetters = typeof store.getters;
type CardsGetters = typeof store.modules.cards.getters;
type UserGetters = typeof store.modules.user.getters;
type Getters =
    { readonly [G in keyof IndexGetters]: ReturnType<IndexGetters[G]>; } &
    { readonly [G in keyof CardsGetters as `cards/${G}`]: ReturnType<CardsGetters[G]>; } &
    { readonly [G in keyof UserGetters as `user/${G}`]: ReturnType<UserGetters[G]>; };

type IndexMutations = typeof store.mutations;
type CardsMutations = typeof store.modules.cards.mutations;
type UserMutations = typeof store.modules.user.mutations;
type Mutations =
    { [M in keyof IndexMutations]: IndexMutations[M]; } &
    { [M in keyof CardsMutations as `cards/${M}`]: CardsMutations[M]; } &
    { [M in keyof UserMutations as `user/${M}`]: UserMutations[M]; };

type IndexActions = typeof store.actions;
type CardsActions = typeof store.modules.cards.actions;
type UserActions = typeof store.modules.user.actions;
type Actions =
    { [A in keyof IndexActions]: IndexActions[A]; } &
    { [A in keyof CardsActions as `cards/${A}`]: CardsActions[A]; } &
    { [A in keyof UserActions as `user/${A}`]: UserActions[A]; };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Payload<T> = T extends (_: any, ...payload: infer P) => void ? P : never;

export interface Store extends VuexStore<State>
{
    readonly state: { [S in keyof State]: State[S] };
    readonly getters: { [G in keyof Getters]: Getters[G] };
    commit<M extends keyof Mutations>(type: M, ...payload: Payload<Mutations[M]>): ReturnType<Mutations[M]>;
    dispatch<A extends keyof Actions>(type: A, ...payload: Payload<Actions[A]>): ReturnType<Actions[A]>;
}

export default createStore((store as unknown) as StoreOptions<State>);
export const useStore = (): Store => useVuexStore();
