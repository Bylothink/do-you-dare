import { gql } from "graphql-tag";

import { GraphQLRequest } from "@/core/index.js";

export interface CardDrawnData
{
    cardId: number;
}

export default class CardDrawn extends GraphQLRequest<void, CardDrawnData> implements CardDrawnData
{
    public static readonly Query = gql`mutation cardDrawn($cardId: Int!) {
        cardDrawn(cardId: $cardId)
    }`;

    public cardId: number;
    public jsonWebToken?: string;

    public constructor({ cardId }: CardDrawnData, jsonWebToken?: string)
    {
        super("game");

        this.cardId = cardId;
        this.jsonWebToken = jsonWebToken;
    }

    public execute(): Promise<void>
    {
        return this._mutation(CardDrawn.Query, { cardId: this.cardId }, { jsonWebToken: this.jsonWebToken });
    }
}
