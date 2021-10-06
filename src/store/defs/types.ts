/* eslint-disable @typescript-eslint/no-empty-interface */

export interface IndexState { }
export interface CardsState
{
    // TODO!
}
export interface UserState
{
    token?: string;
}

export interface RootState extends IndexState
{
    cards: CardsState;
    user: UserState;
}
