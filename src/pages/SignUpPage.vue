/* eslint-disable camelcase */
<template>
    <CenteredLayout id="sign-up-page" tag="main">
        <h1>Do you dare?</h1>
        <form @submit.prevent="onSubmit">
            <fieldset>
                <legend>Registrati</legend>
                <div class="row mb-3">
                    <label for="fName" class="col-sm-3 col-form-label col-form-label-lg">Nome</label>
                    <div class="col-sm-9">
                        <input id="fName"
                               v-model="firstName"
                               type="text"
                               class="form-control form-control-lg"
                               required />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="lName" class="col-sm-3 col-form-label col-form-label-lg">Cognome</label>
                    <div class="col-sm-9">
                        <input id="lName"
                               v-model="lastName"
                               type="text"
                               class="form-control form-control-lg"
                               required />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="user" class="col-sm-3 col-form-label col-form-label-lg">Username</label>
                    <div class="col-sm-9">
                        <input id="user"
                               v-model="username"
                               type="text"
                               class="form-control form-control-lg"
                               required />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="userEmail" class="col-sm-3 col-form-label col-form-label-lg">Email</label>
                    <div class="col-sm-9">
                        <input id="userEmail"
                               v-model="email"
                               type="email"
                               class="form-control form-control-lg"
                               required />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="pw" class="col-sm-3 col-form-label col-form-label-lg">Password</label>
                    <div class="col-sm-9">
                        <input id="pw"
                               v-model="password"
                               type="password"
                               class="form-control form-control-lg"
                               required />
                    </div>
                </div>
                <hr />
                <div class="row mb-3 mt-4">
                    <div class="col-sm-9 offset-sm-3">
                        <button class="form control form-control-lg btn btn-primary" type="submit">
                            Conferma
                        </button>
                    </div>
                </div>
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
    #sing-up-page
    {
        .btn.btn-primary
        {
            width: 100%;
        }
    }
</style>
