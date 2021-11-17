import gql from "graphql-tag";
import { ActionContext } from "vuex";

import { localStorage } from "@/core/utils";
import graphql, { GraphQLVariables } from "@/services/graphql";

import { RootState, UserState } from "./types";

const GET_TOKEN_AUTH = gql`mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
    }
}`;
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

interface TokenAuthResponse
{
    tokenAuth: { token: string };
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
        async signIn({ state, commit }: ActionContext<UserState, RootState>, signInVariables: SignInVariables): Promise<void>
        {
            const response = await graphql.mutation<TokenAuthResponse>("auth", GET_TOKEN_AUTH, signInVariables);

            commit("setToken", response.tokenAuth.token);
        },
        async signUp({ state, commit }: ActionContext<UserState, RootState>, signUpVariables: SignUpVariables): Promise<User>
        {
            const response = await graphql.mutation<CreateUserResponse>("auth", CREATE_USER, signUpVariables);

            return response.createUser.user;
        }
    }
};