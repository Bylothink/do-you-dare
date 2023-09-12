<template>
    <CenteredLayout id="reset-password">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Forgot your password? No problem.
        </h3>
        <div>
            <p>
                It happens to the best of us.<br />
                We understand that remembering numerous passwords for different accounts can be a hassle.<br />
                That's why we're here to help.
            </p>
            <p>
                Just enter your email address associated with this account in the field below<br />
                and we'll send you instructions to reset your password.
            </p>
            <hr />
            <form class="mx-3" @submit.prevent="onSubmit">
                <div class="input-group mb-3">
                    <TextBox id="email"
                             v-model:value="email"
                             label="Email address"
                             type="email"
                             autocomplete="email"
                             :readonly="countdown.isRunning.value"
                             required />
                    <AppButton :disabled="countdown.isRunning.value" type="submit">
                        Reset
                    </AppButton>
                </div>
            </form>
            <div v-if="countdown.isRunning.value" class="feedback">
                You can try again in {{ countdown.remainingTime.value }} seconds.
            </div>
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    import { useVuert } from "@byloth/vuert";

    import useCacheStore from "@/stores/cache";
    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
    import TextBox from "@/components/ui/TextBox.vue";

    import Countdown from "@/utils/countdown";
    import Expire, { TimeUnit } from "@/utils/expire";

    interface RequestEmailValues
    {
        email: string;
        expiration: number;
    }

    const CACHE_KEY = "user-password-request_email:countdown";
    const REQUEST_DELAY = 60;

    const $vuert = useVuert();
    const $cache = useCacheStore();
    const $user = useUserStore();

    const email = ref("");
    const countdown = new Countdown(REQUEST_DELAY);

    const initialize = () =>
    {
        const values = $cache.get<RequestEmailValues>(CACHE_KEY);
        if (!values) { return; }

        const remainingTime = Expire.On(values.expiration, TimeUnit.Seconds);

        email.value = values.email;
        countdown.start(remainingTime);
    };
    const onSubmit = async () =>
    {
        const expiration = { seconds: REQUEST_DELAY };
        const values: RequestEmailValues = {
            email: email.value,
            expiration: Expire.In(expiration)
        };

        $cache.set(CACHE_KEY, values, expiration);
        countdown.start();

        await $user.requestPasswordResetEmail(email.value);

        $vuert.emit({
            type: "success",
            icon: "circle-check",
            message: "Successfully requested a new email to reset your password!",
            timeout: 2500
        });
    };

    initialize();
</script>

<style lang="scss" scoped>
    #reset-password
    {
        text-align: center;

        .input-group
        {
            margin: auto;
            width: fit-content;

            & > .form-control
            {
                flex: unset;
                width: inherit;
            }
        }

        .feedback
        {
            margin-top: 0.25rem;
            font-size: 0.875em;
        }
    }
</style>
