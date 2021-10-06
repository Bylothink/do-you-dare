import { Store } from "vuex/types/index.js";

export interface LoginPayload
{
    username: string;
    password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IndexState { }
export interface UserState
{
    token?: string;
}

export interface RootState
{
    user: UserState;
}

interface Getters
{
    "user/isLogged": boolean;
}
interface MutationsMap
{
    "user/setToken": (payload: string) => void;
}
interface ActionsMap
{
    "user/login": (payload: LoginPayload) => Promise<void>;
}

type Payload<T> = T extends (...payload: infer P) => void ? P : never;

export interface RootStore extends Store<RootState>
{
    state: RootState;
    getters: Getters;
    commit<M extends keyof MutationsMap>(type: M, ...payload: Payload<MutationsMap[M]>): ReturnType<MutationsMap[M]>;
    dispatch<A extends keyof ActionsMap>(type: A, ...payload: Payload<ActionsMap[A]>): ReturnType<ActionsMap[A]>;
}
