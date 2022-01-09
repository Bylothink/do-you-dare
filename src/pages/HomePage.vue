<template>
    <CenteredLayout id="home-page">
        <GameCard id="background-card" facedown />
        <h1 class="title">
            Do you dare?
        </h1>
        <RouterLink id="play-now-btn"
                    class="btn btn-primary btn-lg"
                    :to="{ name: 'game' }">
            Play now!
        </RouterLink>
        <button id="game-modes-btn"
                class="btn btn-secondary btn-lg"
                @click="pushAlert">
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

<script lang="ts" setup>
    // import config from "@/config";
    import useUiStore from "@/stores/ui";

    import { ActionOptions } from "@/core/types";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    import RoundButton from "@/components/ui/RoundButton.vue";
    import GameCard from "@/components/GameCard.vue";

    // const pages = config.pages.filter((page) => page.name !== "index");

    const store = useUiStore();

    let number = 0;
    const pushAlert = () =>
    {
        if (import.meta.env.DEV)
        {
            // TODO: Delete this things...
            //

            const typeId = Math.floor(Math.random() * 4);
            const type = ["danger", "warning", "success", "info"][typeId];
            const icon = ["times-circle", "exclamation-circle", "check-circle", "info-circle"][typeId];

            let dismissable = true;
            let timeout: number | undefined;
            let actions: ActionOptions[] | undefined;

            if (Math.floor(Math.random() * 2))
            {
                dismissable = false;
                timeout = Math.floor(Math.random() * 3000) + 1000;
            }
            else
            {
                actions = [
                    {
                        type: "primary",
                        label: "OK",
                        callback: (done) =>
                        {
                            console.log(`"OK" clicked!`, this);

                            done();
                        }
                    },
                    {
                        type: "secondary",
                        label: "Cancel",
                        callback: function(done)
                        {
                            console.log(`"Cancel" clicked!`, this);

                            done();
                        }
                    },
                    {
                        type: "link",
                        label: "Play!",
                        location: { name: "game" }
                    }
                ];
            }

            number += 1;

            store.alert({
                type: type as "danger" | "warning" | "success" | "info",
                icon: icon,
                title: Math.floor(Math.random() * 2) ? `Prova #${number}!` : undefined,
                message: "Questo è un messaggio di prova.",
                actions: actions,
                dismissable: dismissable,
                timeout: timeout
            });
        }
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
