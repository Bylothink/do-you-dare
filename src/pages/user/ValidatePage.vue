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

    import { HandledException, ValueException } from "@/core/exceptions";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import SuspenseLayout from "@/layouts/SuspenseLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const route = useRoute();
    const user = useUserStore();

    const isValidating = ref(true);
    const hasFailed = ref(true);

    const validate = async () =>
    {
        try
        {
            const email = route.query.email as string;
            const token = route.query.token as string;

            if (!email || !token)
            {
                throw new ValueException("One or both of the `email` or `token` URL query parameters are missing.");
            }

            await user.verifyEmail(email, token);

            // TODO: Rimandare direttamente alla home visualizzando un alert di successo?

            hasFailed.value = false;
        }
        catch (error)
        {
            HandledException.CatchUnhandled(error);
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
