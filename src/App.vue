<template>
    <RouterView v-slot="context">
        <Transition name="fade" mode="out-in">
            <Component :is="context.Component" :key="context.route.path" />
        </Transition>
    </RouterView>
    <AlertsHandler />
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";
    import { useVuert } from "@byloth/vuert";

    import CookieAlert from "./components/alerts/CookieAlert.vue";
    import AlertsHandler from "./components/handlers/AlertsHandler.vue";

    import useUserStore from "./stores/user";

    const $vuert = useVuert();
    const $user = useUserStore();

    onMounted(async () =>
    {
        if ($user.hasAcceptedCookies === undefined)
        {
            const result = await $vuert.emit({
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
                $user.acceptCookies();
            }
            else
            {
                $user.declineCookies();
            }
        }

        if ($user.isLogged) { $user.renewToken(); }
    });
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
            transition: opacity 250ms linear;
        }
        & > .fade-enter-to,
        & > .fade-leave-from
        {
            opacity: 1;
        }
    }
</style>
