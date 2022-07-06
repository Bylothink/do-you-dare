<template>
    <CenteredLayout id="log-in">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Log in
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
                    <input type="checkbox" />
                    Ricordami su questo dispositivo
                </div>
            </div>
            <div class="form-row">
                <span></span>
                <div class="form-cell">
                    <hr />
                    <span style="display: block;">
                        Non hai ancora un'account?
                        <RouterLink :to="{ name: 'user-register' }">
                            Registrati
                        </RouterLink>.
                    </span>
                    <span style="display: block;">
                        Hai dimenticato la password?
                        <a href="#">Ripristinala</a>.
                    </span>
                    <AppButton class="form-control form-control-lg" style="margin-top: 1em;" type="submit">
                        <span class="fa-solid fa-key"></span>
                        Log in
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

    #log-in
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
