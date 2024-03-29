import { gql } from "graphql-tag";

import type { UserData } from "@/models/user";
import { GraphQLRequest } from "@/services";

export interface AuthenticateData
{
    username: string;
    password: string;
}
export interface AuthenticateResponse
{
    token: string;
    user: UserData;
}
export default class Authenticate
    extends GraphQLRequest<{ authenticate: AuthenticateResponse }, AuthenticateData>
    implements AuthenticateData
{
    public static readonly Mutation = gql`mutation authenticate($username: String!, $password: String!) {
        authenticate(username: $username, password: $password) {
            token,
            user {
                id,
                isActive,
                username,
                email,
                firstName,
                lastName,
                dateJoined,
                lastLogin
            }
        }
    }`;

    public username: string;
    public password: string;

    public constructor({ username, password }: AuthenticateData)
    {
        super("user");

        this.username = username;
        this.password = password;
    }
    public async execute(): Promise<AuthenticateResponse>
    {
        const response = await this._mutation(Authenticate.Mutation, {
            username: this.username,
            password: this.password
        });

        return response.authenticate;
    }
}
