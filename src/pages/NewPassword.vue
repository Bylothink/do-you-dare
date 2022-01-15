<template>
    <CenteredLayout id="new-password-page">
        <h1>Do you dare?</h1>
        <h3 class="mb-4">
            New Password
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <div class="form-row">
                <label for="password" class="form-cell col-form-label col-form-label-lg">Password</label>
                <div class="form-cell">
                    <input id="password"
                           v-model="password"
                           class="form-control form-control-lg mb-3"
                           type="password"
                           required />
                </div>
            </div>
            <div class="form-row">
                <label for="confirm" class="form-cell col-form-label col-form-label-lg">Confirm</label>
                <div class="form-cell">
                    <input id="confirm"
                           v-model="confirm"
                           class="form-control form-control-lg mb-3"
                           type="password"
                           required />
                </div>
            </div>
            <div class="form-row">
                <span></span>
                <div class="form-cell">
                    <hr />
                    <button class="form-control form-control-lg btn btn-primary" type="submit">
                        <span class="fas fa-key"></span>
                        Submit
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

    const password = ref("");
    const confirm = ("");

    const onSubmit = (): void =>
    {
        userStore.newPassword({ password: password.value })
            .then(() => alert("Password reimpostata con successo!"))
            .then(() => console.log(""))
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
