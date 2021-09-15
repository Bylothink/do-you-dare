import { createRouter, createWebHistory } from "vue-router";

import config from "./config";

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: config.pages
});
