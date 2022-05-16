<template>
    <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
            <Component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
        </Transition>
    </RouterView>
    <AlertsHandler />
</template>

<script lang="ts" setup>
    import { NetworkException } from "./core/exceptions";

    import useUiStore from "./stores/ui";
    import useUserStore from "./stores/user";

    import AlertsHandler from "./components/handlers/AlertsHandler.vue";

    const ui = useUiStore();
    const user = useUserStore();

    const onCreated = () =>
    {
        if (user.isLogged)
        {
            user.newSession()
                .catch((reason) =>
                {
                    const exc = NetworkException.FromUnknown(reason);

                    if (exc instanceof NetworkException)
                    {
                        ui.alert({
                            type: "danger",
                            icon: "link-slash",
                            title: "Network error!",
                            message: exc.message,
                            dismissable: true
                        });

                        // eslint-disable-next-line no-console
                        console.error(exc);
                    }
                    else
                    {
                        throw exc;
                    }
                });
        }
    };

    onCreated();
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
