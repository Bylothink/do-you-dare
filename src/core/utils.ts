export const nextFrame = (): Promise<void> =>
{
    return new Promise<void>((resolve, reject) =>
    {
        requestAnimationFrame(() => resolve());
    });
};

export const waitTimeout = (milliseconds: number): Promise<void> =>
{
    return new Promise<void>((resolve, reject) =>
    {
        setTimeout(resolve, milliseconds);
    });
};
