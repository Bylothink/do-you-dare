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
                    If you're not automatically redirected, click here to return to the home page.
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
    import { useRouter } from "vue-router";

    import { ValueException } from "@byloth/exceptions";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import SuspenseLayout from "@/layouts/SuspenseLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const $router = useRouter();
    const $user = useUserStore();
    const $vuert = useVuert();

    const isValidating = ref(true);
    const hasFailed = ref(true);

    const validate = async () =>
    {
        try
        {
            const $route = $router.currentRoute.value;

            const token = $route.query.token as string;
            if (!token)
            {
                throw new ValueException("The `token` URL query parameters is missing.");
            }

            await $user.verifyEmail(token);
            if ($user.isLogged)
            {
                $router.replace({ name: "home" });
            }
            else
            {
                $router.push({ name: "user-log_in" });
            }

            $vuert.emit({
                type: "success",
                icon: "circle-check",
                message: "Your account has been successfully validated: you're good to go!",
                timeout: 2500
            });

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
