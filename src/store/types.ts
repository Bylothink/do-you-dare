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
