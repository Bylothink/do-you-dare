import gql from "graphql-tag";
import { ActionContext } from "vuex";

import { localStorage } from "@/core/utils";
import graphql, { GraphQLVariables } from "@/services/graphql";

import { RootState, UserState } from "./types";

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

interface SignInVariables extends GraphQLVariables
{
    username: string;
    password: string;
}
interface SignUpVariables extends GraphQLVariables
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

export default {
    namespaced: true,

    state: (): UserState => ({ token: localStorage.get<string>("user:token") }),

    getters: {
        isLogged(state: UserState): boolean
        {
            return !!(state.token);
        }
    },
    mutations: {
        setToken(state: UserState, value: string): void
        {
            state.token = value;

            localStorage.set("user:token", value);
        }
    },
    actions: {
        async signIn({ state, commit }: ActionContext<UserState, RootState>, signInVariables: SignInVariables)
            : Promise<void>
        {
            const response = await graphql.mutation<GetTokenResponse>(AUTH_SCHEMA, GET_TOKEN, signInVariables);

            commit("setToken", response.getToken.token);
        },
        async signUp({ state, commit }: ActionContext<UserState, RootState>, signUpVariables: SignUpVariables)
            : Promise<User>
        {
            const response = await graphql.mutation<CreateUserResponse>(AUTH_SCHEMA, CREATE_USER, signUpVariables);

            return response.createUser.user;
        }
    }
};
