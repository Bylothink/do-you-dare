<template>
    <CenteredLayout id="home">
        <GameCard id="background-card" facedown />
        <h1 class="title">
            Do you Dare?
        </h1>
        <RouterLink v-slot="{ href, navigate }"
                    custom
                    :to="{ name: 'game' }">
            <AppButton id="play-now-btn"
                       large
                       title="Start a new game"
                       :href="href"
                       @click="navigate">
                Play now!
            </AppButton>
        </RouterLink>
        <AppButton id="game-modes-btn"
                   large
                   theme="secondary"
                   @click="underConstruction">
            Game modes
        </AppButton>
        <RoundButton id="settings-btn"
                     large
                     @click="underConstruction">
            <span class="fa-solid fa-cogs"></span>
        </RoundButton>
        <RouterLink v-slot="{ href, navigate }"
                    custom
                    :to="{ name: 'user' }">
            <RoundButton id="user-btn"
                         large
                         title="Go to your profile"
                         :href="href"
                         @click="navigate">
                <span class="fa-solid fa-user"></span>
            </RoundButton>
        </RouterLink>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { useVuert } from "@byloth/vuert";

    // import config from "@/config";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    import AppButton from "@/components/ui/AppButton.vue";
    import RoundButton from "@/components/ui/RoundButton.vue";
    import GameCard from "@/components/GameCard.vue";

    // const pages = config.pages.filter((page) => page.name !== "home");

    const vuert = useVuert();
    const underConstruction = () =>
    {
        vuert.emit({
            type: "info",
            icon: "screwdriver-wrench",
            title: "We still working on it!",
            message: "We're so sorry but, at the moment, this feature is not implemented yet.\n" +
                "Please, come back and try again later.\n\n" +
                "--\n" +
                `The "Do you Dare?" team. ❤`,
            dismissible: true
        });
    };
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    @keyframes slide-down
    {
        0%, 50% { transform: translateY(137px); }
        100% { transform: translateY(0px); }
    }

    @keyframes first-fade-in
    {
        0%, 50% { transform: translateY(-73px); }
        0%, 75% { opacity: 0; }
        100% { transform: translateY(0px); opacity: 1; }
    }
    @keyframes second-fade-in
    {
        0%, 50% { transform: translateY(-73px); }
        0%, 75% { opacity: 0; }
        100% { transform: translateY(0px); opacity: 1; }
    }

    @keyframes enter-right
    {
        0%, 75% { transform: translateX(200%); }
        100% { transform: translateX(0px); }
    }
    @keyframes enter-left
    {
        0%, 75% { transform: translateX(-200%); }
        100% { transform: translateX(0px); }
    }

    #home
    {
        overflow: hidden;
        position: relative;
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
