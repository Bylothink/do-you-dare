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
                If you haven't received any emails, please also check your spam folder.<br />
                If you still don't receive the email, wait a couple of minutes and then request a resend.
            </p>
            <hr />
            <AppButton>
                Send a new email
            </AppButton>
            <!-- TODO #1: Gestire il re-invio della mail in caso di non ricezione. -->
            <!-- TODO #2: Gestire il re-invio della mail in caso di scadenza token. -->
        </div>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
</script>

<style lang="scss" scoped>
    #email-sent
    {
        text-align: center;
    }
</style>
