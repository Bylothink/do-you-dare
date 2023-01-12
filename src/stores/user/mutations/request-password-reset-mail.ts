import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/core/index.js";

export interface RequestPasswordResetMailData
{
    email: string;
}

export default class RequestPasswordResetMail
    extends GraphQLRequest<void, RequestPasswordResetMailData>
    implements RequestPasswordResetMailData
{
    public static readonly Query = gql`mutation requestPasswordResetMail($email: String!) {
        requestPasswordResetMail(email: $email)
    }`;

    public email: string;

    public constructor({ email }: RequestPasswordResetMailData)
    {
        super("user");

        this.email = email;
    }

    public execute(): Promise<void>
    {
        return this._mutation(RequestPasswordResetMail.Query, { email: this.email });
    }
}
