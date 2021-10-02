import { createStore, StoreOptions } from "vuex";

import { IndexState, RootState } from "./types";
import userModule from "./user";

const store = {
    state: (): IndexState => ({ }),

    getters: { },
    mutations: { },
    actions: { },
    modules: { user: userModule }
};

export default createStore((store as unknown) as StoreOptions<RootState>);
