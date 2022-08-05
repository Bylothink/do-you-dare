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
                <AppButton :disabled="isDisabled" @click="onClick">
                    Reset
                </AppButton>
            </div>
            <div v-if="isDisabled" class="feedback">
                Potrai riprovare da {{ timeRemaining }} secondi.
            </div>
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>

    //
    // TODO: Valutare SE è necessario un nuovo nome per questa pagina!
    //        - RequestPasswordChangePage.vue
    //        - RequestPasswordResetPage.vue
    //

    import { computed, ref } from "vue";

    import { HandledException } from "@/core/exceptions";
    import useUiStore from "@/stores/ui";
    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const REQUEST_DELAY = 60;

    const ui = useUiStore();
    const user = useUserStore();

    const email = ref("");
    const timeRemaining = ref(0);

    const isDisabled = computed(() => timeRemaining.value > 0);

    const onClick = async () =>
    {
        startCountdown();

        try
        {
            await user.requestResetPasswordMail(email.value);

            ui.alert({
                type: "success",
                icon: "circle-check",
                message: "Successfully requested a new email to reset your password!",
                timeout: 2500
            });
        }
        catch (error)
        {
            HandledException.CatchUnhandled(error);

            timeRemaining.value = 0;
        }
    };
    const startCountdown = () =>
    {
        timeRemaining.value = REQUEST_DELAY;

        const intervalId = setInterval(() =>
        {
            timeRemaining.value -= 1;

            if (timeRemaining.value <= 0)
            {
                clearInterval(intervalId);
            }

        }, 1000);
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
