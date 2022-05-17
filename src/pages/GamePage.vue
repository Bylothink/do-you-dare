<template>
    <CenteredLayout id="game">
        <GameDeck :card="card"
                  @draw="createNewDraw"
                  @fold="getNewCard" />
        <h1 class="title">
            Do you Dare?
        </h1>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    import { HandledException } from "@/core/exceptions";
    import { Card } from "@/models";

    import useGameStore from "@/stores/game";

    import GameDeck from "@/components/GameDeck.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    const game = useGameStore();
    const card = ref<Card>();

    const getNewCard = async () =>
    {
        try
        {
            card.value = await game.getRandomCard();
        }
        catch (error)
        {
            const exc = HandledException.FromUnknown(error);

            if (exc instanceof HandledException)
            {
                // eslint-disable-next-line no-console
                console.warn(exc);
            }
            else
            {
                throw exc;
            }
        }
    };
    const createNewDraw = () =>
    {
        try
        {
            game.createDraw(card.value!.id);
        }
        catch (error)
        {
            const exc = HandledException.FromUnknown(error);

            if (exc instanceof HandledException)
            {
                // eslint-disable-next-line no-console
                console.warn(exc);
            }
            else
            {
                throw exc;
            }
        }
    };

    getNewCard();
</script>

<style lang="scss" scoped>
    #game
    {
        overflow: hidden;

        & > .title
        {
            font-size: 6.666em;
            font-weight: 100;
            margin: 0px;
            margin-top: 0.5em;
        }
    }
</style>
