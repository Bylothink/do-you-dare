import gql from "graphql-tag";
import { ActionContext } from "vuex";

import { localStorage } from "@/core/utils";
import { graphql } from "@/services";

import { LoginPayload, RootState, UserState } from "./types";

const TOKEN_AUTH = gql`mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
    }
}`;

interface TokenAuthResponse
{
    tokenAuth: { token: string };
}

const userModule = {
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
        async login({ commit }: ActionContext<UserState, RootState>, { username, password }: LoginPayload): Promise<void>
        {
            const response = await graphql.mutation<TokenAuthResponse>("auth", TOKEN_AUTH, {
                username: username,
                password: password
            });

            commit("setToken", response.tokenAuth.token);
        }
    }
};

export default userModule;
