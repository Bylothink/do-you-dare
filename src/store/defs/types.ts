/* eslint-disable @typescript-eslint/no-empty-interface */

export interface IndexState { }
export interface GameState
{
    // TODO!
}
export interface UserState
{
    token?: string;
}
export interface DrawState
{
    //
}

export interface RootState extends IndexState
{
    game: GameState;
    user: UserState;
}
