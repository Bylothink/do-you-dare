<template>
    <CenteredLayout id="register">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Register
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <TextBox id="username"
                     v-model:value="username"
                     class="mb-3"
                     label="Username"
                     type="text"
                     autocomplete="username"
                     required />
            <TextBox id="email"
                     v-model:value="email"
                     class="mb-3"
                     label="Email address"
                     type="email"
                     autocomplete="email"
                     required />
            <TextBox id="password"
                     v-model:value="password"
                     class="mb-3"
                     label="Password"
                     type="password"
                     autocomplete="new-password"
                     required />
            <TextBox id="check-password"
                     v-model:value="checkPassword"
                     class="mb-3"
                     label="Confirm password"
                     type="password"
                     autocomplete="new-password"
                     required />
            <hr />
            <span>
                Possiedi già un account?
                <RouterLink :to="{ name: 'user-log_in' }">
                    Accedi
                </RouterLink>
            </span>
            <AppButton class="form-control form-control-lg mt-3" type="submit">
                <span class="fa-solid fa-id-card"></span>
                Register
            </AppButton>
        </form>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user/index.js";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
    import TextBox from "@/components/ui/TextBox.vue";

    const $router = useRouter();
    const $vuert = useVuert();

    const user = useUserStore();

    const username = ref("");
    const password = ref("");
    const checkPassword = ref("");
    const email = ref("");

    const onSubmit = async () =>
    {
        if (password.value !== checkPassword.value)
        {
            return $vuert.emit({
                type: "error",
                icon: "circle-xmark",
                title: "Password mismatch!",
                message: "The passwords you entered do not match.",
                dismissible: true
            });
        }

        await user.register({
            username: username.value,
            password: password.value,
            email: email.value
        });

        $vuert.emit({
            type: "success",
            icon: "circle-check",
            message: `Account "${user.username}" created successfully!`,
            timeout: 2500
        });

        $router.replace({ name: "user-register-email_sent" });
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
