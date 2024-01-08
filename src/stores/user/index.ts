import { ref } from "vue";
import { computed } from "vue";
import { defineStore } from "pinia";

import type { UserData } from "@/models/user";
import { jsonStorage } from "@/utils";

import * as Mutations from "./mutations";
import type { RegisterData } from "./mutations/register";

import type { CookieAcknowledgement } from "./types";

const COOKIE_VERSION = 1;

export default defineStore("user", () =>
{
    const clear = (): void =>
    {
        _setInfo();
        _setToken();
    };

    const _cookieAck = ref(jsonStorage.read<CookieAcknowledgement>("user:cookieAck"));
    const _setCookieAck = (value: boolean): void =>
    {
        _cookieAck.value = { value: value, version: COOKIE_VERSION };

        jsonStorage.write("user:cookieAck", _cookieAck.value);
    };

    const hasAcceptedCookies = computed((): boolean | undefined =>
    {
        if (_cookieAck.value?.version === COOKIE_VERSION)
        {
            return _cookieAck.value.value;
        }

        return undefined;
    });

    const acceptCookies = (): void => { _setCookieAck(true); };
    const declineCookies = (): void => { _setCookieAck(false); };

    const _token = ref(jsonStorage.read<string>("user:token"));
    const token = computed((): string | undefined => _token.value);

    const _setToken = (value?: string): void =>
    {
        _token.value = value;

        jsonStorage.write("user:token", _token.value);
    };

    const isLogged = computed((): boolean => !!(_token.value));

    const username = ref<string>();
    const email = ref<string>();

    const _setInfo = (user?: Partial<UserData>): void =>
    {
        username.value = user?.username;
        email.value = user?.email;
    };

    async function logIn(_username: string, _password: string): Promise<void>
    {
        const request = new Mutations.Authenticate({
            username: _username,
            password: _password
        });

        const response = await request.execute();

        _setToken(response.token);
        _setInfo(response.user);
    }
    async function logOut(): Promise<void>
    {
        const request = new Mutations.Disconnect(_token.value!);

        clear();

        await request.execute();
    }

    async function renewToken(): Promise<void>
    {
        const request = new Mutations.RenewSession(_token.value!);
        const response = await request.execute();

        _setToken(response.token);
        _setInfo(response.user);
    }

    async function requestPasswordResetEmail(_email: string): Promise<void>
    {
        const request = new Mutations.RequestPasswordResetEmail({ email: _email });
        await request.execute();
    }
    async function changePassword(_changePasswordToken: string, _newPassword: string): Promise<void>
    {
        const request = new Mutations.ChangePassword({
            token: _changePasswordToken,
            newPassword: _newPassword
        });

        await request.execute();
    }

    async function register(data: RegisterData): Promise<void>
    {
        const request = new Mutations.Register(data);
        const response = await request.execute();

        _setToken(response.token);
        _setInfo(response.user);
    }
    async function requestNewValidationEmail(): Promise<void>
    {
        const request = new Mutations.RequestAccountValidationEmail(_token.value!);
        await request.execute();
    }
    async function verifyEmail(_verifyEmailToken: string): Promise<void>
    {
        const request = new Mutations.VerifyEmail({ token: _verifyEmailToken });
        await request.execute();
    }

    return {
        clear,

        hasAcceptedCookies,
        acceptCookies,
        declineCookies,

        token,
        isLogged,

        username,
        email,

        logIn,
        logOut,
        renewToken,

        requestPasswordResetEmail,
        changePassword,

        register,
        requestNewValidationEmail,
        verifyEmail
    };
});
