import gql from "graphql-tag";
import { ActionContext } from "vuex";

import { Card } from "@/models";
import { graphql } from "@/services";

import { RootState, CardsState } from "./types";

const GET_ALL_CARDS = gql`query {
    allCards {
        text
    }
}`;
const GET_RANDOM_CARD = gql`query {
    getRandomOne {
        text
    }
}`;

interface AllCardsResponse
{
    allCards: Card[];
}
interface GetRandomOneResponse
{
    getRandomOne: Card;
}

export default {
    namespaced: true,

    state: (): CardsState => ({ }),

    getters: { },
    mutations: { },
    actions: {
        async getAll({ commit }: ActionContext<CardsState, RootState>): Promise<Card[]>
        {
            const response = await graphql.query<AllCardsResponse>("cards", GET_ALL_CARDS);

            return response.allCards.map((card) => new Card(card.text));
        },
        async getRandomOne({ commit }: ActionContext<CardsState, RootState>): Promise<Card>
        {
            const response = await graphql.query<GetRandomOneResponse>("cards", GET_RANDOM_CARD);

            return new Card(response.getRandomOne.text);
        }
    }
};
