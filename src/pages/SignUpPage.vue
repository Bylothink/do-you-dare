<template>
    <CenteredLayout id="sign-up">
        <h1>Do you dare?</h1>
        <h3 class="mb-4">
            Sign up
        </h3>
        <form class="mx-3 form-table" @submit.prevent="onSubmit">
            <div class="form-row">
                <label for="first-name" class="form-cell col-form-label col-form-label-lg">First name</label>
                <div class="form-cell">
                    <input id="first-name"
                           v-model="firstName"
                           class="form-control form-control-lg mb-3"
                           type="text"
                           required />
                </div>
            </div>
            <div class="form-row">
                <label for="last-name" class="form-cell col-form-label col-form-label-lg">Last name</label>
                <div class="form-cell">
                    <input id="last-name"
                           v-model="lastName"
                           class="form-control form-control-lg mb-3"
                           type="text"
                           required />
                </div>
            </div>
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
                <span></span>
                <div class="form-cell">
                    <hr />
                    <AppButton class="form-control form-control-lg" type="submit">
                        <span class="fas fa-id-card"></span>
                        Sign up
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

    const firstName = ref("");
    const lastName = ref("");
    const username = ref("");
    const password = ref("");
    const email = ref("");

    const onSubmit = async () =>
    {
        const signUpPayload = {
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            password: password.value,
            email: email.value
        };

        try
        {
            await userStore.signUp(signUpPayload);

            uiStore.alert({
                type: "success",
                icon: "check-circle",
                message: "Account created successfully!\n",
                timeout: 2500
            });

            router.push({ name: "sign-in" });
        }
        catch (error)
        {
            const exc = Exception.FromUnknown(error);

            uiStore.alert({
                type: "danger",
                icon: "times-circle",
                title: "Account creation failed!",
                message: exc.message,
                dismissable: true
            });

            // eslint-disable-next-line no-console
            console.error(error);
        }
    };
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    #sign-up
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
