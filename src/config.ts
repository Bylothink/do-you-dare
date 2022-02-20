import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

// SMELLS: interface PageOptions extends RouteRecordRaw
export type PageOptions = RouteRecordRaw &
{
    id: number;
    title: string;
    icon?: string;
    meta?: {
        requiresAuth?: boolean;
        topLevel?: boolean;
    }
};
export interface ConfigOptions
{
    backendUrl: string;
    title: string;
    author: string;
    pages: PageOptions[];
    version: string;
}

class PageCollection extends Array<PageOptions>
{
    public get topLevel(): PageOptions[]
    {
        return this.filter((page) => page.meta?.topLevel);
    }

    public getByPath(path: string): PageOptions | undefined
    {
        return this.find((page) => page.path === path);
    }
    public getByRoute(route: RouteLocationNormalized): PageOptions | undefined
    {
        return this.getByPath(route.path);
    }
}
class Config implements ConfigOptions
{
    protected _options: ConfigOptions;
    protected _pages: PageCollection;

    public get backendUrl(): string { return this._options.backendUrl; }
    public get title(): string { return this._options.title; }
    public get author(): string { return this._options.author; }
    public get pages(): PageCollection { return this._pages; }
    public get version(): string { return this._options.version; }

    constructor(options: ConfigOptions)
    {
        this._options = options;
        this._pages = new PageCollection(...this._options.pages);
    }
}

export default new Config({
    backendUrl: import.meta.env.VITE_BACKEND_URL,

    title: "Do you Dare?",
    author: "Matteo Bilotta",
    pages: [
        {
            id: 0x1,
            name: "home",
            path: "/",
            component: () => import(/* webpackChunkName: "home-page" */ "./pages/HomePage.vue"),
            title: "Home",
            meta: { topLevel: true }
        },
        {
            id: 0x2,
            name: "game",
            path: "/game",
            component: () => import(/* webpackChunkName: "game-page" */ "./pages/GamePage.vue"),
            title: "Game",
            meta: { topLevel: true }
        },
        {
            id: 0x30,
            name: "user",
            path: "/user",
            component: () => import(/* webpackChunkName: "user-page" */ "@/pages/UserPage.vue"),
            title: "Profile",
            meta: {
                requiresAuth: true,
                topLevel: true
            }
        },
        {
            id: 0x31,
            name: "user-sign_in",
            path: "/user/sign-in",
            component: () => import(/* webpackChunkName: "user-sign_in-page" */ "@/pages/user/SignInPage.vue"),
            title: "Sign in"
        },
        {
            id: 0x32,
            name: "user-sign_up",
            path: "/user/sign-up",
            component: () => import(/* webpackChunkName: "user-sign_up-page" */ "@/pages/user/SignUpPage.vue"),
            title: "Sign up"
        },
        {
            id: 0x33,
            name: "user-email_sent",
            path: "/user/email-sent",
            component: () => import(/* webpackChunkName: "user-email_sent-page" */ "@/pages/user/EmailSentPage.vue"),
            title: "Email sent"
        },
        {
            id: 0x9,
            name: "about",
            path: "/about",
            component: () => import(/* webpackChunkName: "about-page" */ "@/pages/AboutPage.vue"),
            title: "About",
            meta: { topLevel: true }
        }
    ],
    version: "0.0.1α"
});
