import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import { UserData } from "@/models/user";

import graphql from "@/services/graphql";

import { Mutations } from "./graphql";

import UserState, { Arguments, CookieAcknowledgement, Responses } from "./types";

const COOKIE_VERSION = 1;
const USER_SCHEMA = "user";

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
            const response = await graphql.mutation<Responses.Authenticate>(USER_SCHEMA, Mutations.AUTHENTICATE,
                { username, password });

            this._setToken(response.authenticate.token);
            this._setInfo(response.authenticate.user);
        },
        async requestResetPasswordMail(email: string): Promise<void>
        {
            return graphql.mutation(USER_SCHEMA, Mutations.REQUEST_RESET_PASSWORD_MAIL, { email });
        },

        async register(registerArguments: Arguments.Register): Promise<void>
        {
            const response = await graphql.mutation<Responses.Register>(USER_SCHEMA, Mutations.REGISTER,
                registerArguments);

            this._setToken(response.register.token);
            this._setInfo(response.register.user);
        },

        verifyEmail(token: string): Promise<void>
        {
            return graphql.mutation(USER_SCHEMA, Mutations.VERIFY_EMAIL, { token });
        },
        async renewToken(): Promise<void>
        {
            const jsonWebToken = this.token;
            const response = await graphql.query<Responses.RenewSession>(USER_SCHEMA, Mutations.RENEW_SESSION,
                { jsonWebToken });

            this._setToken(response.renewSession.token);
            this._setInfo(response.renewSession.user);
        },

        requestNewValidationMail(): Promise<void>
        {
            const jsonWebToken = this.token;

            return graphql.mutation(USER_SCHEMA, Mutations.REQUEST_VALIDATION_MAIL, { }, { jsonWebToken });
        },

        logOut(): Promise<void>
        {
            const jsonWebToken = this.token;

            this._setToken();
            this._setInfo();

            return graphql.mutation(USER_SCHEMA, Mutations.DISCONNECT, { }, { jsonWebToken });
        }
    }
});
