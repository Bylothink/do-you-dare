<template>
    <CenteredLayout id="game-page">
        <GameDeck :card="card"
                  @draw="createNewDraw"
                  @fold="getNewCard" />
        <h1 class="title">
            Do you dare?
        </h1>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    import { Card } from "@/models";
    import { useStore } from "@/store";

    import GameDeck from "@/components/GameDeck.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    const store = useStore();
    const card = ref<Card>();

    const getNewCard = async () =>
    {
        card.value = await store.dispatch("game/getRandomCard");
    };
    const createNewDraw = () => store.dispatch("game/createDraw", card.value!.id);

    getNewCard();
</script>

<style lang="scss" scoped>
    #game-page
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
