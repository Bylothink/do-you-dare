<template>
    <CenteredLayout id="home-page">
        <Card id="background-card" facedown />
        <h1 class="title">
            Do you dare?
        </h1>
        <RouterLink id="play-now-btn"
                    class="btn btn-primary btn-lg"
                    :to="{ name: 'match' }">
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
                    :to="{ name: 'sign-up' }">
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
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');

    #home-page
    {
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
            font-size: 7vw;
            font-family: "Caveat", Helvetica, Arial, Verdana, sans-serif;
            font-style: italic;
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
            font-size: 3vw;
            font-family: "Roboto Mono", 'Times New Roman', Times, serif;
            margin-bottom: 1em;
        }

        & > #game-modes-btn
        {
            font-size: 2vw;
            font-family: "Roboto Mono", 'Times New Roman', Times, serif;
            margin-bottom: 1em;
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
            left: 1em;
        }
        & > #user-btn
        {
            right: 1em;
        }
    }
</style>
