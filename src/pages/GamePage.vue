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
            HandledException.CatchUnhandled(error);
        }
    };
    const createNewDraw = async () =>
    {
        try
        {
            await game.cardDrawn(card.value!.id);
        }
        catch (error)
        {
            HandledException.CatchUnhandled(error);
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
