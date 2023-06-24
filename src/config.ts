import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

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
  public get version(): string { return this._options.version; }

  public get pages(): PageCollection { return this._pages; }

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
      component: () => import("./pages/HomePage.vue"),
      title: "Home page",
      meta: { topLevel: true }
    },
    {
      id: 0x2,
      name: "game",
      path: "/game",
      component: () => import("./pages/GamePage.vue"),
      title: "Play!",
      meta: { topLevel: true }
    },
    {
      id: 0x31,
      name: "user-log_in",
      path: "/user/log-in",
      component: () => import("./pages/user/LogInPage.vue"),
      title: "Log in"
    },
    {
      id: 0x32,
      name: "user-profile",
      path: "/user/profile",
      component: () => import("./pages/user/ProfilePage.vue"),
      title: "Your profile",
      meta: {
        requiresAuth: true,
        topLevel: true
      }
    },
    {
      id: 0x331,
      name: "user-password-request_email",
      path: "/user/password/forgotten",
      component: () => import("./pages/user/password/RequestEmailPage.vue"),
      title: "Reset forgotten password"
    },
    {
      id: 0x332,
      name: "user-password-reset",
      path: "/user/password/reset",
      component: () => import("./pages/user/password/ResetPage.vue"),
      title: "Change forgotten password"
    },
    {
      id: 0x340,
      name: "user-register",
      path: "/user/register",
      component: () => import("./pages/user/RegisterPage.vue"),
      title: "Register"
    },
    {
      id: 0x341,
      name: "user-register-email_sent",
      path: "/user/register/email-sent",
      component: () => import("./pages/user/register/EmailSentPage.vue"),
      title: "Email sent!"
    },
    {
      id: 0x342,
      name: "user-register-validate",
      path: "/user/register/validate",
      component: () => import("./pages/user/register/ValidatePage.vue"),
      title: "Validate your account"
    },
    {
      id: 0x3f,
      name: "user-log_out",
      path: "/user/log-out",
      component: () => import("./pages/user/LogOutPage.vue"),
      title: "Log out"
    },
    {
      id: 0x9,
      name: "about",
      path: "/about",
      component: () => import("./pages/AboutPage.vue"),
      title: "About",
      meta: { topLevel: true }
    }
  ],
  version: "0.0.1α"
});
