import { GraphQLError } from "graphql";
import { GraphQLResponse } from "@/services/graphql";

import Exception from "./core";

export default class GraphQLException extends Exception
{
    public static PrintError(error: GraphQLError): string
    {
        let errorMessage = GraphQLError.prototype.toString.call(error).trim();

        if (!errorMessage.endsWith("."))
        {
            errorMessage += ".";
        }

        return errorMessage;
    }

    public constructor(response: GraphQLResponse)
    {
        let message: string;

        const errors = response.errors;
        if (errors)
        {
            if (errors.length > 1)
            {
                message = `Some errors occurred!`;

                for (const error of errors)
                {
                    message += `\n - ${GraphQLException.PrintError(error)}`;
                }
            }
            else
            {
                message = `${GraphQLException.PrintError(errors[0])}`;
            }
        }
        else
        {
            message = "An unknown error has occurred; the body of the response is empty.";
        }

        super(message, undefined, "GraphQLException");
    }
}
