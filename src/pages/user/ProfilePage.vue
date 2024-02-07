<script lang="ts" setup>
    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
</script>

<template>
    <CenteredLayout id="user">
        <h1>Your user information page</h1>
        <AppButton large
                   title="Log out from your user account"
                   :to="{ name: 'user-log_out' }">
            <span class="fa-solid fa-right-from-bracket"></span>
            Log out
        </AppButton>
    </CenteredLayout>
</template>

<style lang="scss" scoped></style>
