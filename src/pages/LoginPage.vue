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
    import axios from "axios";
    import gql from "graphql-tag";
    import { defineComponent, ref } from "vue";

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

                const response = await axios.post("http://localhost:8000/auth/", {
                    query: DO_LOGIN,
                    variables: {
                        username: username.value,
                        password: password.value
                    }
                });

                console.log(response);
            };

            return { username, password, onSubmit };
        }
    });
</script>

<style lang="scss" scoped>
</style>
