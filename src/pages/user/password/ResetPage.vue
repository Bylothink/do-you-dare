<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    import { ValueException } from "@byloth/exceptions";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import TextBox from "@/components/forms/TextBox.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const $router = useRouter();
    const $vuert = useVuert();
    const $user = useUserStore();

    const password = ref("");
    const checkPassword = ref("");

    let token: string;

    const checkToken = () =>
    {
        const route = $router.currentRoute.value;

        token = route.query.token as string;
        if (!(token))
        {
            throw new ValueException("The `token` URL query parameters is missing.");
        }
    };

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

        await $user.changePassword(token, password.value);

        $router.replace({ name: "user-log_in" });
        $vuert.emit({
            type: "success",
            icon: "circle-check",
            message: "Password changed successfully!",
            timeout: 2500
        });
    };

    checkToken();
</script>

<template>
    <CenteredLayout id="change-password">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Reset your password
        </h3>
        <div>
            <p>
                You're one step away from accessing your account.<br />
                All you need to do is set a new password. Easy, right?
            </p>
            <hr />
            <form class="mx-3" @submit.prevent="onSubmit">
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
                <div class="d-grid mt-3">
                    <AppButton large type="submit">
                        <span class="fa-solid fa-key"></span>
                        Change
                    </AppButton>
                </div>
            </form>
        </div>
    </CenteredLayout>
</template>

<style lang="scss" scoped></style>
