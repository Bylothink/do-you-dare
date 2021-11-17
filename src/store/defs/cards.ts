import gql from "graphql-tag";
import { ActionContext } from "vuex";

import Card, { CardData } from "@/models/card";
import Draw, { DrawData } from "@/models/draw";

import { graphql } from "@/services";

import { RootState, CardsState, DrawState } from "./types";

const GET_ALL_CARDS = gql`query {
    allCards {
        id,
        text
    }
}`;
const GET_RANDOM_CARD = gql`query {
    getRandomOne {
        id,
        text
    }
}`;
const CREATE_DRAW = gql`mutation createDraw($cardId: Int!) {
    createDraw(cardId: $cardId) {
      draw {
        card {
          text
        },
        user {
          id,
          firstName,
          lastName,
          username,
          email,
          dateJoined,
          lastLogin
        },
        createDate
      }
    }
  }`;

interface AllCardsResponse
{
    allCards: CardData[];
}
interface GetRandomOneResponse
{
    getRandomOne: CardData;
}
interface CreateDrawResponse
{
    createDraw: DrawData;
}

export default {
    namespaced: true,

    state: (): CardsState => ({ }),

    getters: { },
    mutations: { },
    actions: {
        async getAll({ commit, rootState }: ActionContext<CardsState, RootState>): Promise<Card[]>
        {
            const jwtToken = rootState.user.token;
            const response = await graphql.query<AllCardsResponse>("cards", GET_ALL_CARDS, { jwtToken });

            return response.allCards.map((card) => new Card(card));
        },
        async getRandomOne({ commit, rootState }: ActionContext<CardsState, RootState>): Promise<Card>
        {
            const jwtToken = rootState.user.token;
            const response = await graphql.query<GetRandomOneResponse>("cards", GET_RANDOM_CARD, { jwtToken });
            const card = response.getRandomOne;

            return new Card(card);
        },
        async createDraw({ commit, rootState }: ActionContext<DrawState, RootState>, cardId: number): Promise<Draw>
        {
            const jwtToken = rootState.user.token;
            const response = await graphql.mutation<CreateDrawResponse>("cards", CREATE_DRAW, { cardId }, { jwtToken });
            const draw = response.createDraw;

            return new Draw(draw);
        }
    }
};
