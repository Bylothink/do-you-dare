<template>
    <CenteredLayout id="sign-out">
        <h1>Successfully signed out</h1>
        <RouterLink v-slot="{ href, navigate }"
                    custom
                    :to="{ name: 'home' }">
            <AppButton large
                       title="Navigate back to the home page"
                       :href="href"
                       @click="navigate">
                Back to home
            </AppButton>
        </RouterLink>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    import AppButton from "@/components/ui/AppButton.vue";

    // TODO: Controllare se l'utente è loggato e, solo allora, disconnettere l'utente.
    //       In caso di utente non loggato, presentare un messaggio di errore.
    //

    const userStore = useUserStore();

    userStore.signOut();
</script>
