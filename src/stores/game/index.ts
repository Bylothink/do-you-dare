import { defineStore } from "pinia";

import Card from "@/models/card.js";

import useUserStore from "../user/index.js";
import * as Mutations from "./mutations/index.js";
import * as Queries from "./queries/index.js";

export default defineStore("game", {
    state: () => ({ }),

    getters: { },
    actions: {
        async getRandomCard(): Promise<Card>
        {
            const user = useUserStore();

            const request = new Queries.RandomCard(user.token);
            const response = await request.execute();

            return new Card(response);
        },
        cardDrawn(cardId: number): Promise<void>
        {
            const user = useUserStore();

            const request = new Mutations.CardDrawn({ cardId }, user.token);

            return request.execute();
        }
    }
});
