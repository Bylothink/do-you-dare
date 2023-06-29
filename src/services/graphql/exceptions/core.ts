import type { GraphQLError } from "graphql";
import { Exception } from "@byloth/exceptions";

const PUNCTUATION_REGEX = /[.!?()]$/;

export default class GraphQLException extends Exception
{
    public static PrintError({ message }: GraphQLError): string
    {
        if (!PUNCTUATION_REGEX.test(message))
        {
            message += ".";
        }

        return message;
    }

    public readonly id: string;
    public readonly code: string;
    public readonly type: string;

    public constructor(error: GraphQLError, message?: string, name = "GraphQLException")
    {
        if (message === undefined)
        {
            message = GraphQLException.PrintError(error);
        }

        super(message, undefined, name);

        const { error_id, error_code, error_type } = error.extensions ?? { };
        this.id = error_id as string ?? "0x00000000";
        this.code = error_code as string ?? "UNKNOWN_SERVER_ERROR";
        this.type = error_type as string ?? "ERROR";
    }
}
