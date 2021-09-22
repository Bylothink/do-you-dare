export interface UserState
{
    token?: string;
}

export interface RootState
{
    user: UserState;
}
