<template>
    <CenteredLayout id="email-sent">
        <h1>Do you Dare?</h1>
        <h3>Validate your email address</h3>
        <div>
            <hr />
            <p>
                To complete the registration process, you need to validate your email address.
            </p>
            <p>
                An email has just been sent to the address you provided.<br />
                Please, check your inbox and simply click on the link
                contained in the message to validate your email address.
            </p>
            <p>
                If you haven't received any emails, please also check your spam folder too.<br />
                If you still don't receive the email, wait a minute and then request a resend.
            </p>
            <hr />
            <div class="input-group">
                <input class="form-control is-valid"
                       :value="user.email"
                       readonly />
                <AppButton :disabled="countdown.isRunning" @click="onClick">
                    Send a new email
                </AppButton>
            </div>
            <div v-if="countdown.isRunning" class="feedback">
                Potrai riprovare da {{ countdown.remainingTime }} secondi.
            </div>
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";

    import useUserStore from "@/stores/user/index.js";

    import Countdown from "@/core/utils/countdown.js";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const REQUEST_DELAY = 60;

    const user = useUserStore();

    const countdown = new Countdown(REQUEST_DELAY);

    const onClick = () =>
    {
        countdown.start();

        user.requestNewValidationEmail();
    };

    onMounted(countdown.start);
</script>

<style lang="scss" scoped>
    #email-sent
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
