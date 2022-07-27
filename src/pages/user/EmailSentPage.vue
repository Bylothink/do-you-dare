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
                Check your inbox and simply click on the link contained in the<br />
                message you should have received to validate your email address.
            </p>
            <p>
                If you haven't received any emails, please also check your spam folder.<br />
                If you still don't receive the email, wait a minute and then request a resend.
            </p>
            <hr />
            <div class="input-group">
                <input class="form-control is-valid"
                       :value="user.email"
                       readonly />
                <AppButton :disabled="seconds > 0" @click="onClick">
                    Send a new email
                </AppButton>
            </div>
            <div v-if="seconds > 0" class="feedback">
                Potrai riprovare da {{ seconds }} secondi.
            </div>
            <!-- TODO #1: Gestire il re-invio della mail in caso di non ricezione. -->
            <!-- TODO #2: Gestire il re-invio della mail in caso di scadenza token. -->
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import useUserStore from "@/stores/user";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const route = useRoute();
    const user = useUserStore();

    const seconds = ref(60);

    const onClick = () =>
    {
        user.sendAccountValidationMail();

        seconds.value = 60;
    };

    setInterval(() => { seconds.value -= 1; }, 1000);
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
