import { createRouter, createWebHistory } from "vue-router";

import config from "./config.js";
import useUserStore from "./stores/user/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes: config.pages
});

router.beforeEach((to, from) =>
{
    const nextPage = config.pages.getByRoute(to);

    if (nextPage?.meta?.requiresAuth)
    {
        const user = useUserStore();

        if (!user.isLogged)
        {
            router.push({ name: "user_log-in", query: { next: to.path } });
        }
    }
});

export default router;
