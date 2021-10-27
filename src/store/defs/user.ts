import gql from "graphql-tag";
import { ActionContext } from "vuex";

import { localStorage } from "@/core/utils";
import { graphql } from "@/services";

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

interface SignInPayload
{
    username: string;
    password: string;
}
interface SignUpPayload
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
        async signIn({ commit }: ActionContext<UserState, RootState>, { username, password }: SignInPayload): Promise<void>
        {
            const response = await graphql.mutation<TokenAuthResponse>("auth", GET_TOKEN_AUTH, {
                username: username,
                password: password
            });

            commit("setToken", response.tokenAuth.token);
        },
        async signUp({ commit }: ActionContext<UserState, RootState>, { firstName, lastName, username, password, email }: SignUpPayload): Promise<User>
        {
            const response = await graphql.mutation<CreateUserResponse>("auth", CREATE_USER, {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email
            });

            return response.createUser.user;
        }
    }
};
