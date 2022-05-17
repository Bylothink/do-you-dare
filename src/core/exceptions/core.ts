import { MaybePromise } from "@/core/types";

export default class Exception extends Error
{
    public static FromUnknown(error: unknown): Exception
    {
        if (error instanceof Exception)
        {
            return error;
        }

        const exc = new Exception("");

        if (error instanceof Error)
        {
            exc.message = error.message;
            exc.stack = error.stack;
            exc.name = error.name;
        }
        else
        {
            exc.message = String(error);
        }

        return exc;
    }

    public constructor(message: string, cause?: unknown, name = "Exception")
    {
        super(message);

        this.name = name;

        if (cause)
        {
            if (cause instanceof Error)
            {
                this.stack += `\nCaused by ${cause.stack}`;
            }
            else
            {
                this.stack += `\nCaused by ${cause}`;
            }
        }
    }
}

export class HandledException extends Exception
{
    public static async CatchUnhandled(error: unknown, catcher?: (exc: Exception) => MaybePromise<void>): Promise<void>
    {
        const exc = Exception.FromUnknown(error);

        if (exc instanceof HandledException)
        {
            // eslint-disable-next-line no-console
            console.warn(exc);
        }
        else if (catcher)
        {
            await catcher(exc);
        }
        else
        {
            throw exc;
        }
    }

    public readonly exception: Exception;

    public constructor(exc: Exception, name = "HandledException")
    {
        super("The original exception has already been handled.");

        this.name = name;
        this.stack += `\nHandled ${exc.stack}`;

        this.exception = exc;
    }
}
