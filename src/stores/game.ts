import gql from "graphql-tag";
import { defineStore } from "pinia";

import Card, { CardData } from "@/models/card";

import { graphql } from "@/services";

import useUserStore from "./user";

const GAME_SCHEMA = "game";

const ALL_CARDS = gql`query {
    allCards {
        id,
        text
    }
}`;
const RANDOM_CARD = gql`query {
    randomCard {
        id,
        text
    }
}`;
const CARD_DRAWN = gql`mutation cardDrawn($cardId: Int!) {
    cardDrawn(cardId: $cardId)
}`;

interface AllCardsResponse
{
    allCards: CardData[];
}
interface RandomCardResponse
{
    randomCard: CardData;
}

export default defineStore("game", {
    state: () => ({ }),

    getters: { },
    actions: {
        async getAllCards(): Promise<Card[]>
        {
            const user = useUserStore();
            const jsonWebToken = user.token;

            const response = await graphql.query<AllCardsResponse>(GAME_SCHEMA, ALL_CARDS, { jsonWebToken });

            return response.allCards.map((card) => new Card(card));
        },
        async getRandomCard(): Promise<Card>
        {
            const user = useUserStore();
            const jsonWebToken = user.token;

            const response = await graphql.query<RandomCardResponse>(GAME_SCHEMA, RANDOM_CARD, { jsonWebToken });

            const card = response.randomCard;

            return new Card(card);
        },
        async cardDrawn(cardId: number): Promise<void>
        {
            const user = useUserStore();
            const jsonWebToken = user.token;

            await graphql.mutation(GAME_SCHEMA, CARD_DRAWN, { cardId },
                { jsonWebToken });
        }
    }
});
