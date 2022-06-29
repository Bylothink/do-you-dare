<template>
    <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
            <Component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
        </Transition>
    </RouterView>
    <AlertsHandler />
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";

    import { HandledException } from "./core/exceptions";

    import useUiStore from "./stores/ui";
    import useUserStore from "./stores/user";

    import AlertsHandler from "./components/handlers/AlertsHandler.vue";

    const ui = useUiStore();
    const user = useUserStore();

    const initialize = async () =>
    {
        if (user.hasAcceptedCookies === undefined)
        {
            ui.alert({
                type: "info",
                icon: "cookie-bite",
                title: "Cookie policy",
                message: "This website uses cookies to ensure you get the best experience on our website.",
                actions: [
                    {
                        type: "primary",
                        label: "Accept",
                        callback: () => user.acceptCookies(),
                        close: true
                    },
                    {
                        type: "secondary",
                        label: "Decline",
                        callback: () => user.declineCookies(),
                        close: true
                    },
                    {
                        type: "link",
                        label: "Learn more",
                        location: { name: "about" } // TODO: Dovrà rimandare alla pagina della cookie policy!
                    }
                ]
            });
        }

        if (user.isLogged)
        {
            try
            {
                await user.renewToken();
            }
            catch (error)
            {
                HandledException.CatchUnhandled(error);
            }
        }
    };

    onMounted(initialize);
</script>

<style lang="scss">
    @import "@/assets/scss/index";

    #app
    {
        height: 100%;

        & > .fade-enter-from,
        & > .fade-leave-to
        {
            opacity: 0;
        }
        & > .fade-enter-active,
        & > .fade-leave-active
        {
            transition: opacity 250ms;
        }
        & > .fade-enter-to,
        & > .fade-leave-from
        {
            opacity: 1;
        }
    }
</style>
