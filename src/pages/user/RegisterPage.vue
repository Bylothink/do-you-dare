<template>
    <CenteredLayout id="register">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Register
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <div class="form-row">
                <label for="username" class="form-cell col-form-label col-form-label-lg">Username</label>
                <div class="form-cell">
                    <input id="username"
                           v-model="username"
                           class="form-control form-control-lg mb-3"
                           type="text"
                           autocomplete="username"
                           required />
                </div>
            </div>
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
                <label for="password" class="form-cell col-form-label col-form-label-lg">Password</label>
                <div class="form-cell">
                    <input id="password"
                           v-model="password"
                           class="form-control form-control-lg mb-3"
                           type="password"
                           autocomplete="new-password"
                           required />
                </div>
            </div>
            <div class="form-row">
                <label for="check_password" class="form-cell col-form-label col-form-label-lg">Conferma</label>
                <div class="form-cell">
                    <input id="check_password"
                           v-model="check_password"
                           class="form-control form-control-lg mb-3"
                           type="password"
                           autocomplete="new-password"
                           required />
                </div>
            </div>
            <div class="form-row">
                <span></span>
                <div class="form-cell">
                    <hr />
                    <span>
                        Possiedi già un account?
                        <RouterLink :to="{ name: 'user-log_in' }">
                            Accedi
                        </RouterLink>
                    </span>
                    <AppButton class="form-control form-control-lg" type="submit">
                        <span class="fa-solid fa-id-card"></span>
                        Register
                    </AppButton>
                </div>
            </div>
        </form>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    import { HandledException } from "@/core/exceptions";

    import useUiStore from "@/stores/ui";
    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const router = useRouter();

    const ui = useUiStore();
    const user = useUserStore();

    const username = ref("");
    const password = ref("");
    const check_password = ref("");
    const email = ref("");

    const onSubmit = async () =>
    {
        if (password.value !== check_password.value)
        {
            ui.alert({
                type: "danger",
                icon: "circle-xmark",
                title: "Password mismatch!",
                message: "The passwords you entered do not match.",
                dismissable: true
            });

            return;
        }

        const registerPayload = {
            username: username.value,
            password: password.value,
            email: email.value
        };

        try
        {
            await user.register(registerPayload);

            ui.alert({
                type: "success",
                icon: "circle-check",
                message: "Account created successfully!\n",
                timeout: 2500
            });

            router.replace({ name: "user-email_sent" });
        }
        catch (error)
        {
            HandledException.CatchUnhandled(error, (exc) =>
            {
                ui.alert({
                    type: "danger",
                    icon: "circle-xmark",
                    title: "Account creation failed!",
                    message: exc.message,
                    dismissable: true
                });

                // eslint-disable-next-line no-console
                console.error(exc);
            });
        }
    };
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    #register > .form-table > .form-row > .form-cell
    {
        & > span
        {
            display: block;
        }

        & > .btn
        {
            margin-top: 1em;
        }

        @media (max-width: variables.$max-mobile-size)
        {
            & > hr
            {
                margin-top: 2em;
            }
        }
    }
</style>
