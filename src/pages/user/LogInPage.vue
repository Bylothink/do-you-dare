<template>
    <CenteredLayout id="log-in">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Log in
        </h3>
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
            <input type="checkbox" />
            Ricordami su questo dispositivo
            <hr />
            <span style="display: block;">
                Non hai ancora un account?
                <RouterLink :to="{ name: 'user_register' }">
                    Registrati
                </RouterLink>
            </span>
            <span style="display: block;">
                Hai dimenticato la password?
                <a href="#">Ripristinala</a>
            </span>
            <AppButton class="form-control form-control-lg mt-3" type="submit">
                <span class="fa-solid fa-key"></span>
                Log in
            </AppButton>
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
    import TextBox from "@/components/ui/TextBox.vue";

    const router = useRouter();

    const ui = useUiStore();
    const user = useUserStore();

    const username = ref("");
    const password = ref("");

    const onSubmit = async () =>
    {
        const route = router.currentRoute.value;
        const nextPath = route.query.next as string || "/";

        try
        {
            await user.logIn(username.value, password.value);

            ui.alert({
                type: "success",
                icon: "circle-check",
                message: "Authentication successful!\n",
                timeout: 2500
            });

            router.replace({ path: nextPath });
        }
        catch (error)
        {
            HandledException.CatchUnhandled(error, (exc) =>
            {
                ui.alert({
                    type: "danger",
                    icon: "circle-xmark",
                    title: "Authentication failed!",
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

    #log-in > .form-table > .form-row > .form-cell
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
