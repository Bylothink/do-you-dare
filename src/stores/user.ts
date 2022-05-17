import gql from "graphql-tag";
import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import graphql from "@/services/graphql";

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
const CLOSE_SESSION = gql`mutation {
    closeSession
}`;

// eslint-disable-next-line max-len
const CREATE_USER = gql`mutation createUser($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String) {
    createUser(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName)
}`;

const VERIFY_EMAIL = gql`mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
        token
    }
}`;

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
    state: () => ({ token: jsonLocalStorage.get<string>("user:token") }),

    getters: { isLogged(): boolean { return !!(this.token); } },
    actions: {
        _setToken(token?: string): void
        {
            this.token = token;

            jsonLocalStorage.set("user:token", token);
        },

        async renewToken(): Promise<void>
        {
            const jsonWebToken = this.token;
            const response = await graphql.query<RenewSessionResponse>(USER_SCHEMA, RENEW_SESSION,
                { jsonWebToken });

            this._setToken(response.renewSession.token);
        },

        async logIn(username: string, password: string): Promise<void>
        {
            const response = await graphql.mutation<AuthenticateResponse>(USER_SCHEMA, AUTHENTICATE,
                { username, password });

            this._setToken(response.authenticate.token);
        },
        async register(registerVariables: RegisterVariables): Promise<void>
        {
            await graphql.mutation(USER_SCHEMA, CREATE_USER, registerVariables);
        },

        logOut(): Promise<void>
        {
            const jsonWebToken = this.token;

            this._setToken();

            return graphql.query(USER_SCHEMA, CLOSE_SESSION, { jsonWebToken });
        },

        async verifyEmail(email: string, token: string): Promise<void>
        {
            const response = await graphql.mutation<VerifyEmailResponse>(USER_SCHEMA, VERIFY_EMAIL,
                { email, token });

            this._setToken(response.verifyEmail.token);
        }
    }
});
