<script lang="ts" setup>
    import { useRouter } from "vue-router";

    import useCacheStore from "@/stores/cache";
    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    import Countdown from "@/utils/countdown";
    import Expire, { TimeUnit } from "@/utils/expire";

    const CACHE_KEY = "user-register-email_sent:countdown";
    const REQUEST_DELAY = 60;

    const $cache = useCacheStore();
    const $router = useRouter();
    const $user = useUserStore();

    const countdown = new Countdown(REQUEST_DELAY);

    const _startCountdown = () =>
    {
        $cache.set(CACHE_KEY, Expire.In({ seconds: REQUEST_DELAY }), { seconds: REQUEST_DELAY * 5 });

        countdown.start();
    };
    const initialize = () =>
    {
        if (!($user.isLogged))
        {
            return $router.replace({ name: "user-log_in" });
        }

        const expiration = $cache.get<number>(CACHE_KEY);
        if (!(expiration))
        {
            return _startCountdown();
        }

        const remainingTime = Expire.On(expiration, TimeUnit.Seconds);
        if (remainingTime > 0)
        {
            countdown.start(remainingTime);
        }
    };

    const onClick = () =>
    {
        _startCountdown();

        $user.requestNewValidationEmail();
    };

    initialize();
</script>

<template>
    <CenteredLayout id="email-sent">
        <h1>Do you Dare?</h1>
        <h3 class="mb-4">
            Registration Successful!
        </h3>
        <div>
            <p>
                Thank you for joining the other players!<br />
                Your registration was successful, and you're almost ready to start playing.
            </p>
            <p>
                We have just sent you an email to the address you provided.<br />
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
                       :value="$user.value!.email"
                       readonly />
                <AppButton :disabled="countdown.isRunning.value" @click="onClick">
                    Send a new email
                </AppButton>
            </div>
            <div v-if="countdown.isRunning.value" class="feedback">
                You can try again in {{ countdown.remainingTime.value }} seconds.
            </div>
        </div>
    </CenteredLayout>
</template>

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
