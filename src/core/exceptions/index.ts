import Exception from "./core";
import GraphQLException from "./graphql";

export class NetworkException extends Exception
{
    public constructor(message: string, cause?: unknown)
    {
        super(message, cause, "NetworkException");
    }
}
export class ValueException extends Exception
{
    public constructor(message: string, cause?: unknown)
    {
        super(message, cause, "ValueException");
    }
}

export { GraphQLException };
export default Exception;
