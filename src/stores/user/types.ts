export interface CookieAcknowledgement
{
    value: boolean;
    version: number;
}

export default interface UserState
{
    cookieAck?: CookieAcknowledgement;
    token?: string;

    username?: string;
    email?: string;

// eslint-disable-next-line semi
}
