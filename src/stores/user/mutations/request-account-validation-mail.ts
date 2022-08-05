import gql from "graphql-tag";

import { GraphQLRequest } from "@/core";

export default class RequestAccountValidationMail extends GraphQLRequest<void, Record<string, never>>
{
    public static readonly Query = gql`mutation { requestAccountValidationMail }`;

    public jsonWebToken: string;

    public constructor(jsonWebToken: string)
    {
        super("user");

        this.jsonWebToken = jsonWebToken;
    }

    public execute(): Promise<void>
    {
        return this._mutation(RequestAccountValidationMail.Query, { }, { jsonWebToken: this.jsonWebToken });
    }
}
