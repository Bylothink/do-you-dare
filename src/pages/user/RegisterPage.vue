<template>
    <CenteredLayout id="register">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Register
        </h3>
        <div>
            <form class="mx-3" @submit.prevent="onSubmit">
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
                <hCaptchaBox v-model:value="token" :site-key="config.hCaptchaSiteKey" />
                <hr />
                <span>
                    Already have an account?
                    <RouterLink :to="{ name: 'user-log_in' }">
                        Log in
                    </RouterLink>
                </span>
                <div class="d-grid mt-3">
                    <AppButton large type="submit">
                        <span class="fa-solid fa-id-card"></span>
                        Register
                    </AppButton>
                </div>
            </form>
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    import { useVuert } from "@byloth/vuert";

    import config from "@/config";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
    import hCaptchaBox from "@/components/ui/hCaptchaBox.vue";
    import TextBox from "@/components/ui/TextBox.vue";

    import useUserStore from "@/stores/user";

    const $router = useRouter();
    const $vuert = useVuert();
    const $user = useUserStore();

    const username = ref("");
    const password = ref("");
    const checkPassword = ref("");
    const email = ref("");
    const token = ref("");

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

        await $user.register({
            username: username.value,
            password: password.value,
            email: email.value,
            token: token.value
        });

        $router.replace({ name: "user-register-email_sent" });
        $vuert.emit({
            type: "success",
            icon: "circle-check",
            message: `Account "${$user.value!.username}" created successfully!`,
            timeout: 2500
        });
    };
</script>

<style lang="scss" scoped>
</style>
