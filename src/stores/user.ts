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

interface SignInVariables
{
    username: string;
    password: string;
}
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

export default defineStore("user", {
    state: () => ({ token: jsonLocalStorage.get<string>("user:token") }),

    getters: { isLogged(): boolean { return !!(this.token); } },
    actions: {
        async signIn(signInVariables: SignInVariables): Promise<void>
        {
            const response = await graphql.mutation<GetTokenResponse>(USER_SCHEMA, GET_TOKEN, signInVariables);
            const token = response.getToken.token;

            this.token = token;

            jsonLocalStorage.set("user:token", token);
        },
        async signUp(signUpVariables: SignUpVariables): Promise<void>
        {
            await graphql.mutation(USER_SCHEMA, CREATE_USER, signUpVariables);
        }
    }
});
