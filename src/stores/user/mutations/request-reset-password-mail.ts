import gql from "graphql-tag";

import { GraphQLRequest } from "@/core";

export interface RequestResetPasswordMailData
{
    email: string;
}

export default class RequestResetPasswordMail
    extends GraphQLRequest<void, RequestResetPasswordMailData>
    implements RequestResetPasswordMailData
{
    public static readonly Query = gql`mutation requestResetPasswordMail($email: String!) {
        requestResetPasswordMail(email: $email)
    }`;

    public email: string;

    public constructor({ email }: RequestResetPasswordMailData)
    {
        super("user");

        this.email = email;
    }

    public execute(): Promise<void>
    {
        return this._mutation(RequestResetPasswordMail.Query, { email: this.email });
    }
}
