/* eslint-disable camelcase */
<template>
    <CenteredLayout id="sign-up-page" tag="main">
        <h1>This is a sign up page</h1>
        <form @submit.prevent="onSubmit">
            <fieldset>
                <legend>Registrati</legend>
                <label>
                    Nome:
                    <input v-model="firstName" type="text" />
                </label>
                <br />
                <label>
                    Cognome:
                    <input v-model="lastName" type="text" />
                </label>
                <br />
                <label>
                    Username:
                    <input v-model="username" type="text" />
                </label>
                <br />
                <label>
                    Email:
                    <input v-model="email" type="text" />
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
        name: "SignUpPage",
        components: { CenteredLayout },

        setup: () =>
        {
            const store = useStore();

            const firstName = ref("");
            const lastName = ref("");
            const username = ref("");
            const password = ref("");
            const email = ref("");

            const onSubmit = () =>
            {
                store.dispatch("user/signUp", { firstName: firstName.value, lastName: lastName.value, username: username.value, password: password.value, email: email.value })
                    .then((user) => console.log(user))
                    .catch((exc) => alert((exc as Error).message));
            };

            return { firstName, lastName, username, password, email, onSubmit };
        }
    });
</script>

<style lang="scss" scoped>
</style>
