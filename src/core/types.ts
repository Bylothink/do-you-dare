export interface Point
{
    x: number;
    y: number;
}
export interface DragEvent
{
    mouse: Point;
    offset: Point;
}

export type Awaitable<T> = T | PromiseLike<T>;

export type PromiseResolver<T = void> = (result: Awaitable<T>) => void;
export type PromiseRejecter<E = unknown> = (error: E) => void;

export type PromiseExecutor<T = void, E = unknown> = (resolve: PromiseResolver<T>, reject: PromiseRejecter<E>) => void;
