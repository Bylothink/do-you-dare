<template>
    <span class="cookie-alert">
        This website uses cookies to ensure you get the best experience on our website.<br />
        To learn more, please refer to the
        <RouterLink :to="{ name: 'about' }">Cookie policy page</RouterLink>.
    </span>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
    .cookie-alert
    {
        font-size: 0.875em;
    }
</style>
