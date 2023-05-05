import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils/index.js";
import type { UserData } from "@/models/user.js";

import * as Mutations from "./mutations/index.js";
import type { RegisterData } from "./mutations/register.js";

import type UserState from "./types.js";
import type { CookieAcknowledgement } from "./types.js";
import { useVuert } from "@byloth/vuert";
import { getCurrentInstance } from "vue";

const COOKIE_VERSION = 1;

export default defineStore("user", {
    state: (): UserState => ({
        cookieAck: jsonLocalStorage.get<CookieAcknowledgement>("user:cookieAck"),
        token: jsonLocalStorage.get<string>("user:token"),

        username: undefined,
        email: undefined
    }),

    getters: {
        hasAcceptedCookies(): boolean | undefined
        {
            if (this.cookieAck?.version === COOKIE_VERSION)
            {
                return this.cookieAck.value;
            }

            return undefined;
        },
        isLogged(): boolean { return !!(this.token); }
    },
    actions: {
        _setCookieAck(value: boolean): void
        {
            this.cookieAck = { value: value, version: COOKIE_VERSION };

            jsonLocalStorage.set("user:cookieAck", this.cookieAck);
        },
        _setInfo(user?: Partial<UserData>): void
        {
            this.username = user?.username;
            this.email = user?.email;
        },
        _setToken(token?: string): void
        {
            this.token = token;

            jsonLocalStorage.set("user:token", this.token);
        },

        acceptCookies(): void { this._setCookieAck(true); },
        declineCookies(): void { this._setCookieAck(false); },

        async logIn(username: string, password: string): Promise<void>
        {
            const request = new Mutations.Authenticate({ username, password });
            const response = await request.execute();

            this._setToken(response.token);
            this._setInfo(response.user);
        },
        changePassword(token: string, newPassword: string): Promise<void>
        {
            const request = new Mutations.ChangePassword({ token, newPassword });

            return request.execute();
        },
        requestPasswordResetEmail(email: string): Promise<void>
        {
            const request = new Mutations.RequestPasswordResetEmail({ email });

            return request.execute();
        },

        async register(args: RegisterData): Promise<void>
        {
            const request = new Mutations.Register(args);
            const response = await request.execute();

            this._setToken(response.token);
            this._setInfo(response.user);
        },

        verifyEmail(token: string): Promise<void>
        {
            const request = new Mutations.VerifyEmail({ token });

            return request.execute();
        },
        async renewToken(): Promise<void>
        {
            const request = new Mutations.RenewSession(this.token!);
            const response = await request.execute();

            this._setToken(response.token);
            this._setInfo(response.user);
        },

        requestNewValidationEmail(): Promise<void>
        {
            const request = new Mutations.RequestAccountValidationEmail(this.token!);

            return request.execute();
        },

        logOut(): Promise<void>
        {
            const request = new Mutations.Disconnect(this.token!);

            this._setToken();
            this._setInfo();

            return request.execute();
        }
    }
});
