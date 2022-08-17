import { RouteLocationRaw } from "vue-router";

export type CallbackOptions = {
    callback: (this: AlertOptions) => void;
    location?: undefined;
    triggerClosing?: true;
} | {
    callback: (this: AlertOptions, close?: () => Promise<void>) => void;
    location?: undefined;
    triggerClosing: false;
};
export type LocationOptions = {
    callback?: undefined;
    location: RouteLocationRaw;
    triggerClosing?: boolean;
};
export type ActionOptions = (CallbackOptions | LocationOptions) & {
    type: "primary" | "secondary" | "link";
    label: string;
};
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

export type MaybePromise<T> = T | Promise<T>;
