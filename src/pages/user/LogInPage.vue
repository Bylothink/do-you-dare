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
                <RouterLink :to="{ name: 'user-register' }">
                    Registrati
                </RouterLink>
            </span>
            <span style="display: block;">
                Hai dimenticato la password?
                <RouterLink :to="{ name: 'user-password-request_email' }">
                    Ripristinala
                </RouterLink>
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

    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
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
            message: `Authentication with user "${$user.username}" successfully!`,
            timeout: 2500
        });
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
