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

export type MaybePromise<T> = T | Promise<T>;
