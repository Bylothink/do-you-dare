<template>
    <CenteredLayout id="reset-page">
        <h1>Do you dare?</h1>
        <h3 class="mb-4">
            Reset Password
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <div class="form-row">
                <label for="email" class="form-cell col-form-label col-form-label-lg">Email</label>
                <div class="form-cell">
                    <input id="email"
                           v-model="email"
                           class="form-control form-control-lg mb-3"
                           type="email"
                           required />
                </div>
            </div>
            <div class="form-row">
                <span></span>
                <div class="form-cell">
                    <hr />
                    <button class="form-control form-control-lg btn btn-primary" type="submit">
                        <span class="fas fa-key"></span>
                        Reset Password
                    </button>
                </div>
            </div>
        </form>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";

    import { useStore } from "@/store";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "ResetPage",
        components: { CenteredLayout },

        setup: () =>
        {
            const store = useStore();

            const email = ref("");
            const codice = ref("");

            const onSubmit = (): void =>
            {
                const resetPayload = {
                    email: email.value,
                    codice: codice.value
                };

                store.dispatch("user/reset", resetPayload)
                    .then(() => alert("Email inviata con successo!"))
                    .catch((exc) =>
                    {
                        // eslint-disable-next-line no-console
                        console.error(exc);

                        alert("Si è verificato un errore!");
                    });
            };

            return { email, onSubmit };
        }
    });
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
