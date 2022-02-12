import gql from "graphql-tag";
import { defineStore } from "pinia";

import Card, { CardData } from "@/models/card";

import { graphql } from "@/services";

import useUserStore from "./user";

const GAME_SCHEMA = "game";

const GET_ALL_CARDS = gql`query {
    allCards {
        id,
        text
    }
}`;
const GET_RANDOM_CARD = gql`query {
    getRandomCard {
        id,
        text
    }
}`;
const CREATE_DRAW = gql`mutation createDraw($cardId: Int!) {
    createDraw(cardId: $cardId) {
        result
    }
}`;

interface AllCardsResponse
{
    allCards: CardData[];
}
interface GetRandomCardResponse
{
    getRandomCard: CardData;
}

export default defineStore("game", {
    state: () => ({ }),

    getters: { },
    actions: {
        async getAllCards(): Promise<Card[]>
        {
            const userStore = useUserStore();
            const jwtToken = userStore.token;

            const response = await graphql.query<AllCardsResponse>(GAME_SCHEMA, GET_ALL_CARDS, { jwtToken });

            return response.allCards.map((card) => new Card(card));
        },
        async getRandomCard(): Promise<Card>
        {
            const userStore = useUserStore();
            const jwtToken = userStore.token;

            const response = await graphql.query<GetRandomCardResponse>(GAME_SCHEMA, GET_RANDOM_CARD, { jwtToken });
            const card = response.getRandomCard;

            return new Card(card);
        },
        async createDraw(cardId: number): Promise<void>
        {
            const userStore = useUserStore();
            const jwtToken = userStore.token;

            await graphql.mutation(GAME_SCHEMA, CREATE_DRAW, { cardId }, { jwtToken });
        }
    }
});
