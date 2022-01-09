import { RouteLocationRaw } from "vue-router";

export type ActionCallback = (this: AlertOptions, done: () => Promise<void>) => void;
export interface ActionOptions
{
    type: "primary" | "secondary" | "link";
    label: string;

    callback?: ActionCallback;
    location?: RouteLocationRaw;
}
export interface AlertOptions
{
    type: "danger" | "warning" | "success" | "info";
    icon?: string;
    title?: string;
    message: string;
    actions?: ActionOptions[];
    dismissable?: boolean;
    timeout?: number;
}

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
