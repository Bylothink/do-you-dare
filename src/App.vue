<template>
    <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
            <Component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
        </Transition>
    </RouterView>
</template>

<style lang="scss">
    @import "@/assets/scss/index";

    #app
    {
        height: 100%;

        .fade-enter-from,
        .fade-leave-to
        {
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active
        {
            transition: opacity 250ms;
        }
        .fade-enter-to,
        .fade-leave-from
        {
            opacity: 1;
        }
    }
</style>
