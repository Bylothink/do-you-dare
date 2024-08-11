<script lang="ts" setup>
    import { onMounted } from "vue";

    import { useVuert } from "@byloth/vuert";
    import type { BlockingCustomAlert } from "@byloth/vuert";

    import CookieAlert from "./components/alerts/CookieAlert.vue";
    import AlertHandler from "./components/handlers/AlertHandler.vue";

    import useUserStore from "./stores/user";

    const $vuert = useVuert();
    const $user = useUserStore();

    const _cookieAlert: BlockingCustomAlert<boolean> = {
        id: Symbol("[do-you-dare]: cookie-alert"),
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
    };

    onMounted(async () =>
    {
        if ($user.hasAcceptedCookies === undefined)
        {
            $vuert.emit(_cookieAlert)
                .then((result) =>
                {
                    if (result) { $user.acceptCookies(); }
                    else { $user.declineCookies(); }
                });
        }

        if ($user.isLogged) { $user.renewToken(); }
    });
</script>

<template>
    <RouterView v-slot="context">
        <Transition name="fade" mode="out-in">
            <Component :is="context.Component" :key="context.route.path" />
        </Transition>
    </RouterView>
    <AlertHandler />
</template>

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
