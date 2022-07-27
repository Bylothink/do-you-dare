import gql from "graphql-tag";
import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import graphql from "@/services/graphql";

const COOKIE_VERSION = 1;
const USER_SCHEMA = "user";

const AUTHENTICATE = gql`mutation authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
        token,
        user {
            id,
            isActive,
            username,
            email
        }
    }
}`;
const RENEW_SESSION = gql`mutation {
    renewSession {
        token,
        user {
            id,
            isActive,
            username,
            email
        }
    }
}`;
const DISCONNECT = gql`mutation {
    disconnect
}`;

// eslint-disable-next-line max-len
const REGISTER = gql`mutation register($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String) {
    register(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName) {
        token,
        user {
            id,
            isActive,
            username,
            email
        }
    }
}`;

const VERIFY_EMAIL = gql`mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token)
}`;

const ACCOUNT_VALIDATION_MAIL = gql`mutation {
    accountValidationMail
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

interface User
{
    id: number;
    active: boolean;
    email: string;
    username: string;
}
interface Session
{
    token: string;
    user: User
}
interface AuthenticateResponse
{
    authenticate: Session;
}
interface RegisterResponse
{
    register: Session;
}
interface RenewSessionResponse
{
    renewSession: Session;
}

interface UserState
{
    cookieAck?: CookieAcknowledgement;
    token?: string;

    username?: string;
    email?: string;
}

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
        _setInfo(user?: User): void
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
            const response = await graphql.mutation<AuthenticateResponse>(USER_SCHEMA, AUTHENTICATE,
                { username, password });

            this._setToken(response.authenticate.token);
            this._setInfo(response.authenticate.user);
        },
        async register(registerVariables: RegisterVariables): Promise<void>
        {
            const response = await graphql.mutation<RegisterResponse>(USER_SCHEMA, REGISTER, registerVariables);

            this._setToken(response.register.token);
            this._setInfo(response.register.user);
        },

        verifyEmail(email: string, token: string): Promise<void>
        {
            return graphql.mutation(USER_SCHEMA, VERIFY_EMAIL, { email, token });
        },
        async renewToken(): Promise<void>
        {
            const jsonWebToken = this.token;
            const response = await graphql.query<RenewSessionResponse>(USER_SCHEMA, RENEW_SESSION,
                { jsonWebToken });

            this._setToken(response.renewSession.token);
            this._setInfo(response.renewSession.user);
        },

        sendAccountValidationMail(): Promise<void>
        {
            const jsonWebToken = this.token;

            return graphql.mutation(USER_SCHEMA, ACCOUNT_VALIDATION_MAIL, { }, { jsonWebToken });
        },

        logOut(): Promise<void>
        {
            const jsonWebToken = this.token;

            this._setToken();
            this._setInfo();

            return graphql.mutation(USER_SCHEMA, DISCONNECT, { }, { jsonWebToken });
        }
    }
});
