<script lang="ts" setup>
    import { ref, onMounted } from "vue";

    import useGameStore from "@/stores/game";

    import GameDeck from "@/components/GameDeck.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    import type { Card } from "@/models";

    const $game = useGameStore();

    const card = ref<Card>();

    const getNewCard = async () =>
    {
        let newCard: Card | undefined = undefined;

        try
        {
            newCard = await $game.getRandomCard();
        }
        finally
        {
            card.value = newCard;
        }
    };
    const createNewDraw = async () =>
    {
        if (card.value)
        {
            await $game.cardDrawn(card.value.id);
        }
    };

    onMounted(getNewCard);
</script>

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
