import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/core/index.js";

export default class RequestAccountValidationEmail extends GraphQLRequest<void, Record<string, never>>
{
    public static readonly Query = gql`mutation { requestAccountValidationEmail }`;

    public jsonWebToken: string;

    public constructor(jsonWebToken: string)
    {
        super("user");

        this.jsonWebToken = jsonWebToken;
    }

    public execute(): Promise<void>
    {
        return this._mutation(RequestAccountValidationEmail.Query, { }, { jsonWebToken: this.jsonWebToken });
    }
}
