import gql from "graphql-tag";
import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import graphql from "@/services/graphql";

const USER_SCHEMA = "user";

const GET_TOKEN = gql`mutation getToken($username: String!, $password: String!) {
    getToken(username: $username, password: $password) {
        token
    }
}`;

// eslint-disable-next-line max-len
const CREATE_USER = gql`mutation createUser($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String) {
    createUser(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName) {
        result
    }
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

interface GetTokenResponse
{
    getToken: { token: string };
}
interface VerifyEmailResponse
{
    verifyEmail: { token: string };
}

export default defineStore("user", {
    state: () => ({ token: jsonLocalStorage.get<string>("user:token") }),

    getters: { isLogged(): boolean { return !!(this.token); } },
    actions: {
        _setToken(token: string): void
        {
            this.token = token;

            jsonLocalStorage.set("user:token", token);
        },

        async signIn(username: string, password: string): Promise<void>
        {
            const response = await graphql.mutation<GetTokenResponse>(USER_SCHEMA, GET_TOKEN, { username, password });

            this._setToken(response.getToken.token);
        },
        async signUp(signUpVariables: SignUpVariables): Promise<void>
        {
            await graphql.mutation(USER_SCHEMA, CREATE_USER, signUpVariables);
        },

        async verifyEmail(email: string, token: string): Promise<void>
        {
            const response = await graphql.mutation<VerifyEmailResponse>(USER_SCHEMA, VERIFY_EMAIL, { email, token });

            this._setToken(response.verifyEmail.token);
        }
    }
});
