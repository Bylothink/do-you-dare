import gql from "graphql-tag";
import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/core/utils";
import graphql from "@/services/graphql";

const AUTH_SCHEMA = "auth";

const GET_TOKEN = gql`mutation getToken($username: String!, $password: String!) {
    getToken(username: $username, password: $password) {
        token
    }
}`;

// eslint-disable-next-line max-len
const CREATE_USER = gql`mutation createUser($firstName: String!, $lastName: String! $username: String!, $password: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, username: $username, password: $password, email: $email) {
        user {
            id,
            firstName,
            lastName,
            username,
            email,
            dateJoined,
            lastLogin
        }
    }
}`;

interface SignInVariables
{
    username: string;
    password: string;
}
interface SignUpVariables
{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

interface GetTokenResponse
{
    getToken: { token: string };
}

interface User
{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    dateJoined: string;
    lastLogin: string | null;
}
interface CreateUserResponse
{
    createUser: { user: User };
}

export default defineStore("user", {
    state: () => ({ token: jsonLocalStorage.get<string>("user:token") }),

    getters: { isLogged(): boolean { return !!(this.token); } },
    actions: {
        async signIn(signInVariables: SignInVariables) : Promise<void>
        {
            const response = await graphql.mutation<GetTokenResponse>(AUTH_SCHEMA, GET_TOKEN, signInVariables);
            const token = response.getToken.token;

            this.token = token;

            jsonLocalStorage.set("user:token", token);
        },
        async signUp(signUpVariables: SignUpVariables) : Promise<User>
        {
            const response = await graphql.mutation<CreateUserResponse>(AUTH_SCHEMA, CREATE_USER, signUpVariables);

            return response.createUser.user;
        }
    }
});
