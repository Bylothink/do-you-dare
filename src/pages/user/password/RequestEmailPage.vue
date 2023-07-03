<template>
    <CenteredLayout id="reset-password">
        <h1>Do you Dare?</h1>
        <h3>Reset your forgotten password</h3>
        <div>
            <hr />
            <p>
                &lt;!-- Add here a decent description for this page. --&gt;
            </p>
            <hr />
            <TextBox id="email"
                     v-model:value="email"
                     class="mb-3"
                     label="Email address"
                     type="email"
                     autocomplete="email"
                     :readonly="countdown.isRunning.value"
                     required />
            <AppButton :disabled="countdown.isRunning.value" @click="onClick">
                Reset
            </AppButton>
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

    import Expire, { TimeUnit } from "@/utils/expire";

    import AppButton from "@/components/ui/AppButton.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import Countdown from "@/utils/countdown";
    import TextBox from "@/components/ui/TextBox.vue";

    interface RequestEmailValues
    {
        email: string;
        expiration: number;
    }

    const REQUEST_DELAY = 60;

    const $vuert = useVuert();
    const $cache = useCacheStore();
    const $user = useUserStore();

    const email = ref("");
    const countdown = new Countdown(REQUEST_DELAY);

    const initialize = () =>
    {
        const values = $cache.get<RequestEmailValues>("requestEmail");
        if (!values) { return; }

        const remainingTime = Expire.On(values.expiration, TimeUnit.Seconds);

        email.value = values.email;
        countdown.start(remainingTime);
    };
    const onClick = async () =>
    {
        const expiration = Expire.In({ seconds: REQUEST_DELAY });
        const values: RequestEmailValues = {
            email: email.value,
            expiration: expiration
        };

        $cache.set("requestEmail", values, expiration);
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
