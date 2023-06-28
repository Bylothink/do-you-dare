import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/services";

export interface RandomCardResponse
{
    id: number;
    text: string;
}
export default class RandomCard extends GraphQLRequest<{ randomCard: RandomCardResponse }>
{
    public static readonly Query = gql`query {
        randomCard {
            id,
            text
        }
    }`;

    public jsonWebToken?: string;

    public constructor(jsonWebToken?: string)
    {
        super("game");

        this.jsonWebToken = jsonWebToken;
    }

    public async execute(): Promise<RandomCardResponse>
    {
        const response = await this._query(RandomCard.Query, { jsonWebToken: this.jsonWebToken });

        return response.randomCard;
    }
}
