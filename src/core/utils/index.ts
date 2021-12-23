import JsonStorage from "./json-storage";

export const localStorage = new JsonStorage(window.localStorage);
export const sessionStorage = new JsonStorage(window.sessionStorage);

export const nextFrame = (): Promise<void> =>
{
    return new Promise<void>((resolve, reject) =>
    {
        requestAnimationFrame(() => resolve());
    });
};
