<template>
    <CenteredLayout id="about-page">
        <h1>This is an about page</h1>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "AboutPage",
        components: { CenteredLayout }
    });
</script>

<style lang="scss" scoped>
</style>
