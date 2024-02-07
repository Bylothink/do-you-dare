<script lang="ts" setup>
    import AppButton from "./AppButton.vue";
</script>

<template>
    <AppButton class="round">
        <span class="spacer"></span>
        <div class="content">
            <slot></slot>
        </div>
    </AppButton>
</template>

<style lang="scss" scoped>
    .round
    {
        border-radius: 100%;
        padding: 0px;
        position: relative;
        width: 2em;

        & > .spacer
        {
            display: block;
            padding: 50% 0px; // TODO: Use `aspect-ratio` property.
        }
        & > .content
        {
            align-items: center;
            bottom: 0px;
            display: flex;
            justify-content: center;
            left: 0px;
            position: absolute;
            right: 0px;
            top: 0px;
        }
    }
</style>
