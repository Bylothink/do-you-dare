<template>
    <CenteredLayout id="login-page" tag="main">
        <h1>This is a login page</h1>
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
    import gql from "graphql-tag";
    import { defineComponent, ref } from "vue";

    import { graphql } from "@/services";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "LoginPage",
        components: { CenteredLayout },

        setup: () =>
        {
            const username = ref("");
            const password = ref("");

            const onSubmit = async () =>
            {
                const DO_LOGIN = gql`
                    mutation tokenAuth($username: String!, $password: String!) {
                        tokenAuth(username: $username, password: $password) {
                            token
                        }
                    }`;

                // SMELLS: Rimuovere questa definizione hard-coded del tipo di risposta
                //          e definire una nuova interfaccia apposita.
                //
                const response = await graphql.mutation<{ tokenAuth: { token: string } }>("auth", DO_LOGIN, {
                    username: username.value,
                    password: password.value
                });

                // TODO: Implementare il login tramite lo store di Vuex e le actions.
                //
                // <vuex>.user.login(username, password);
                //
            };

            return { username, password, onSubmit };
        }
    });
</script>

<style lang="scss" scoped>
</style>
