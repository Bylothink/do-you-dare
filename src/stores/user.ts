import gql from "graphql-tag";
import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import graphql from "@/services/graphql";

const COOKIE_VERSION = 1;
const USER_SCHEMA = "user";

const AUTHENTICATE = gql`mutation authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
        token
    }
}`;
const RENEW_SESSION = gql`mutation {
    renewSession {
        token
    }
}`;
const DISCONNECT = gql`mutation {
    disconnect
}`;

// eslint-disable-next-line max-len
const REGISTER = gql`mutation register($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String) {
    register(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName)
}`;

const VERIFY_EMAIL = gql`mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
        token
    }
}`;

interface CookieAcknowledgement
{
    value: boolean;
    version: number;
}

interface RegisterVariables
{
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface AuthenticateResponse
{
    authenticate: { token: string; };
}
interface RenewSessionResponse
{
    renewSession: { token: string; };
}
interface VerifyEmailResponse
{
    verifyEmail: { token: string; };
}

export default defineStore("user", {
    state: () => ({
        cookieAck: jsonLocalStorage.get<CookieAcknowledgement>("user:cookieAck"),
        token: jsonLocalStorage.get<string>("user:token")
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
        _setToken(token?: string): void
        {
            this.token = token;

            jsonLocalStorage.set("user:token", this.token);
        },

        acceptCookies(): void { this._setCookieAck(true); },
        declineCookies(): void { this._setCookieAck(false); },

        async logIn(username: string, password: string): Promise<void>
        {
            const response = await graphql.mutation<AuthenticateResponse>(USER_SCHEMA, AUTHENTICATE,
                { username, password });

            this._setToken(response.authenticate.token);
        },
        async register(registerVariables: RegisterVariables): Promise<void>
        {
            await graphql.mutation(USER_SCHEMA, REGISTER, registerVariables);
        },

        async verifyEmail(email: string, token: string): Promise<void>
        {
            const response = await graphql.mutation<VerifyEmailResponse>(USER_SCHEMA, VERIFY_EMAIL,
                { email, token });

            this._setToken(response.verifyEmail.token);
        },
        async renewToken(): Promise<void>
        {
            const jsonWebToken = this.token;
            const response = await graphql.query<RenewSessionResponse>(USER_SCHEMA, RENEW_SESSION,
                { jsonWebToken });

            this._setToken(response.renewSession.token);
        },

        logOut(): Promise<void>
        {
            const jsonWebToken = this.token;

            this._setToken();

            return graphql.query(USER_SCHEMA, DISCONNECT, { jsonWebToken });
        }
    }
});
