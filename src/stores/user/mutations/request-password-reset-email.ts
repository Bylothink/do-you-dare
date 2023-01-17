import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/core/index.js";

export interface RequestPasswordResetEmailData
{
    email: string;
}

export default class RequestPasswordResetEmail
    extends GraphQLRequest<void, RequestPasswordResetEmailData>
    implements RequestPasswordResetEmailData
{
    public static readonly Mutation = gql`mutation requestPasswordResetEmail($email: String!) {
        requestPasswordResetEmail(email: $email)
    }`;

    public email: string;

    public constructor({ email }: RequestPasswordResetEmailData)
    {
        super("user");

        this.email = email;
    }

    public execute(): Promise<void>
    {
        return this._mutation(RequestPasswordResetEmail.Mutation, { email: this.email });
    }
}
