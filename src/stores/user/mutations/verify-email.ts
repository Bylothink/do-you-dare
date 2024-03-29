import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/services";

export interface VerifyEmailData
{
    token: string;
}

export default class VerifyEmail extends GraphQLRequest<void, VerifyEmailData> implements VerifyEmailData
{
    public static readonly Mutation = gql`mutation verifyEmail($token: String!) {
        verifyEmail(token: $token)
    }`;

    public token: string;

    public constructor({ token }: VerifyEmailData)
    {
        super("user");

        this.token = token;
    }

    public execute(): Promise<void>
    {
        return this._mutation(VerifyEmail.Mutation, { token: this.token });
    }
}
