import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/core/index.js";

export interface RenewSessionResponse
{
    token: string;
    user: {
        id: number;
        isActive: boolean;
        username: string;
        email: string;
    };
}
export default class RenewSession extends GraphQLRequest<{ renewSession: RenewSessionResponse }, Record<string,never>>
{
    public static readonly Query = gql`mutation {
        renewSession {
            token,
            user {
                id,
                isActive,
                username,
                email
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
        const response = await this._mutation(RenewSession.Query, { }, { jsonWebToken: this.jsonWebToken });

        return response.renewSession;
    }
}
