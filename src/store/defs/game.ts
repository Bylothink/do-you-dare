import gql from "graphql-tag";
import { ActionContext } from "vuex";

import Card, { CardData } from "@/models/card";
import Draw, { DrawData } from "@/models/draw";

import { graphql } from "@/services";

import { RootState, GameState, DrawState } from "./types";

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
      draw {
        card {
          id
        },
        user {
          id
        },
        createDate
      }
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
interface CreateDrawResponse
{
    createDraw: DrawData;
}

export default {
    namespaced: true,

    state: (): GameState => ({ }),

    getters: { },
    mutations: { },
    actions: {
        async getAllCards({ commit, rootState }: ActionContext<GameState, RootState>): Promise<Card[]>
        {
            const jwtToken = rootState.user.token;
            const response = await graphql.query<AllCardsResponse>(GAME_SCHEMA, GET_ALL_CARDS, { jwtToken });

            return response.allCards.map((card) => new Card(card));
        },
        async getRandomCard({ commit, rootState }: ActionContext<GameState, RootState>): Promise<Card>
        {
            const jwtToken = rootState.user.token;
            const response = await graphql.query<GetRandomCardResponse>(GAME_SCHEMA, GET_RANDOM_CARD, { jwtToken });
            const card = response.getRandomCard;

            return new Card(card);
        },
        async createDraw({ commit, rootState }: ActionContext<DrawState, RootState>, cardId: number): Promise<Draw>
        {
            const jwtToken = rootState.user.token;
            const response = await graphql.mutation<CreateDrawResponse>(
                GAME_SCHEMA,
                CREATE_DRAW,
                { cardId },
                { jwtToken }
            );

            const draw = response.createDraw;

            return new Draw(draw);
        }
    }
};
