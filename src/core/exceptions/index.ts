import type { GraphQLError } from "graphql";
import GraphQLException from "./graphql.js";

export class AuthenticationException extends GraphQLException
{
    public readonly forceLogout: boolean;

    public constructor(error: GraphQLError, message?: string, name = "AuthenticationException")
    {
        super(error, message, name);

        const { force_logout } = error.extensions;
        this.forceLogout = force_logout as boolean ?? false;
    }
}
export class AuthorizationException extends GraphQLException
{
    public readonly gotoLogin: boolean;

    public constructor(error: GraphQLError, message?: string, name = "AuthorizationException")
    {
        super(error, message, name);

        const { goto_login } = error.extensions;
        this.gotoLogin = goto_login as boolean ?? false;
    }
}
export class TooManyRequestsException extends GraphQLException
{
    public readonly waitingTime: number;

    public constructor(error: GraphQLError, message?: string, name = "TooManyRequestsException")
    {
        super(error, message, name);

        const { waiting_time } = error.extensions;
        this.waitingTime = waiting_time as number ?? false;
    }
}
export class ValidationException extends GraphQLException
{
    public readonly fields: Record<string, string>;

    public constructor(error: GraphQLError, message?: string, name = "ValidationException")
    {
        super(error, message, name);

        const { fields } = error.extensions;
        this.fields = fields as Record<string, string> ?? { };
    }
}

export { GraphQLException };
