import { ActionContext } from "vuex";

import { AlertOptions } from "@/core/types";
import { IndexState, RootState } from "./types";

import game from "./game";
import user from "./user";

export default {
    state: (): IndexState => ({ }),

    getters: { },
    mutations: { },
    actions: { alert(context: ActionContext<IndexState, RootState>, options: AlertOptions): void { /* ... */ } },
    modules: { game, user }
};
