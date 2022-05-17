<template>
    <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
            <Component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
        </Transition>
    </RouterView>
    <AlertsHandler />
</template>

<script lang="ts" setup>
    import { HandledException } from "./core/exceptions";

    import useUserStore from "./stores/user";

    import AlertsHandler from "./components/handlers/AlertsHandler.vue";

    const user = useUserStore();

    const initialize = async () =>
    {
        if (user.isLogged)
        {
            try
            {
                await user.renewToken();
            }
            catch (error)
            {
                const exc = HandledException.FromUnknown(error);

                if (exc instanceof HandledException)
                {
                    // eslint-disable-next-line no-console
                    console.warn(exc);
                }
                else
                {
                    throw exc;
                }
            }
        }
    };

    initialize();
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
