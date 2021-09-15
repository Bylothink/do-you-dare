import { printError } from "graphql";
import { GraphQLResponse } from "@/services/graphql";

import Exception from "./core";

export default class GraphQLException extends Exception
{
    public constructor(response: GraphQLResponse)
    {
        let message: string;

        const errors = response.errors;
        if (errors)
        {
            if (errors.length > 1)
            {
                message = `Some errors occurred:`;

                for (const error of errors)
                {
                    message += `\n - ${printError(error)}.`;
                }
            }
            else
            {
                message = `${printError(errors[0])}.`;
            }
        }
        else
        {
            message = "An unknown error has occurred; the body of the response is empty.";
        }

        super(message);
    }
}
