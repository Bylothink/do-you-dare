<template>
    <main id="home-page">
        <Deck />
        <h1 class="title">
            Do you dare?
        </h1>
    </main>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import Deck from "@/components/Deck.vue";

    export default defineComponent({
        name: "HomePage",
        components: { Deck }
    });
</script>

<style lang="scss" scoped>
    @keyframes fade-in
    {
        0% { margin-bottom: -211px; opacity: 0; }
        50% { margin-bottom: -211px; }
        75% { opacity: 0; }
        100% { margin-bottom: 0px; opacity: 1; }
    }
    @keyframes slide-down
    {
        0% { margin-top: -211px; }
        50% { margin-top: -211px; }
        100% { margin-top: 0.5em; }
    }

    #home-page
    {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        overflow: hidden;

        & > .deck
        {
            animation: fade-in 2000ms ease-in-out;
        }
        & > .title
        {
            animation: slide-down 2000ms ease-in-out;
            font-size: 6.666em;
            font-weight: 100;
            margin: 0px;
            margin-top: 0.5em;
        }
    }
</style>
