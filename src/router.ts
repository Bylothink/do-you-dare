import { createRouter, createWebHistory } from "vue-router";

import config from "./config";

export default createRouter({
    history: createWebHistory(),
    routes: config.pages
});
