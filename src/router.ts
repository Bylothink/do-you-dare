import { createRouter, createWebHistory } from "vue-router";

import config from "./config";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: config.pages
});

export default router;
