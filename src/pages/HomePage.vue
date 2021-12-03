<template>
    <CenteredLayout id="home-page">
        <Card id="background-card" facedown />
        <h1 class="title">
            Do you dare?
        </h1>
        <RouterLink id="play-now-btn"
                    class="btn btn-primary btn-lg"
                    :to="{ name: 'game' }">
            Play now!
        </RouterLink>
        <button id="game-modes-btn" class="btn btn-secondary btn-lg">
            Game modes
        </button>
        <RoundButton id="settings-btn" class="btn btn-primary btn-lg">
            <span class="fas fa-cogs"></span>
        </RoundButton>
        <RouterLink v-slot="{ href, navigate }"
                    custom
                    :to="{ name: 'sign-in' }">
            <RoundButton id="user-btn"
                         class="btn btn-primary btn-lg"
                         :href="href"
                         @click="navigate">
                <span class="fas fa-user"></span>
            </RoundButton>
        </RouterLink>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import config, { PageOptions } from "@/config";

    import RoundButton from "@/components/ui/RoundButton.vue";
    import Card from "@/components/Card.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "HomePage",
        components: { Card, CenteredLayout, RoundButton },

        setup: () =>
        {
            const pages: PageOptions[] = config.pages.filter((page) => page.name !== "index");

            return { pages };
        }
    });
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    @keyframes slide-down
    {
        0% { transform: translateY(137px); }
        50% { transform: translateY(137px); }
        100% { transform: translateY(0px); }
    }

    @keyframes first-fade-in
    {
        0% { transform: translateY(-73px); opacity: 0; }
        50% { transform: translateY(-73px); }
        75% { opacity: 0; }
        100% { transform: translateY(0px); opacity: 1; }
    }
    @keyframes second-fade-in
    {
        0% { transform: translateY(-73px); opacity: 0; }
        50% { transform: translateY(-73px); }
        75% { opacity: 0; }
        100% { transform: translateY(0px); opacity: 1; }
    }

    @keyframes enter-right
    {
        0% { transform: translateX(200%); }
        75% { transform: translateX(200%); }
        100% { transform: translateX(0px); }
    }
    @keyframes enter-left
    {
        0% { transform: translateX(-200%); }
        75% { transform: translateX(-200%); }
        100% { transform: translateX(0px); }
    }

    #home-page
    {
        overflow: hidden;
        text-align: center;

        & > ul
        {
            font-size: 2em;
            list-style-type: none;
            margin: 0px;
            padding: 0px;

            & > li
            {
                margin: 1em 0px;
            }
        }

        & > .title
        {
            animation: slide-down 2000ms ease-in-out;
            font-size: 6.666em;
            font-weight: 100;
            margin: 0px;
            margin-bottom: 1em;
        }

        & > #background-card
        {
            left: calc((100% - #{variables.$card-width}) / 4);
            position: absolute;
            width: variables.$card-width;
            z-index: -1;
        }
        & > #play-now-btn
        {
            animation: first-fade-in 2000ms ease-in-out;
            font-size: 2.5em;
            margin-bottom: 1em;
        }
        & > #game-modes-btn
        {
            animation: second-fade-in 2200ms ease-in-out;
        }

        & > #settings-btn,
        & > #user-btn
        {
            font-size: 2.5em;
            position: absolute;
            top: 1em;
        }
        & > #settings-btn
        {
            animation: enter-left 2600ms ease-in-out;
            left: 1em;
        }
        & > #user-btn
        {
            animation: enter-right 2400ms ease-in-out;
            right: 1em;
        }
    }
</style>
