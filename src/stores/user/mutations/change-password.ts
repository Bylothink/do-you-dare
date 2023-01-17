import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/core/index.js";

export interface ChangePasswordData
{
    token: string;
    newPassword: string;
}

export default class ChangePassword extends GraphQLRequest<void, ChangePasswordData> implements ChangePasswordData
{
    public static readonly Mutation = gql`mutation changePassword($token: String!, $newPassword: String!) {
        changePassword(token: $token, newPassword: $newPassword)
    }`;

    public token: string;
    public newPassword: string;

    public constructor({ token, newPassword }: ChangePasswordData)
    {
        super("user");

        this.token = token;
        this.newPassword = newPassword;
    }

    public execute(): Promise<void>
    {
        return this._mutation(ChangePassword.Mutation, {
            token: this.token,
            newPassword: this.newPassword
        });
    }
}
