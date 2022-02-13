<template>
    <CenteredLayout id="sign-in">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Sign in
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <div class="form-row">
                <label for="username" class="form-cell col-form-label col-form-label-lg">Nome utente</label>
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
                <label for="password" class="form-cell col-form-label col-form-label-lg">Password</label>
                <div class="form-cell">
                    <input id="password"
                           v-model="password"
                           class="form-control form-control-lg mb-3"
                           type="password"
                           autocomplete="current-password"
                           required />
                </div>
            </div>
            <div class="form-row">
                <span></span>
                <div class="form-cell">
                    <hr />
                    <AppButton class="form-control form-control-lg" type="submit">
                        <span class="fa-solid fa-key"></span>
                        Sign in
                    </AppButton>
                </div>
            </div>
        </form>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    import Exception from "@/core/exceptions/core";

    import useUiStore from "@/stores/ui";
    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const router = useRouter();

    const uiStore = useUiStore();
    const userStore = useUserStore();

    const username = ref("");
    const password = ref("");

    const onSubmit = async () =>
    {
        const signInPayload = {
            username: username.value,
            password: password.value
        };

        try
        {
            await userStore.signIn(signInPayload);

            uiStore.alert({
                type: "success",
                icon: "circle-check",
                message: "Authentication successful!\n",
                timeout: 2500
            });

            router.push({ name: "home" });
        }
        catch (error)
        {
            const exc = Exception.FromUnknown(error);

            uiStore.alert({
                type: "danger",
                icon: "circle-xmark",
                title: "Authentication failed!",
                message: exc.message,
                dismissable: true
            });

            // eslint-disable-next-line no-console
            console.error(exc);
        }
    };
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    #sign-in
    {
        @media (max-width: variables.$max-mobile-size)
        {
            & > .form-table > .form-row > .form-cell
            {
                & > hr
                {
                    margin-top: 2em;
                }
            }
        }
    }
</style>
