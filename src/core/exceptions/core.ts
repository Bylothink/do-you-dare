export default class Exception extends Error
{
    public constructor(message: string, cause?: unknown)
    {
        super(message);

        if (cause)
        {
            if (cause instanceof Error)
            {
                this.stack += `\nCaused by: ${cause.stack}`;
            }
            else
            {
                this.stack += `\nCaused by: ${cause}`;
            }
        }
    }
}
