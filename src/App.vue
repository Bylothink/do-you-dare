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

    import { handle } from "@byloth/exceptions";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "./stores/user/index.js";

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
                icon: "cookie-bite",
                title: "Cookie policy",
                component: CookieAlert,
                actions: [
                    {
                        type: "primary",
                        label: "Accept",
                        callback: () => true
                    },
                    {
                        type: "secondary",
                        label: "Decline",
                        callback: () => false
                    }
                ]
            });

            if (result)
            {
                user.acceptCookies();
            }
            else
            {
                user.declineCookies();
            }
        }

        if (user.isLogged)
        {
            try
            {
                user.renewToken();
            }
            catch (error)
            {
                handle(error);
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
