<template>
    <CenteredLayout id="user">
        <h1>Your user information page</h1>
        <RouterLink v-slot="{ href, navigate }"
                    custom
                    :to="{ name: 'user-log_out' }">
            <AppButton large
                       title="Log out from your user account"
                       :href="href"
                       @click="navigate">
                <span class="fa-solid fa-right-from-bracket"></span>
                Log out
            </AppButton>
        </RouterLink>
    </CenteredLayout>
</template>

<script lang="ts" setup>
    import CenteredLayout from "@/layouts/CenteredLayout.vue";
    import AppButton from "@/components/ui/AppButton.vue";
</script>
