<template>
    <CenteredLayout id="game-page">
        <Deck :card="card"
              @draw="createNewDraw"
              @fold="getNewCard" />
        <h1 class="title">
            Do you dare?
        </h1>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";

    import { Card } from "@/models";
    import { useStore } from "@/store";

    import Deck from "@/components/Deck.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "GamePage",
        components: { CenteredLayout, Deck },

        setup: () =>
        {
            const store = useStore();
            const card = ref<Card>();

            const getNewCard = async () =>
            {
                card.value = await store.dispatch("game/getRandomCard");
            };
            const createNewDraw = () => store.dispatch("game/createDraw", card.value!.id);

            getNewCard();

            return { card, getNewCard, createNewDraw };
        }
    });
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
