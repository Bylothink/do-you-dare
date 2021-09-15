import { RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/HomePage.vue";

// SMELLS: interface PageOptions extends RouteConfig
export type PageOptions = RouteRecordRaw &
{
    id: number;
    title: string;
    icon?: string;
    topLevel: boolean;
};

export interface ConfigOptions
{
    title: string;
    author: string;
    pages: PageOptions[];
    version: string;
}

class Config implements ConfigOptions
{
    protected _options: ConfigOptions;

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
            name: "match",
            path: "/match",
            component: () => import(/* webpackChunkName: "match-page" */ "./pages/MatchPage.vue"),
            title: "Match",
            topLevel: true
        },
        {
            id: 0x3,
            name: "login",
            path: "/login",
            component: () => import(/* webpackChunkName: "login-page" */ "@/pages/LoginPage.vue"),
            title: "Login",
            topLevel: true
        },
        {
            id: 0x4,
            name: "about",
            path: "/about",
            component: () => import(/* webpackChunkName: "about-page" */ "@/pages/AboutPage.vue"),
            title: "About",
            topLevel: true
        }
    ],
    version: "0.0.1α"
});
