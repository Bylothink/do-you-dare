export class Point
{
    x: number;
    y: number;

    public constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }
}

export interface DragEvent
{
    mouse: Point;
    offset: Point;
}
