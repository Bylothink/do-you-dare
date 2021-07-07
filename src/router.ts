import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomePage from "./pages/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HomePage",

        component: HomePage
    },
    {
        path: "/about",
        name: "AboutPage",

        component: () => import(/* webpackChunkName: "about-page" */ "./pages/AboutPage.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
});

export default router;
