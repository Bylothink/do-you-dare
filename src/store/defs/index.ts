import { IndexState } from "./types";

import cards from "./cards";
import user from "./user";

export default {
    state: (): IndexState => ({ }),

    getters: { },
    mutations: { },
    actions: { },
    modules: { cards, user }
};
