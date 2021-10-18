<template>
    <CenteredLayout id="home-page" tag="main">
        <Card id="background-card" facedown />
        <h1 class="title">
            Do you dare?
        </h1>
        <RouterLink id="play-now-btn" :to="{'name': 'match'}">
            <button class="btn btn-primary btn-lg">
                Play now!
            </button>
        </RouterLink>
        <button id="game-modes-btn" class="btn btn-secondary btn-lg">
            Game modes
        </button>
        <RoundButton id="settings-btn" class="btn btn-primary btn-lg">
            <span class="fas fa-cogs"></span>
        </RoundButton>
        <RouterLink id="user-btn" :to="{'name': 'login'}">
            <RoundButton class="btn btn-primary btn-lg">
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
            font-size: 6.666em;
            font-weight: 100;
            margin: 0px;
            margin-bottom: 1em;
        }

        & > #background-card
        {
            $card-width: 350px;

            left: calc((100% - $card-width) / 4);
            position: absolute;
            width: $card-width;
            z-index: -1;
        }
        & > #play-now-btn
        {
            font-size: 2.5em;
            margin-bottom: 1em;
        }

        & > #settings-btn,
        & > #user-btn
        {
            font-size: 1.5em;
            padding: 1em 1.25em;
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
