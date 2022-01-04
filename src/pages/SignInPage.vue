<template>
    <CenteredLayout id="sign-in-page">
        <h1>Do you dare?</h1>
        <h3 class="mb-4">
            Sign in
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <div class="form-row">
                <label for="username" class="form-cell col-form-label col-form-label-lg">Nome utente</label>
                <div class="form-cell">
                    <input id="username"
                           v-model="username"
                           class="form-control form-control-lg mb-3"
                           type="text"
                           autocomplete="username"
                           required />
                </div>
            </div>
            <div class="form-row">
                <label for="password" class="form-cell col-form-label col-form-label-lg">Password</label>
                <div class="form-cell">
                    <input id="password"
                           v-model="password"
                           class="form-control form-control-lg mb-3"
                           type="password"
                           autocomplete="current-password"
                           required />
                </div>
            </div>
            <div class="form-row">
                <span></span>
                <div class="form-cell">
                    <hr />
                    <button class="form-control form-control-lg btn btn-primary" type="submit">
                        <span class="fas fa-key"></span>
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    const userStore = useUserStore();

    const username = ref("");
    const password = ref("");

    const onSubmit = (): void =>
    {
        const signInPayload = {
            username: username.value,
            password: password.value
        };

        userStore.signIn(signInPayload)
            .then(() => alert("Login avvenuto con successo!"))
            .catch((exc) =>
            {
                // eslint-disable-next-line no-console
                console.error(exc);

                alert("Si è verificato un errore!");
            });
    };
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    #sign-in-page
    {
        @media (max-width: variables.$max-mobile-size)
        {
            & > .form-table > .form-row > .form-cell
            {
                & > hr
                {
                    margin-top: 2em;
                }
            }
        }
    }
</style>
