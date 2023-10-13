import { defineStore } from "pinia";

import Card from "@/models/card";
import useUserStore from "@/stores/user";

import * as Mutations from "./mutations";
import * as Queries from "./queries";

export default defineStore("game", () =>
{
    async function cardDrawn(cardId: number): Promise<void>
    {
        const $user = useUserStore();

        const request = new Mutations.CardDrawn({ cardId }, $user.token);
        await request.execute();
    }
    async function getRandomCard(): Promise<Card>
    {
        const $user = useUserStore();

        const request = new Queries.RandomCard($user.token);
        const response = await request.execute();

        return new Card(response);
    }

    return { cardDrawn, getRandomCard };
});
