<template>
    <CenteredLayout id="validate">
        <h1>Do you Dare?</h1>
        <SuspenseLayout :loading="isValidating" :failed="hasFailed">
            <template #loader>
                <h3>Validating your account...</h3>
                <hr />
                <span class="fa-solid fa-spinner fa-spin fa-5x"></span>
            </template>
            <template #default>
                <h3>Validation successful</h3>
                <hr />
                <p>
                    Your account has been correctly validated.<br />
                    You're good to go!
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
                <h3>Validation failed</h3>
                <hr />
                <p>
                    We're sorry but something went wrong while validating of your account.<br />
                    Please, try again.
                </p>
                <p>
                    If the problem persists, please contact us.
                    <!-- TODO: Creare il form di contatto per l'assistenza. -->
                </p>
            </template>
        </SuspenseLayout>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import { handle, ValueException } from "@byloth/exceptions";

    import useUserStore from "@/stores/user/index.js";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import SuspenseLayout from "@/layouts/SuspenseLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const route = useRoute();
    const user = useUserStore();

    const isValidating = ref(true);
    const hasFailed = ref(true);

    const validate = async () =>
    {
        const token = route.query.token as string;
        if (!token)
        {
            throw new ValueException("The `token` URL query parameters is missing.");
        }

        try
        {
            await user.verifyEmail(token);

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
        catch (error)
        {
            handle(error);
        }

        isValidating.value = false;
    };

    validate();
</script>

<style lang="scss" scoped>
    #validate
    {
        text-align: center;
    }
</style>
