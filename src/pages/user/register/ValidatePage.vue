<template>
    <CenteredLayout id="validate">
        <h1>Do you Dare?</h1>
        <SuspenseLayout :loading="isValidating" :failed="hasFailed">
            <template #loader>
                <h3 class="mb-4">
                    Validating your account...
                </h3>
                <p>
                    We're currently validating your account...<br />
                    Please, hang tight.
                </p>
                <span class="fa-solid fa-spinner fa-spin fa-5x"></span>
            </template>
            <template #default>
                <h3 class="mb-4">
                    Validation successful
                </h3>
                <p>
                    Congratulations, your account has been correctly validated!<br />
                    You're good to go.
                </p>
                <hr />
                <RouterLink v-slot="{ href, navigate }"
                            custom
                            :to="{ name: 'home' }">
                    <AppButton :href="href"
                               title="Start playing!"
                               @click="navigate">
                        Start playing!
                    </AppButton>
                </RouterLink>
            </template>
            <template #error>
                <h3 class="mb-4">
                    Validation failed
                </h3>
                <p>
                    We're sorry, but we were unable to validate your account.<br />
                    This could be due to various and multiple reasons... Please, try again.
                </p>
                <p>
                    If you're still having trouble validating your account,<br />
                    please reach out to our support team using our
                    <a href="#">Contact form</a>.<br />
                    We're always here to help you.
                </p>
            </template>
        </SuspenseLayout>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import { ValueException } from "@byloth/exceptions";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import SuspenseLayout from "@/layouts/SuspenseLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const $route = useRoute();
    const $user = useUserStore();

    const isValidating = ref(true);
    const hasFailed = ref(true);

    const validate = async () =>
    {
        try
        {
            const token = $route.query.token as string;
            if (!token)
            {
                throw new ValueException("The `token` URL query parameters is missing.");
            }

            await $user.verifyEmail(token);

            // TODO: Differenziare la gestione della verifica dell'utente.
            //
            //       L'utente potrà, a questo punto, essere sia loggato che non;
            //        tutto dipende da come è avvenuto il flow di verifica dell'account.
            //       Se l'utente sarà già loggato, rimandarlo alla home visualizzando un
            //        messaggio di conferma di avvenuta verifica dell'account.
            //       Viceversa, se l'utente non risulterà essere loggato, rimandarlo alla
            //        pagina di login visualizzando, in ogni caso, il messaggio
            //        di conferma di avvenuta verifica dell'account.
            //

            hasFailed.value = false;
        }
        finally
        {
            isValidating.value = false;
        }
    };

    validate();
</script>

<style lang="scss" scoped>
    #validate
    {
        text-align: center;
    }
</style>
