export interface CookieAcknowledgement
{
    value: boolean;
    version: number;
}

interface UserState
{
    cookieAck?: CookieAcknowledgement;
    token?: string;

    username?: string;
    email?: string;
}

export default UserState;
