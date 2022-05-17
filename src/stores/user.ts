import gql from "graphql-tag";
import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import graphql from "@/services/graphql";

const USER_SCHEMA = "user";

const CREATE_SESSION = gql`mutation createSession($username: String!, $password: String!) {
    createSession(username: $username, password: $password) {
        token
    }
}`;
const REFRESH_SESSION = gql`mutation {
    refreshSession {
        token
    }
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

interface SignUpVariables
{
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface CreateSessionResponse
{
    createSession: { token: string; };
}
interface RefreshSessionResponse
{
    refreshSession: { token: string; };
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

        async newSession(): Promise<void>
        {
            const jsonWebToken = this.token;
            const response = await graphql.query<RefreshSessionResponse>(USER_SCHEMA, REFRESH_SESSION,
                { jsonWebToken });

            this._setToken(response.refreshSession.token);
        },

        async signIn(username: string, password: string): Promise<void>
        {
            const response = await graphql.mutation<CreateSessionResponse>(USER_SCHEMA, CREATE_SESSION,
                { username, password });

            this._setToken(response.createSession.token);
        },
        async signUp(signUpVariables: SignUpVariables): Promise<void>
        {
            await graphql.mutation(USER_SCHEMA, CREATE_USER, signUpVariables);
        },

        signOut(): void
        {
            this._setToken();
        },

        async verifyEmail(email: string, token: string): Promise<void>
        {
            const response = await graphql.mutation<VerifyEmailResponse>(USER_SCHEMA, VERIFY_EMAIL,
                { email, token });

            this._setToken(response.verifyEmail.token);
        }
    }
});
