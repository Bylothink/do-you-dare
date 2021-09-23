import { CommitOptions, createStore, DispatchOptions, StoreOptions, useStore as vuexStore } from "vuex";

import { IndexState, RootState } from "./types";
import userModule from "./user";

const store = {
    state: (): IndexState => ({ }),

    getters: { },
    mutations: { },
    actions: { },
    modules: { user: userModule }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore()
{
    const vuex = vuexStore();

    type State = ReturnType<typeof store.state>;
    type Getters = typeof store.getters;
    type Mutations = typeof store.mutations;
    type Actions = typeof store.actions;
    // type Modules = typeof store.modules;

    return vuex as {
        state: { [S in keyof State]: State[S] }, // & { [M in keyof Modules]: ReturnType<typeof store.modules[M]["state"]> },
        getters: { [K in keyof Getters]: ReturnType<Getters[K]> },

        commit<M extends keyof Mutations>(type: M, payload: Parameters<Mutations[M]>[1], options?: CommitOptions): ReturnType<Mutations[M]>
        dispatch<A extends keyof Actions>(type: A, payload: Parameters<Actions[A]>[1], options?: DispatchOptions): ReturnType<Actions[A]>
    };
}

export default createStore((store as unknown) as StoreOptions<RootState>);
