import { gql } from "graphql-tag";

import type { UserData } from "@/models/user";
import { GraphQLRequest } from "@/services";

export interface RenewSessionResponse
{
    token: string;
    user: UserData;
}
export default class RenewSession extends GraphQLRequest<{ renewSession: RenewSessionResponse }, Record<string, never>>
{
    public static readonly Mutation = gql`mutation {
        renewSession {
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

    public jsonWebToken: string;

    public constructor(jsonWebToken: string)
    {
        super("user");

        this.jsonWebToken = jsonWebToken;
    }

    public async execute(): Promise<RenewSessionResponse>
    {
        const response = await this._mutation(RenewSession.Mutation, { }, { jsonWebToken: this.jsonWebToken });

        return response.renewSession;
    }
}
