<template>
    <CenteredLayout id="log-in">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Welcome back!
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
                <TextBox id="password"
                         v-model:value="password"
                         class="mb-3"
                         label="Password"
                         type="password"
                         autocomplete="current-password"
                         required />
                <CheckBox id="remember-me" title="Check this box if you want to stay logged in on this device">
                    Remember me
                </CheckBox>
                <hr />
                <span style="display: block;">
                    Don't have an account yet?
                    <RouterLink :to="{ name: 'user-register' }">
                        Register
                    </RouterLink>
                </span>
                <span style="display: block;">
                    Forgot your password?
                    <RouterLink :to="{ name: 'user-password-request_email' }">
                        Reset it
                    </RouterLink>
                </span>
                <div class="d-grid mt-3">
                    <AppButton large type="submit">
                        <span class="fa-solid fa-key"></span>
                        Log in
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

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
    import CheckBox from "@/components/ui/CheckBox.vue";
    import TextBox from "@/components/ui/TextBox.vue";

    const $router = useRouter();
    const $vuert = useVuert();
    const $user = useUserStore();

    const username = ref("");
    const password = ref("");

    const onSubmit = async () =>
    {
        const route = $router.currentRoute.value;
        const nextPath = route.query.next as string || "/";

        await $user.logIn(username.value, password.value);

        $router.replace({ path: nextPath });
        $vuert.emit({
            type: "success",
            icon: "circle-check",
            message: `Authentication with user "${$user.value!.username}" successfully!`,
            timeout: 2500
        });
    };
</script>

<style lang="scss" scoped>
</style>
