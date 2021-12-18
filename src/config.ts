import { RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/HomePage.vue";

// SMELLS: interface PageOptions extends RouteRecordRaw
export type PageOptions = RouteRecordRaw &
{
    id: number;
    title: string;
    icon?: string;
    topLevel: boolean;
};

export interface ConfigOptions
{
    backendUrl: string;
    title: string;
    author: string;
    pages: PageOptions[];
    version: string;
}

class Config implements ConfigOptions
{
    protected _options: ConfigOptions;

    public get backendUrl(): string { return this._options.backendUrl; }
    public get title(): string { return this._options.title; }
    public get author(): string { return this._options.author; }
    public get pages(): PageOptions[] { return this._options.pages; }
    public get version(): string { return this._options.version; }

    constructor(options: ConfigOptions)
    {
        this._options = options;
    }
}

export default new Config({
    backendUrl: import.meta.env.VITE_BACKEND_URL,

    title: "Do you Dare?",
    author: "Matteo Bilotta",
    pages: [
        {
            id: 0x1,
            name: "index",
            path: "/",
            component: HomePage,
            title: "Home",
            topLevel: true
        },
        {
            id: 0x2,
            name: "game",
            path: "/game",
            component: () => import(/* webpackChunkName: "game-page" */ "./pages/GamePage.vue"),
            title: "Game",
            topLevel: true
        },
        {
            id: 0x31,
            name: "sign-in",
            path: "/sign-in",
            component: () => import(/* webpackChunkName: "sign-in-page" */ "@/pages/SignInPage.vue"),
            title: "Sign in",
            topLevel: true
        },
        {
            id: 0x32,
            name: "sign-up",
            path: "/sign-up",
            component: () => import(/* webpackChunkName: "sign-up-page" */ "@/pages/SignUpPage.vue"),
            title: "Sign up",
            topLevel: true
        },
        {
            id: 0x9,
            name: "about",
            path: "/about",
            component: () => import(/* webpackChunkName: "about-page" */ "@/pages/AboutPage.vue"),
            title: "About",
            topLevel: true
        }
    ],
    version: "0.0.1α"
});
