import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/services";

export default class RequestAccountValidationEmail extends GraphQLRequest<void, Record<string, never>>
{
    public static readonly Mutation = gql`mutation { requestAccountValidationEmail }`;

    public jsonWebToken: string;

    public constructor(jsonWebToken: string)
    {
        super("user");

        this.jsonWebToken = jsonWebToken;
    }

    public execute(): Promise<void>
    {
        return this._mutation(RequestAccountValidationEmail.Mutation, { }, { jsonWebToken: this.jsonWebToken });
    }
}
