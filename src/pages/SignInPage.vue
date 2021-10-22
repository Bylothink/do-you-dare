<template>
    <CenteredLayout id="sign-in-page" tag="main">
        <h1>This is a sign in page</h1>
        <form @submit.prevent="onSubmit">
            <fieldset>
                <legend>Accedi</legend>
                <label>
                    Username:
                    <input v-model="username" type="text" />
                </label>
                <br />
                <label>
                    Password:
                    <input v-model="password" type="password" />
                </label>
                <hr />
                <button type="submit">
                    Vai
                </button>
            </fieldset>
        </form>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";

    import { useStore } from "@/store";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "SignInPage",
        components: { CenteredLayout },

        setup: () =>
        {
            const store = useStore();

            const username = ref("");
            const password = ref("");

            const onSubmit = () =>
            {
                store.dispatch("user/signIn", { username: username.value, password: password.value })
                    .then(() => alert("Login avvenuto con successo!"))
                    .catch(() => alert("Si è verificato un errore!"));
            };

            return { username, password, onSubmit };
        }
    });
</script>

<style lang="scss" scoped>
</style>
