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
            <div class="input-group">
                <input v-model="email"
                       class="form-control"
                       type="email"
                       autocomplete="email"
                       required />
                <AppButton :disabled="isRunning" @click="onClick">
                    Reset
                </AppButton>
            </div>
            <div v-if="isRunning" class="feedback">
                Potrai riprovare da {{ remainingTime }} secondi.
            </div>
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    import { handle } from "@byloth/exceptions";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user/index.js";

    import Countdown from "@/core/utils/countdown.js";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const REQUEST_DELAY = 60;

    const vuert = useVuert();
    const user = useUserStore();

    const countdown = new Countdown(REQUEST_DELAY);
    const isRunning = countdown.isRunning;
    const remainingTime = countdown.remainingTime;

    console.log(countdown);

    const email = ref("");

    const onClick = async () =>
    {
        countdown.start();

        try
        {
            await user.requestPasswordResetEmail(email.value);
        }
        catch (error)
        {
            countdown.stop();

            return handle(error);
        }

        vuert.emit({
            type: "success",
            icon: "circle-check",
            message: "Successfully requested a new email to reset your password!",
            timeout: 2500
        });
    };
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
