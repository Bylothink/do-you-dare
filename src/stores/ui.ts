import { defineStore } from "pinia";

import { AlertOptions } from "@/core/types";

export default defineStore("ui", {
    state: () => ({ }),

    getters: { },
    actions: { alert(options: AlertOptions): void { /* ... */ } }
});
