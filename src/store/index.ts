import { createStore } from "vuex";

import { RootState } from "./types";
import userModule from "./user";

export default createStore<RootState>({
    modules: { user: userModule }
});
