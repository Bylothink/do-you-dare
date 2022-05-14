import { createRouter, createWebHistory } from "vue-router";

import config from "./config";
import useUserStore from "./stores/user";

const router = createRouter({
    history: createWebHistory(),
    routes: config.pages
});

router.beforeEach((to, from) =>
{
    const nextPage = config.pages.getByRoute(to);

    if (nextPage?.name === "user-sign_out")
    {
        const user = useUserStore();

        user.signOut();
    }
    else if (nextPage?.meta?.requiresAuth)
    {
        const user = useUserStore();

        if (!user.isLogged)
        {
            router.push({ name: "user-sign_in", query: { next: to.path } });
        }
    }
});

export default router;
