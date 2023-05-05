<template>
    <CenteredLayout id="change-password">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Change forgotten password
        </h3>
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
            <AppButton class="form-control form-control-lg mt-3" type="submit">
                <span class="fa-solid fa-key"></span>
                Change
            </AppButton>
        </form>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    import { handle, ValueException } from "@byloth/exceptions";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user/index.js";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
    import TextBox from "@/components/ui/TextBox.vue";

    const $router = useRouter();
    const $vuert = useVuert();

    const user = useUserStore();

    const password = ref("");
    const checkPassword = ref("");

    let token: string;

    const checkToken = () =>
    {
        const route = $router.currentRoute.value;

        token = route.query.token as string;
        if (!token)
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

        try
        {
            await user.changePassword(token, password.value);
        }
        catch (error)
        {
            return handle(error, (exc) =>
            {
                // eslint-disable-next-line no-console
                console.error(exc);

                $vuert.emit({
                    type: "error",
                    icon: "circle-xmark",
                    title: "Password change failed!",
                    message: `${exc}`,
                    dismissible: true
                });
            });
        }

        $vuert.emit({
            type: "success",
            icon: "circle-check",
            message: `Password changed successfully!`,
            timeout: 2500
        });

        $router.replace({ name: "user-log_in" });
    };

    checkToken();
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    #change-password > .form-table > .form-row > .form-cell
    {
        // TODO: Servono ancora, queste regole?
        //
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
