import { IndexState } from "./types";

import game from "./game";
import user from "./user";

export default {
    state: (): IndexState => ({ }),

    getters: { },
    mutations: { },
    actions: { },
    modules: { game, user }
};
