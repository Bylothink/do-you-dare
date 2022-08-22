<template>
    <RouterView v-slot="context">
        <Transition name="fade" mode="out-in">
            <Component :is="context.Component"
                       :key="context.route.meta.usePathKey ? context.route.path : undefined" />
        </Transition>
    </RouterView>
    <AlertsHandler />
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";

    import { useVuert } from "@byloth/vuert";

    import { HandledException } from "./core/exceptions";

    import useUserStore from "./stores/user";

    import CookieAlert from "./components/alerts/CookieAlert.vue";
    import AlertsHandler from "./components/handlers/AlertsHandler.vue";

    const vuert = useVuert();
    const user = useUserStore();

    const initialize = async () =>
    {
        if (user.hasAcceptedCookies === undefined)
        {
            const result = await vuert.emit({
                type: "info",
                component: CookieAlert,
                actions: [
                    {
                        id: "cookie-accepted",
                        type: "primary",
                        label: "Accept",
                        result: () => true
                    },
                    {
                        id: "cookie-declined",
                        type: "secondary",
                        label: "Decline",
                        result: () => false
                    }
                ]
            });

            console.log(result);

            // if (result)
            // {
            //     user.acceptCookies();
            // }
            // else
            // {
            //     user.declineCookies();
            // }
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
